
import Player from "../configs/player.js"; //Importa Player
import NPC from "../configs/NPC.js";
import DialogModalPlugin from "../plugin/dialog_plugin.js";
import pedacosU from "../configs/pedacosU.js";
import celular from "../configs/celular/celular.js";

export default class cenaEscritorio extends Phaser.Scene { //Cria cena e define como Cena pelo Phaser
    constructor() {
        super('cenaEscritorio'); //Da nome a cena
        this.tasks = ['Fale com o colaborador']
        this.npcFinalCriado = false;
    }

    init(data) {
        // Captura as coordenadas iniciais do jogador, se elas forem passadas como parte dos dados
        this.startingX = data.x || 40; // Valor padrão se nenhum 'x' for passado
        this.startingY = data.y || 210; // Valor padrão se nenhum 'y' for passado
        this.jogoTerminado = data.jogoTerminado || false
        this.nomeJogador = data.nomeJogador; //recebe o nome do jogador
        this.hud = data.hud; //recebe as informações da HUD
    }


    create() {
        console.log(this.jogoTerminado);
        this.hud.updateTasks(this.tasks);
        const mapaEscritorio = this.make.tilemap({ key: 'mapaEscritorio' }); //Cria e da nome ao mapa do jogo

        //Cria tilesets usados no Tiled dentro do jogo
        const tilesetSaladec = mapaEscritorio.addTilesetImage('saladec', 'saladec');
        const tilesetRooms = mapaEscritorio.addTilesetImage('rooms', 'rooms');
        const tilesetBiblioteca = mapaEscritorio.addTilesetImage('biblioteca', 'biblioteca');
        const tilesetMoveis = mapaEscritorio.addTilesetImage('moveis', 'moveis');

        //Cria camadas do Tiled no jogo
        const chao = mapaEscritorio.createLayer('chao', tilesetRooms, 0, 0); //Define nome, tilesets usados, e posicao para cada uma das camadas
        const paredes = mapaEscritorio.createLayer('paredes', tilesetRooms , 0, 0);
        const janelas = mapaEscritorio.createLayer('janelas', tilesetRooms, 0, 0);
        const bordas = mapaEscritorio.createLayer('bordas', tilesetRooms, 0, 0);
        const cadeirasfrente = mapaEscritorio.createLayer('cadeirasfrente', [tilesetMoveis, tilesetSaladec], 0, 0);
        const mesas = mapaEscritorio.createLayer('mesas', [tilesetMoveis, tilesetSaladec], 0, 0);
        const cadeirascostas = mapaEscritorio.createLayer('cadeirascostas', [tilesetMoveis, tilesetSaladec], 0, 0);
        const paredesdec = mapaEscritorio.createLayer('paredesdec', [tilesetMoveis, tilesetSaladec, tilesetBiblioteca], 0, 0);
        const decoracao = mapaEscritorio.createLayer('decoracao', [tilesetMoveis, tilesetSaladec], 0, 0);

    this.balaoFalaSprite = null;
        // Adicione o sprite do PC com borda
    this.pcBorderSprite = this.add.image(460, 368.7, 'pcHackBrilho').setScale(0.115);

    // Adicione o sprite do PC sem borda
    this.pcSprite = this.add.image(460, 367, 'pcHack').setScale(0.05);

    // Configure inicialmente o PC com borda visível e PC sem borda invisível
    this.pcBorderSprite.setVisible(true);
    this.pcSprite.setVisible(false);

    // Configure um temporizador para alternar entre as imagens
    this.time.addEvent({
        delay: 500, // Intervalo de tempo para alternar (em milissegundos)
        loop: true, // Loop indefinidamente
        callback: () => {
            // Alternar a visibilidade das imagens
            this.pcBorderSprite.setVisible(!this.pcBorderSprite.visible);
            this.pcSprite.setVisible(!this.pcSprite.visible);
        }
    });

        this.cameras.main.fadeIn(1000); //Animacao de fade ao trocar de cena

        this.npcs = [];//Cria array para os NPCS


        const dialogoJogoNaoTerminado = [
            { text: `${this.nomeJogador} POR FAVOR, ME AJUDE!!`, imageKey: "NPC8dialogo" }, // Adicione a chave da imagem correta
            { text: "ROUBARAM OS SÍMBOLOS QUE\nCOMPÕEM O 'U' DA NOSSA\nFACHADA!", imageKey: "NPC8dialogo" }, // Adicione a chave da imagem correta
            { text: "NOS AJUDE A RECUPERÁ-LOS!!!!", imageKey: "NPC8dialogo" }, // Adicione a chave da imagem correta
            { text: "Felizmente, cada símbolo tem\num GPS instalado nele.", imageKey: "NPC8dialogo" }, // Adicione a chave da imagem correta
            { text: "Adiante você encontrará\num computador que foi\nhackeado e você deve\nconsertar o sistema.", imageKey: "NPC8dialogo" }, // Adicione a chave da imagem correta
            { text: "Para descobrir as\nlocalizações dos símbolos.", imageKey: "NPC8dialogo" }, // Adicione a chave da imagem correta
            { text: "Mas para fazer isso, você\nprecisa ter conhecimento\ndos termos do dicionário\nda Unilever, ", imageKey: "NPC8dialogo" }, // Adicione a chave da imagem correta
            { text: "Que estão disponíveis\ndentro do seu celular no\nsegundo ícone!", imageKey: "NPC8dialogo" }, // Adicione a chave da imagem correta
            { text: "Então, mantenha o foco e\ntente aprender o máximo\nde termos possíveis.", imageKey: "NPC8dialogo" }, // Adicione a chave da imagem correta
            { text: "BOA SORTE!!!\nESTAMOS TODOS CONTANDO COM\nVOCÊ!!!", imageKey: "NPC8dialogo" } // Adicione a chave da imagem correta
        ];

        const dialogoJogoTerminado = [
            { text: "VOCÊ CONSEGUIU!!!", imageKey: "NPC8dialogo" },
            { text: "Muito obrigado por resolver\no hack.", imageKey: "NPC8dialogo" },
            { text: "Agora que voce já tem todas\nas localizações das\npartes do 'U', vá para cada\numa delas recuperá-las!", imageKey: "NPC8dialogo" },
            { text: "Boa sorte!!!", imageKey: "NPC8dialogo" },
            { text: "Felizmente um dos pedacos\neles deixaram no meio do\ncaminho, aqui está!", imageKey: "NPC8dialogo" }
        ];
        this.pedacosColetados = pedacosU.getValor();
        if (this.pedacosColetados < 7) {
            // Se menos de 7 pedaços foram coletados, cria o NPC
            const npcEscritorio = new NPC(this, 170, 190, 'NPC8', null, {
                name: 'NPC8',
                dialog: this.jogoTerminado ? dialogoJogoTerminado : dialogoJogoNaoTerminado,
                interactTexture: 'NPC8close'
            });
            this.npcs.push(npcEscritorio); // Adiciona o NPC ao array
            this.add.existing(npcEscritorio);
        }

        //Configs do player
        this.player = new Player(this, this.startingX, this.startingY);  //Cria o player
        this.player.sprite.anims.play('idleright', true);//Define animacao inicial do player
        this.cameras.main.startFollow(this.player.sprite);//Camera ira seguir o player
        this.cameras.main.setZoom(2.5);//Zoom da camera
        this.cameras.main.setBounds(0, 0, mapaEscritorio.widthInPixels, mapaEscritorio.heightInPixels);//Define limites da camera

        this.cursors = this.input.keyboard.createCursorKeys();//Adiciona setas para controle no jogo
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);//Adiciona tecla E para controle no jogo
        this.teclaC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C); // Adiciona a tecla 'C' como uma variável

        const colisoes = mapaEscritorio.getObjectLayer('colisoes'); //Puxa camada de objetos "colisoes" do mapa
        const colliders = this.physics.add.staticGroup();//Cria grupo estatico para colisoes

        colisoes.objects.forEach(obj => { //Cria a camada
            const collider = colliders.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider.body.setSize(obj.width, obj.height);
            collider.setOrigin(0.5, 0.5);
            collider.setVisible(false);
            //Essas configuracoes existem pois a origem de objetos no Phaser e no Tiled sao diferentes, o Tiled usa como origem do objeto o canto superior esquerdo dele, enquanto o Phaser usa o centro do objeto
        });

        pedacosU.init(this);

        this.physics.add.collider(this.player.sprite, colliders)//Adiciona colisao entre o player e a camada de colisoes

        const portaCidade = mapaEscritorio.getObjectLayer('portaCidade'); //Puxa camada de objetos "portaCidade" do mapa
        const portais = this.physics.add.staticGroup();//Cria grupo estatico para a porta

        portaCidade.objects.forEach(obj =>{//Cria a camada
            const tp = portais.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            tp.body.setSize(obj.width, obj.height);
            tp.setOrigin(0.5, 0.5);
            tp.setVisible(false);
            //Essas configuracoes existem pois a origem de objetos no Phaser e no Tiled sao diferentes, o Tiled usa como origem do objeto o canto superior esquerdo dele, enquanto o Phaser usa o centro do objeto

        })

        this.dialogModal = new DialogModalPlugin(this); //Cria o plugin de dialogo nessa cena

        this.anims.create({//Cria a animacao do balao de fala
            key: 'balaoFalaAnim',
            frames: this.anims.generateFrameNumbers('balaoFala', { start: 0, end: 1 }), // Assumindo frames de 0 a 4
            frameRate: 4,
            repeat: -1 // Repete a animação indefinidamente
        });

        this.physics.add.overlap(this.player.sprite, portais, function() { //Define cena iniciada quando o player sobrepor a camada portaCidade
            this.pedacosColetados = pedacosU.getValor();
            if(this.pedacosColetados >= 1) {
            this.scene.start('cenaCidade', { x: 135, y: 310, escritorio: this.jogoTerminado, nomeJogador: this.nomeJogador, escritorio: true});
            }}, null, this);

        this.scene.launch('celular');
        this.scene.pause('celular');

    }

    update(time, delta) {
        //Verifica a interação com os NPCs
        this.pedacosColetados = pedacosU.getValor();
        this.npcs.forEach(npc => {
            const distancia = Phaser.Math.Distance.Between(this.player.sprite.x, this.player.sprite.y, npc.x, npc.y)
            npc.texturaInteracao()
            // Verifica se o jogador está próximo o suficiente, se a tecla 'E' foi pressionada, se o jogador não está se movendo, e se o NPC tem a textura 'NPC8close'
            // Em algum lugar dentro do método update ou após a interação com um NPC
            if (distancia < 50 && Phaser.Input.Keyboard.JustDown(this.teclaE) && !this.isMoving) {
                npc.startDialogue()
                npc.interagido = true;
                this.completeTask('Fale com o colaborador');
                // Verifica o estado do jogo e adiciona a task apropriada
                const novaTask = this.jogoTerminado ? 'Explore a cidade e visite os\nestabelecimentos' : 'Encontre o computador e\nresolva o hack do sistema';
                if (!this.tasks.includes(novaTask)) {
                    this.tasks.unshift(novaTask);
                    if (this.hud) this.hud.updateTasks(this.tasks); // Atualiza a HUD imediatamente
                }
                switch (this.jogoTerminado) {
                    case true:
                        this.completeTask('Fale com o colaborador')
                        if(this.pedacosColetados < 1) {
                        if(!this.dialogoAtivo){
                            pedacosU.novoPedaco()
                            this.imgRx = ('ppEsc')
                            this.popUp(this.imgRx)
                        }}
                        this.scene.get('HUD').updatePedacosText();
                        break;
                    case false:
                        break;
                }
            }

        })
        this.pedacosColetados = pedacosU.getValor()

        if (this.pedacosColetados > 1) {
            this.tasks.length = 0;
        }
        //Quando o jogador obter todos os pedaços, a task Explore a cidade será completada
        if (this.pedacosColetados === 7) {
        this.completeTask('Explore a cidade e visite os\nestabelecimentos')
        }

        this.pedacosColetados = pedacosU.getValor();

    if (this.pedacosColetados === 7 && !this.npcFinalCriado) {
        // Destrua o npcEscritorio e outros NPCs desnecessários
        this.npcs.forEach((npc) => {
            // Verifique se o npc tem uma propriedade específica que você definiu para o npcEscritorio
            // ou utilize o nome se isso foi definido, como npc.name === 'NPC8'
            if (npc.name === 'NPC8') {
                npc.destroy(); // Destrua o npcEscritorio
            }
        });

        // Remova todos os NPCs destruídos do array para limpeza
        this.npcs = this.npcs.filter(npc => npc.active);

        // Agora, crie o npcFinal, como explicado anteriormente
        const npcFinal = new NPC(this, 170, 190, 'NPC10', null, {
            name: 'NPC10',
            dialog: [
                { text: `Obrigado ${this.nomeJogador}!\nVocê conseguiu recuperar\ntodos os pedaços do 'U'!`, imageKey: "NPC10dialogo" },
                { text: `Como forma de aprovação\nda UniOps, complete o\nquiz final e receba seu\ncertificado!`, imageKey: "NPC10dialogo" },                { text: `Como forma de aprovação\nda UniOps, complete o\nquiz final e receba seu\ncertificado!`, imageKey: "NPC10dialogo" },
                { text: `Abra seu celular e acesse\ndo quiz no terceiro ícone!`, imageKey: "NPC10dialogo" },

            ],
            interactTexture: 'NPC10close'
        });

        this.npcs.push(npcFinal);
        this.add.existing(npcFinal);
        this.npcFinalCriado = true;
    }

        // Permite a movimentação do personagem se não houver diálogo ativo.
        if (!this.dialogoAtivo) {
            this.player.update(this.cursors);
        }
        //Calcula a distancia entre o player e o computador
        const distanciaPC = Phaser.Math.Distance.Between(this.player.sprite.x, this.player.sprite.y, this.pcSprite.x, this.pcSprite.y);

        if (distanciaPC < 55 && !this.balaoFalaSprite) {
            // Cria e inicia a animação do balão de fala
            this.balaoFalaSprite = this.add.sprite(460, 350, 'balaoFala');
            this.balaoFalaSprite.anims.play('balaoFalaAnim'); // Inicia a animação
        }
        else{
        }

        // Se estiver perto o suficiente e pressionar a tecla 'E'
        if (distanciaPC < 50 && Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            // Executa a ação:
            this.iniciarHack();

        }

        //Lógica para despausar a cena celular
        if (Phaser.Input.Keyboard.JustDown(this.teclaC) && !this.dialogoAtivo && !this.isMoving) {
            if (!this.celularAtivo) {
            if (!this.scene.get('celular')) {
                this.scene.add('celular', celular, true)
            } else {
                this.scene.resume('celular')
            }
            this.celularAtivo = true
            } else {
            this.scene.remove('celular')
            this.celularAtivo = false
            }

        }
    }
    //Função para iniciar a cena Hack (mini game)
    iniciarHack() {
            this.completeTask('Encontre o computador e\nresolva o hack do sistema');
            if (!this.tasks.includes('Fale com o colaborador')) {
                this.tasks.unshift('Fale com o colaborador');
            }
            this.jogoTerminado = true;
            this.scene.start('cenaHack1', {hud: this.hud, nomeJogador: this.nomeJogador}, this.game);
            this.game.events.emit('stopBackgroundMusic');
            console.log(this.jogoTerminado);
            if (this.hud) {
                this.hud.updateTasks(this.tasks);
            }

    }
    //função para completar tasks
    completeTask(taskName) {
        this.tasks = this.tasks.filter(task => task !== taskName)
        this.hud.updateTasks(this.tasks)
        }

        popUp(imagem) {

            var popupImage = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + 15, imagem).setDepth(1).setScale(0.6);
            popupImage.setScrollFactor(0); // Isso garante que a imagem fique fixa na tela e não se mova com a câmera
            // Agendar o desaparecimento da imagem após 2 segundos
            this.time.delayedCall(2000, () => {
                popupImage.destroy(); // Destruir a imagem, removendo-a da cena
            }, [], this);
        }

    }

