import Player from "../configs/player.js"; //Importa player
import DialogModalPlugin from "../plugin/dialog_plugin.js";
import NPC from "../configs/NPC.js";
import HUD from "../configs/HUD.js";
import celular from "../configs/celular/celular.js";
import pedacosU from "../configs/pedacosU.js";

export default class cenaCidade extends Phaser.Scene { //Cria cena e define como Cena pelo Phaser
    constructor() {
        super({ key: 'cenaCidade' }); //Da nome a cena
        this.dialogoAtivo = false;
        this.tasks = ['Fale com o colaborador da \nfrente do escritório'];
        this.hudIniciada = false;
        this.celularAtivo = false;
        this.quizAtivo = false;
        this.quizRxTerminado = false;
        this.quizMtTerminado = false;
        this.pedacosColetados = pedacosU.getValor();
    }

    init(data) {
        // Captura as coordenadas iniciais do jogador, se elas forem passadas como parte dos dados
        this.startingX = data.x || 110; // Valor padrão se nenhum 'x' for passado
        this.startingY = data.y || 330; // Valor padrão se nenhum 'y' for passado
        this.nomeJogador = data.nomeJogador || 'Jogador';
        this.escritorio = data.escritorio || this.escritorio;
    }
    create() {
        this.game.events.on('stopBackgroundMusic', this.pararMusicaDeFundo, this);

        if (!this.hudIniciada) {
            this.scene.add('HUD', HUD, true);
            this.hud = this.scene.get('HUD');
            this.hud.updateTasks(this.tasks);
            this.hudIniciada = true; // Atualizar o estado da Hud para iniciada
        }
        const map = this.make.tilemap({ key: 'mapaCidade' });  //Cria e da nome ao mapa do jogo

        //Cria tilesets usados no Tiled dentro do jogo
        const tilesetDec = map.addTilesetImage('cidadedec', 'cidadedec');
        const tilesetCidade = map.addTilesetImage('cidade', 'cidade');
        const tilesetEscola = map.addTilesetImage('escola', 'escola');
        const tilesetLojas = map.addTilesetImage('lojas', 'lojas');
        const tilesetPredios = map.addTilesetImage('predios', 'predios');
        const tilesetPrediosesc = map.addTilesetImage('prediosesc', 'prediosesc');
        const tilesetTerreno = map.addTilesetImage('terreno', 'terreno');

        //Cria camadas do Tiled no jogo
        const chao = map.createLayer('chao', [tilesetCidade, tilesetTerreno, tilesetDec], 0, 0); //Define nome, tilesets usados, e posicao para cada uma das camadas
        const predios = map.createLayer('predios', [tilesetPredios, tilesetPrediosesc, tilesetLojas], 0, 0);
        const decoracao2 = map.createLayer('decoracao2', [tilesetDec, tilesetEscola, tilesetTerreno, tilesetCidade, tilesetLojas], 0, 0)

        this.cameras.main.fadeIn(1000); //fade sempre que a cena for iniciada

        //Cria constante para definir o personagem selecionado na cena dedicada e aplicar nessa cena
        const personagemSelecionado = this.sys.settings.data.personagemSelecionado;

        pedacosU.init(this);

        let playerKey //Define variavel playerKey baseado no personagem escolhido na cena dedicada
        playerKey = `personagem${personagemSelecionado}`

        this.physics.world.bounds.width = map.widthInPixels; //Define limites do mapa
        this.physics.world.bounds.height = map.heightInPixels;

        this.npcs = []; //Cria array de NPCs

            if (!this.escritorio) {
        const npcEscritorio = new NPC(this, 170, 330, 'NPC1', null, {
            dialog: [
                { text: `Olá, ${this.nomeJogador}!\nSeja bem-vindo(a) à equipe de\nTI da Unilever.`, imageKey: "NPC1dialogo" },
                { text: `Estou muito feliz em\nconhecê-lo(a) e te-lo(a) aqui\nno processo de Onboarding.`, imageKey: "NPC1dialogo" },
                { text: `Espero que goste do seu\ntempo aqui na empresa e\nde fazer parte da\ncomunidade Unilever.`, imageKey: "NPC1dialogo" },
                { text: `Agora, entre pela porta do\nprédio e comece o tour pela\nCidade Unilever.`, imageKey: "NPC1dialogo" },
            ],
            interactTexture: 'NPC1close' // Adicione a textura de interação aqui
        });

        this.npcs.push(npcEscritorio); //Coloca o NPC no array
        this.add.existing(npcEscritorio);
        }
        if (this.escritorio) {
        const npcRexona = new NPC(this, 235, 530, 'NPC2', null, {
            dialog: [
                { text: `Olá, ${this.nomeJogador}!\nSeja bem-vindo(a) ao\ncampo da rexona.`, imageKey: "NPC2dialogo" },
                { text: `Rexona é uma marca\nreconhecida por seu\nslogan 'Não te abandona'.`, imageKey: "NPC2dialogo" },
                { text: `Refletindo seu\ncompromisso em fornecer\nproteção confiável contra\no suor e odores por`, imageKey: "NPC2dialogo" },
                { text: `...horas. Presente em mais\nde 200 países, Rexona é\numa escolha popular para\npessoas que buscam`, imageKey: "NPC2dialogo" },
                { text: `…confiança e frescor ao\nlongo do dia.`, imageKey: "NPC2dialogo" },
            ],
            interactTexture: 'NPC2close' // Adicione a textura de interação aqui
        });

        this.npcs.push(npcRexona); //Coloca o NPC no array
        this.add.existing(npcRexona);

        const npcMT1 = new NPC(this, 790, 1051, 'NPC4', null, {
            dialog: [
                { text: `Olá, ${this.nomeJogador}!\nSeja bem-vindo(a) ao\nparque da mãe terra.`, imageKey: "NPC4dialogo" },
                { text: `Mãe Terra é uma marca que\nse destaca por oferecer\nprodutos naturais e\norgânicos, com foco em`, imageKey: "NPC4dialogo" },
                { text: `…alimentação saudável e\nsustentabilidade. Fundada\nem 1979, a marca busca\npromover hábitos de vida`, imageKey: "NPC4dialogo" },
                { text: `…saudáveis por meio de\nseus produtos nutritivos\ne ecologicamente corretos.`, imageKey: "NPC4dialogo" },
            ],
            interactTexture: 'NPC4close' // Adicione a textura de interação aqui
        });

        this.npcs.push(npcMT1); //Coloca o NPC no array
        this.add.existing(npcMT1);

    }

        //Logica de musica de fundo
        if (!this.game.registry.get('musicaDeFundoTocando')) {
            this.musicaDeFundo = this.sound.add('musicaDeFundo', { volume: 0.1, loop: true });
            this.musicaDeFundo.play();
            // Atualiza o estado global para indicar que a música está tocando
            this.game.registry.set('musicaDeFundoTocando', true);
        }

        this.anims.create({//Cria animacao para o balao de fala
            key: 'balaoFalaAnim',
            frames: this.anims.generateFrameNumbers('balaoFala', { start: 0, end: 1 }), // Assumindo frames de 0 a 4
            frameRate: 2,
            repeat: -1 // Repete a animação indefinidamente
        });
        if (!this.memoria) {
        this.cabineTelefonica = this.add.image(744, 522, 'cabineTelefonica');
        this.balaoCabine = this.add.sprite(742, 568, 'balaoFala').play('balaoFalaAnim').setVisible(false);
        }

        this.uFachada = this.add.image(136.5, 249.5, 'uFachada0')

        //Configs do player
        this.player = new Player(this, this.startingX, this.startingY, playerKey);  //Cria o player
        this.player.sprite.anims.play('idlefront', true);//Define animacao inicial do player
        this.cameras.main.startFollow(this.player.sprite);//Camera ira seguir o player
        this.cameras.main.setZoom(2.5);//Zoom da camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);//Define limites da camera

        //Crie controles que serao usados no jogo
        this.cursors = this.input.keyboard.createCursorKeys();//Adiciona setas para controle no jogo
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);//Adiciona tecla E para controle no jogo
        this.teclaC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        const decoracao = map.createLayer('decoracao', [tilesetDec, tilesetCidade, tilesetPrediosesc, tilesetEscola, tilesetTerreno, tilesetLojas], 0, 0);
        const decoracaoArvores = map.createLayer('decoracaoArvores', [tilesetDec], 0, 0);

        //Cria camada de colisoes do Tiled no jogo
        const colisoes = map.getObjectLayer('colisoes');
        const colliders = this.physics.add.staticGroup();

        colisoes.objects.forEach(obj => { //Cria a camada
            const collider = colliders.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider.body.setSize(obj.width, obj.height);
            collider.setOrigin(0.5, 0.5);
            collider.setVisible(false);
            //Essas configuracoes existem pois a origem de objetos no Phaser e no Tiled sao diferentes, o Tiled usa como origem do objeto o canto superior esquerdo dele, enquanto o Phaser usa o centro do objeto
        });

        this.physics.add.collider(this.player.sprite, colliders); //Adiciona colisao entre o player e a camada de colisoes
        this.physics.add.collider(this.player.sprite, this.npc1); //Adiciona colisao entre o player e a camada de colisoes
        //-----------------------------------------------------INICIO
        //Cria portais dentro do jogo baseados no mapa do tiled para mudanca de cena e cenario
        const portaUnilever = map.getObjectLayer('portaUnilever');
        const portalUni = this.physics.add.staticGroup();

        portaUnilever.objects.forEach(obj =>{
            const tp = portalUni.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            tp.body.setSize(obj.width, obj.height);
            tp.setOrigin(0.5, 0.5);
            tp.setVisible(false);
        })

        this.physics.add.overlap(this.player.sprite, portalUni, function() {
            if(this.npcDialogo1 && this.pedacosColetados < 1 || this.pedacosColetados > 6){
                this.scene.start('cenaEscritorio', {x: 40, y: 210, nomeJogador: this.nomeJogador, hud: this.hud, escritorio: true });
                this.completeTask('Entre no escritório');
                this.completeTask('Volte para o escritorio');
            }
        }, null, this);


        if(this.escritorio){
        const portaLavanderia = map.getObjectLayer('portaLavanderia');
        const portalLavanderia = this.physics.add.staticGroup();

        portaLavanderia.objects.forEach(obj =>{
            const tp = portalLavanderia.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            tp.body.setSize(obj.width, obj.height);
            tp.setOrigin(0.5, 0.5);
            tp.setVisible(false);
        })

        this.physics.add.overlap(this.player.sprite, portalLavanderia, function() {
            this.scene.start('cenaLavanderia', {nomeJogador: this.nomeJogador});
        }, null, this);

        const portaKibon = map.getObjectLayer('portaKibon');
        const portalKibon = this.physics.add.staticGroup();

        portaKibon.objects.forEach(obj =>{
            const tp = portalKibon.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            tp.body.setSize(obj.width, obj.height);
            tp.setOrigin(0.5, 0.5);
            tp.setVisible(false);
        })

        this.physics.add.overlap(this.player.sprite, portalKibon, function() {
            this.scene.start('cenaKibon', {nomeJogador: this.nomeJogador});
        }, null, this);

        const portaClear = map.getObjectLayer('portaClear');
        const portalClear = this.physics.add.staticGroup();

        portaClear.objects.forEach(obj =>{
            const tp = portalClear.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            tp.body.setSize(obj.width, obj.height);
            tp.setOrigin(0.5, 0.5);
            tp.setVisible(false);
        })

        this.physics.add.overlap(this.player.sprite, portalClear, function() {
            this.scene.start('cenaClear', {nomeJogador: this.nomeJogador});
        }, null, this);
    }
        //---------------------------------------------------------------------------FIM


        // Adiciona o plugin de diálogo
        this.dialogModal = new DialogModalPlugin(this);


        if (!this.hudIniciada) {
            this.scene.add('HUD', HUD, true);
            this.hud = this.scene.get('HUD');
            this.hud.updateTasks(this.tasks);
            this.hudIniciada = true; // Atualizar o estado da Hud para iniciada
        }


        this.scene.launch('celular');
        this.scene.pause('celular');

    }
        pararMusicaDeFundo() {
        if (this.musicaDeFundo && this.musicaDeFundo.isPlaying) {
            this.musicaDeFundo.stop();
            this.game.registry.set('musicaDeFundoTocando', false);
        }
        }
        update(time, delta) {
            //Verifica a interação com os NPCs
        this.npcs.forEach(npc => {
            this.physics.add.collider(this.player.sprite, npc);
            const distancia = Phaser.Math.Distance.Between(this.player.sprite.x, this.player.sprite.y, npc.x, npc.y);
            if(!this.npcCabineD) {
            npc.texturaInteracao();
            }
            if (distancia < 50 && Phaser.Input.Keyboard.JustDown(this.teclaE) && !this.isMoving && !this.quizAtivo) {
                npc.startDialogue();
                ///ESPAÇO PARA O QUIZ DEPOIS DE FALAR COM NPC
            const texturaNPC = npc.texture.key
            switch (texturaNPC) {
                case 'NPC1close':
                    this.completeTask('Fale com o colaborador da \nfrente do escritório');
                    this.npcDialogo1 = true;
                    if (!this.escritorio && !this.tasks.includes('Entre no escritório')) {
                        this.tasks.push('Entre no escritório');
                    }
                    break;
                case 'NPC2close': //rexona
                    if(!this.dialogoAtivo && !this.quizRxTerminado){
                        this.comecarQuizRexona()
                    }
                    break;
                case 'NPC4close': // mt
                    if(!this.dialogoAtivo && !this.quizMtTerminado){
                        this.comecarQuizMT()
                    }
                    break;
                case 'NPC2close':
                case 'NPC4close':
                case 'NPC5close':
                    if (!npc.interagido) { // Verifica se o NPC já foi interagido
                        npc.interagido = true; // Marca o NPC como já interagido
                    }
                        break;
                case 'NPC3close':
                    this.npcCabineD =  true;
                    break;
                }
        }})
        this.pedacosColetados = pedacosU.getValor();
        //switch case para manilular como os pedaços do U estão sendo utilizados dentro da cena Cidade
        switch(this.pedacosColetados){
            case 1:
                this.uFachada.setTexture('uFachada1') //atualização da textura para 1/7 do U
                break;
            case 2:
                this.uFachada.setTexture('uFachada2') //atualização da textura para 2/7 do U
                break;
            case 3:
                this.uFachada.setTexture('uFachada3') //atualização da textura para 3/7 do U
                break;
            case 4:
                this.uFachada.setTexture('uFachada4') //atualização da textura para 4/7 do U
                break;
            case 5:
                this.uFachada.setTexture('uFachada5') //atualização da textura para 5/7 do U
                break;
            case 6:
                this.uFachada.setTexture('uFachada6'); //atualização da textura para 6/7 do U
                this.completeTask('Explore a cidade e\nentre nos estabelecimentos'); //completa a task Explore a cidade e encaminha o player até a cabine telefônica
                if (!this.tasks.includes('Vá até a cabine telefonica')) { 
                    this.tasks.unshift('Vá até a cabine telefonica'); //Muda a task para encaminhar o player até a cabine telefônica
                }
                this.pedacosColetados = pedacosU.getValor();
                if (!this.npcCabineCriado) { // Verifica se o NPC da cabine já foi criado
                    const npcCabine = new NPC(this, 788, 543, 'NPC3', null, {
                        dialog: [
                            { text: `Olá!\nvi que você está\nrecuperando os nossos\nvaliosos símbolos.`, imageKey: "NPC3dialogo" },
                            { text: `Acredito que na cabine\nde esteja o ultimo deles`, imageKey: "NPC3dialogo" },
                            { text: `Entre nela e confira`, imageKey: "NPC3dialogo" }
                        ],
                        interactTexture: 'NPC3close'
                    });
                    this.npcs.push(npcCabine);
                    this.add.existing(npcCabine);
                    this.npcCabineCriado = true; // Marca o NPC da cabine como criado
                }
                break;
            case 7:
                this.uFachada.setTexture('uFachada7') //atualização da textura para o U completo
                this.completeTask('Vá até a cabine telefonica') //Completa a task referente a cabine
                if (!this.tasks.includes('Volte para o escritorio')) {
                this.tasks.push('Volte para o escritorio') //Adiciona a task para guiar o player até o escritório
                }
                this.npcs.forEach(npc => npc.destroy()); //Destrói todos os NPCs
                this.npcs.length = 0;
                break;
        }
        // Permite a movimentação do personagem se não houver diálogo ativo.
        if (!this.dialogoAtivo && !this.quizAtivo) {
            this.player.update(this.cursors);
        }
        //Despausa a cena Celular quando o player apertar a tecla E
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
        //Calcula a distância entre o player e a cabine telefônica
        if (Phaser.Math.Distance.Between(this.player.sprite.x, this.player.sprite.y, this.cabineTelefonica.x, this.cabineTelefonica.y) < 70) {
            if(this.npcCabineD && this.pedacosColetados === 6){
                this.cabineTelefonica.setTexture('cabineTelefonicaClose') //Muda a textura da cabine
                this.balaoCabine.setVisible(true)
            }
        } else {
            this.cabineTelefonica.setTexture('cabineTelefonica') //Mantém a textura padrão
            this.balaoCabine.setVisible(false)
        }
        //Calcula a distância entre o player e a cabine telefônica
        if (Phaser.Math.Distance.Between(this.player.sprite.x, this.player.sprite.y, this.cabineTelefonica.x, this.cabineTelefonica.y) < 70 && Phaser.Input.Keyboard.JustDown(this.teclaE) && this.escritorio){
            if (this.npcCabineD && this.pedacosColetados === 6) {
            this.scene.start('inicioJogoMemoria');//Inicia o jogo da memória
            pedacosU.novoPedaco(); //Aumenta um pedaço do U
            this.scene.get('HUD').updatePedacosText(); //Atualiza a HUD com os pedaços do U
            }
        };
        }
    //função para completar task
    completeTask(taskName) {
    // Remove the task from the list
    this.tasks = this.tasks.filter(task => task !== taskName)
    // Update the HUD
    this.hud.updateTasks(this.tasks)
    }
    // Inicializa e configura elementos visuais e lógicos do quiz, como perguntas e opções de resposta.
    // Gerencia as interações do jogador com as opções de resposta e o feedback visual para respostas corretas ou incorretas.
    //Quiz campo da Rexona
    comecarQuizRexona(){
        if (!this.dialogoAtivo) {
            this.quizAtivo = true;
            const visibleWidth = this.cameras.main.width / this.cameras.main.zoom;
            const visibleHeight = this.cameras.main.height / this.cameras.main.zoom;
            const centerX = this.cameras.main.scrollX + visibleWidth / 2;
            const centerY = this.cameras.main.scrollY + visibleHeight / 2;

        let celularQuiz = this.add.sprite(centerX + 240, centerY + 180, 'celularQuiz').setScale(0.38).setInteractive();
        let caixaPergunta = this.add.image(centerX + 240, centerY +135, 'caixaPergunta').setScale(0.4).setInteractive();
        let resposta1 = this.add.image(centerX + 184, centerY +170, 'caixaResposta').setScale(0.4).setInteractive();
        let resposta2 = this.add.image(centerX + 294, centerY +170, 'caixaResposta').setScale(0.4).setInteractive();
        let resposta3 = this.add.image(centerX + 184, centerY + 215, 'caixaResposta').setScale(0.4).setInteractive();
        let resposta4 = this.add.image(centerX + 294, centerY + 215, 'caixaResposta').setScale(0.4).setInteractive();
        let caixaVerde = this.add.image(centerX + 184, centerY + 215, 'caixaVerde').setScale(0.4).setInteractive().setVisible(false);
        let caixaVermelha = this.add.image(centerX + 184, centerY + 170, 'caixaVermelha').setScale(0.4).setInteractive().setVisible(false);
        let restartButton = this.add.image(centerX + 240, centerY + 215, 'botaoRestart').setScale(0.2).setInteractive().setVisible(false);
        let pergunta1 = this.add.text(centerX + 150, centerY + 122 ,'Qual é o slogan famoso\n da marca Rexona?',  { fontSize: '12px', fill: '#4169E1', fontFamily: 'SaboFilled', resolution: 10, }).setVisible(true).setDepth(2)
        let resposta1txt1 = this.add.text(centerX + 184, centerY + 170 ,'Fique seco\no dia todo',  { fontSize: '12px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10, }).setVisible(true).setDepth(2).setOrigin(0.5, 0.5)
        let resposta2txt1 = this.add.text(centerX + 294, centerY +170 ,'Proteção\ngarantida',  { fontSize: '12px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10, }).setVisible(true).setDepth(2).setOrigin(0.5, 0.5)
        let resposta3txt1 = this.add.text(centerX + 184, centerY + 215 ,'Não te\nabandona',  { fontSize: '12px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10, }).setVisible(true).setDepth(2).setOrigin(0.5, 0.5)
        let resposta4txt1 = this.add.text(centerX + 294, centerY + 215 ,'Mantenha-se\n fresco',  { fontSize: '12px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10, }).setVisible(true).setDepth(2).setOrigin(0.5, 0.5)

        resposta3.on('pointerdown', () => {
            if (resposta3txt1.text === 'Não te\nabandona'){
                caixaVerde.setVisible(true)
                caixaVerde.x = centerX + 184;
                caixaVerde.y = centerY + 215;
                this.time.delayedCall(1000, () => {
                caixaVerde.setVisible(false)
                resposta1txt1.setText('50 países');
                resposta2txt1.setText('100 países');
                resposta3txt1.setText('150 países');
                resposta4txt1.setText('mais de\n200 países');
                pergunta1.setText('Em quantos países a Rexona\nestá presente atualmente?').setFontSize(11);
            })
            }
            else{
                caixaVermelha.setVisible(true)
                caixaVermelha.x = centerX + 184;
                caixaVermelha.y = centerY + 215;
                this.time.delayedCall(1000, () => {
                restartButton.setVisible(true);
                caixaPergunta.setVisible(false);
                resposta1.setVisible(false);
                resposta2.setVisible(false);
                resposta3.setVisible(false);
                resposta4.setVisible(false);
                caixaVermelha.setVisible(false);
                pergunta1.setVisible(false);
                resposta1txt1.setVisible(false);
                resposta2txt1.setVisible(false);
                resposta3txt1.setVisible(false);
                resposta4txt1.setVisible(false);
            })
            }
            })
        resposta1.on('pointerdown', () => {
                if(resposta1txt1.text === 'Kibon, todo\nmundo fica feliz'){
                    caixaVerde.x = centerX + 184;
                    caixaVerde.y = centerY + 170;
                    caixaVerde.setVisible(true)
                    this.time.delayedCall(1000, () => {
                        restartButton.destroy();
                        caixaPergunta.destroy();
                        resposta1.destroy();
                        resposta2.destroy();
                        resposta3.destroy();
                        resposta4.destroy();
                        caixaVermelha.destroy();
                        pergunta1.destroy();
                        resposta1txt1.destroy();
                        resposta2txt1.destroy();
                        resposta3txt1.destroy();
                        resposta4txt1.destroy();
                        caixaVerde.destroy();
                        celularQuiz.destroy();
                    })
                } else{
                    caixaVermelha.setVisible(true)
                    caixaVermelha.x = centerX + 184;
                    caixaVermelha.y = centerY + 170;
                    this.time.delayedCall(1000, () => {
                        restartButton.setVisible(true);
                        caixaPergunta.setVisible(false);
                        resposta1.setVisible(false);
                        resposta2.setVisible(false);
                        resposta3.setVisible(false);
                        resposta4.setVisible(false);
                        caixaVermelha.setVisible(false);
                        pergunta1.setVisible(false);
                        resposta1txt1.setVisible(false);
                        resposta2txt1.setVisible(false);
                        resposta3txt1.setVisible(false);
                        resposta4txt1.setVisible(false);
                    })
                }
        });
        resposta2.on('pointerdown', () => {
                if(resposta2txt1 === ''){

                }
                else{
                caixaVermelha.x = centerX + 294;
                caixaVermelha.y = centerY +170;
                caixaVermelha.setVisible(true);
                this.time.delayedCall(1000, () => {
                    restartButton.setVisible(true);
                    caixaPergunta.setVisible(false);
                    resposta1.setVisible(false);
                    resposta2.setVisible(false);
                    resposta3.setVisible(false);
                    resposta4.setVisible(false);
                    caixaVermelha.setVisible(false);
                    pergunta1.setVisible(false);
                    resposta1txt1.setVisible(false);
                    resposta2txt1.setVisible(false);
                    resposta3txt1.setVisible(false);
                    resposta4txt1.setVisible(false);
                })
                }
        });

        resposta4.on('pointerdown', () => {
            if(resposta4txt1.text === 'mais de\n200 países'){
                caixaVerde.x = centerX + 294;
                caixaVerde.y =  centerY + 215;
                caixaVerde.setVisible(true)
                this.time.delayedCall(1000, () => {
                    restartButton.destroy();
                    caixaPergunta.destroy();
                    resposta1.destroy();
                    resposta2.destroy();
                    resposta3.destroy();
                    resposta4.destroy();
                    caixaVermelha.destroy();
                    pergunta1.destroy();
                    resposta1txt1.destroy();
                    resposta2txt1.destroy();
                    resposta3txt1.destroy();
                    resposta4txt1.destroy();
                    caixaVerde.destroy();
                    celularQuiz.destroy();
                    this.quizAtivo = false;
            this.quizRxTerminado = true;
            this.imgRx = ('ppRx')
            pedacosU.novoPedaco(); // Incrementa o contador
            this.popUp(this.imgRx)
            this.scene.get('HUD').updatePedacosText();
                })
            }
            else{
                caixaVermelha.x = centerX + 294;
                caixaVermelha.y = centerY + 215;
                caixaVermelha.setVisible(true);

                this.time.delayedCall(1000, () => {
                    restartButton.setVisible(true);
                    caixaPergunta.setVisible(false);
                    resposta1.setVisible(false);
                    resposta2.setVisible(false);
                    resposta3.setVisible(false);
                    resposta4.setVisible(false);
                    caixaVermelha.setVisible(false);
                    pergunta1.setVisible(false);
                    resposta1txt1.setVisible(false);
                    resposta2txt1.setVisible(false);
                    resposta3txt1.setVisible(false);
                    resposta4txt1.setVisible(false);
                    })
            }
        });

        restartButton.on('pointerdown', () => {
            restartButton.setVisible(false)
            caixaPergunta.setVisible(true);
            resposta1.setVisible(true);
            resposta2.setVisible(true);
            resposta3.setVisible(true);
            resposta4.setVisible(true);
            pergunta1.setVisible(true);
            resposta1txt1.setVisible(true);
            resposta2txt1.setVisible(true);
            resposta3txt1.setVisible(true);
            resposta4txt1.setVisible(true);
        })
        //Quando o ponteiro está em cima do botão, a textura do mesmo é ressaltada
        restartButton.on('pointerover', () => {
            restartButton.setTexture('botaoRestartHover');
        });

        // Quando o ponteiro sai de cima do botão, volta para a textura original
        restartButton.on('pointerout', () => {
            restartButton.setTexture('botaoRestart');
        });
    };
        }

    comecarQuizMT() {
        if (!this.dialogoAtivo) {
            this.quizAtivo = true;
            const visibleWidth = this.cameras.main.width / this.cameras.main.zoom;
            const visibleHeight = this.cameras.main.height / this.cameras.main.zoom;
            const centerX = this.cameras.main.scrollX + visibleWidth / 2;
            const centerY = this.cameras.main.scrollY + visibleHeight / 2;

        let celularQuiz = this.add.sprite(centerX + 240, centerY + 180, 'celularQuiz').setScale(0.38).setInteractive();
        let caixaPergunta = this.add.image(centerX + 240, centerY +135, 'caixaPergunta').setScale(0.4).setInteractive();
        let resposta1 = this.add.image(centerX + 184, centerY +170, 'caixaResposta').setScale(0.4).setInteractive();
        let resposta2 = this.add.image(centerX + 294, centerY +170, 'caixaResposta').setScale(0.4).setInteractive();
        let resposta3 = this.add.image(centerX + 184, centerY + 215, 'caixaResposta').setScale(0.4).setInteractive();
        let resposta4 = this.add.image(centerX + 294, centerY + 215, 'caixaResposta').setScale(0.4).setInteractive();
        let caixaVerde = this.add.image(centerX + 184, centerY + 215, 'caixaVerde').setScale(0.4).setInteractive().setVisible(false);
        let caixaVermelha = this.add.image(centerX + 184, centerY + 170, 'caixaVermelha').setScale(0.4).setInteractive().setVisible(false);
        let restartButton = this.add.image(centerX + 240, centerY + 215, 'botaoRestart').setScale(0.2).setInteractive().setVisible(false);
        let pergunta1 = this.add.text(centerX + 150, centerY + 122 ,'Qual é o foco principal dos\nprodutos da marca Mãe Terra?',  { fontSize: '10px', fill: '#4169E1', fontFamily: 'SaboFilled', resolution: 10, }).setVisible(true).setDepth(2)
        let resposta1txt1 = this.add.text(centerX + 184, centerY + 170 ,'Alimentos\nprocessados',  { fontSize: '12px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10, }).setVisible(true).setDepth(2).setOrigin(0.5, 0.5)
        let resposta2txt1 = this.add.text(centerX + 294, centerY +170 ,'Produtos de\nlimpeza',  { fontSize: '12px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10, }).setVisible(true).setDepth(2).setOrigin(0.5, 0.5)
        let resposta3txt1 = this.add.text(centerX + 184, centerY + 215 ,'Alimentação saudável\ne orgânica',  { fontSize: '7px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10, }).setVisible(true).setDepth(2).setOrigin(0.5, 0.5)
        let resposta4txt1 = this.add.text(centerX + 294, centerY + 215 ,' Bebidas\nenergéticas',  { fontSize: '12px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10, }).setVisible(true).setDepth(2).setOrigin(0.5, 0.5)

        resposta3.on('pointerdown', () => {
            if (resposta3txt1.text === 'Alimentação saudável\ne orgânica'){
                caixaVerde.setVisible(true)
                caixaVerde.x = centerX + 184;
                caixaVerde.y = centerY + 215;
                this.time.delayedCall(1000, () => {
                caixaVerde.setVisible(false)
                resposta1txt1.setText('1956').setFontSize(12);
                resposta2txt1.setText('1967').setFontSize(12);
                resposta3txt1.setText('1985').setFontSize(12);
                resposta4txt1.setText('1979').setFontSize(12);
                pergunta1.setText('Em que ano a marca Mãe\nTerra foi fundada?').setFontSize(12);
            })
            }
            else{
                caixaVermelha.setVisible(true)
                caixaVermelha.x = centerX + 184;
                caixaVermelha.y = centerY + 215;
                this.time.delayedCall(1000, () => {
                restartButton.setVisible(true);
                caixaPergunta.setVisible(false);
                resposta1.setVisible(false);
                resposta2.setVisible(false);
                resposta3.setVisible(false);
                resposta4.setVisible(false);
                caixaVermelha.setVisible(false);
                pergunta1.setVisible(false);
                resposta1txt1.setVisible(false);
                resposta2txt1.setVisible(false);
                resposta3txt1.setVisible(false);
                resposta4txt1.setVisible(false);
            })
            }
            })
        resposta1.on('pointerdown', () => {
                if(resposta1txt1.text === ''){
                } else{
                    caixaVermelha.setVisible(true)
                    caixaVermelha.x = centerX + 184;
                    caixaVermelha.y = centerY + 170;
                    this.time.delayedCall(1000, () => {
                        restartButton.setVisible(true);
                        caixaPergunta.setVisible(false);
                        resposta1.setVisible(false);
                        resposta2.setVisible(false);
                        resposta3.setVisible(false);
                        resposta4.setVisible(false);
                        caixaVermelha.setVisible(false);
                        pergunta1.setVisible(false);
                        resposta1txt1.setVisible(false);
                        resposta2txt1.setVisible(false);
                        resposta3txt1.setVisible(false);
                        resposta4txt1.setVisible(false);
                    })
                }
        });
        resposta2.on('pointerdown', () => {
                if(resposta2txt1 === ''){

                }
                else{
                caixaVermelha.x = centerX + 294;
                caixaVermelha.y = centerY +170;
                caixaVermelha.setVisible(true);
                this.time.delayedCall(1000, () => {
                    restartButton.setVisible(true);
                    caixaPergunta.setVisible(false);
                    resposta1.setVisible(false);
                    resposta2.setVisible(false);
                    resposta3.setVisible(false);
                    resposta4.setVisible(false);
                    caixaVermelha.setVisible(false);
                    pergunta1.setVisible(false);
                    resposta1txt1.setVisible(false);
                    resposta2txt1.setVisible(false);
                    resposta3txt1.setVisible(false);
                    resposta4txt1.setVisible(false);
                })
                }
        });
        resposta4.on('pointerdown', () => {
            if(resposta4txt1.text === '1979'){
                caixaVerde.x = centerX + 294;
                caixaVerde.y = centerY + 215;
                caixaVerde.setVisible(true)
                this.time.delayedCall(1000, () => {
                    restartButton.destroy();
                    caixaPergunta.destroy();
                    resposta1.destroy();
                    resposta2.destroy();
                    resposta3.destroy();
                    resposta4.destroy();
                    caixaVermelha.destroy();
                    pergunta1.destroy();
                    resposta1txt1.destroy();
                    resposta2txt1.destroy();
                    resposta3txt1.destroy();
                    resposta4txt1.destroy();
                    caixaVerde.destroy();
                    celularQuiz.destroy();
                    this.quizAtivo = false;
                this.quizMtTerminado = true;
                this.imgRx = ('ppMT')
                pedacosU.novoPedaco(); // Incrementa o contador
                this.popUp(this.imgRx)
                this.scene.get('HUD').updatePedacosText();
                })
            }
            else{
                caixaVermelha.x = centerX + 294;
                caixaVermelha.y = centerY + 215;
                caixaVermelha.setVisible(true);

                this.time.delayedCall(1000, () => {
                    restartButton.setVisible(true);
                    caixaPergunta.setVisible(false);
                    resposta1.setVisible(false);
                    resposta2.setVisible(false);
                    resposta3.setVisible(false);
                    resposta4.setVisible(false);
                    caixaVermelha.setVisible(false);
                    pergunta1.setVisible(false);
                    resposta1txt1.setVisible(false);
                    resposta2txt1.setVisible(false);
                    resposta3txt1.setVisible(false);
                    resposta4txt1.setVisible(false);
                    })
            }
        });
        restartButton.on('pointerdown', () => {
            restartButton.setVisible(false)
            caixaPergunta.setVisible(true);
            resposta1.setVisible(true);
            resposta2.setVisible(true);
            resposta3.setVisible(true);
            resposta4.setVisible(true);
            pergunta1.setVisible(true);
            resposta1txt1.setVisible(true);
            resposta2txt1.setVisible(true);
            resposta3txt1.setVisible(true);
            resposta4txt1.setVisible(true);
        })

        restartButton.on('pointerover', () => {
            restartButton.setTexture('botaoRestartHover');
        });

        // Quando o ponteiro sai de cima do botão, volta para a textura original
        restartButton.on('pointerout', () => {
            restartButton.setTexture('botaoRestart');
        });
    };
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

