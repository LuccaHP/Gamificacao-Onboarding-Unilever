export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
        this.assetsLoaded = false;
    }

    preload () {
        this.createControlScreen(); //Antes de carregar os assets inicia a funcao definida:
        //CARREGAMENTO DOS ASSETS
        //MAPAS
        this.load.tilemapTiledJSON('mapaCidade', './mapas/mapaConcept.json');
        this.load.tilemapTiledJSON('mapaLavanderia', './mapas/lavanderia.json');
        this.load.tilemapTiledJSON('mapaKibon', './mapas/mapaKibon.json');
        this.load.tilemapTiledJSON('mapaClear', './mapas/mapaClear.json');
        this.load.tilemapTiledJSON('mapaEscritorio', './mapas/mapaEscritorio.json');
        this.load.image('miniMapa', './assets/misc/mapaFoto.png');
        this.load.spritesheet('mapaHack', './assets/jogoHack/mapaHack.png', {frameWidth: 800, frameHeight: 600});
        //---------------------------------------------------------
        //PERSONAGENS
        this.load.spritesheet('personagem1', './assets/personagens/personagem1.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('personagem2', './assets/personagens/personagem2.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('personagem3', './assets/personagens/personagem3.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('personagem4', './assets/personagens/personagem4.png', {frameWidth: 16, frameHeight: 32});
        //---------------------------------------------------------
        //TILESETS
        this.load.image('cidadedec', './assets/tiles/cidadedec.png');
        this.load.image('cidade', './assets/tiles/cidade.png');
        this.load.image('escola', './assets/tiles/escola.png');
        this.load.image('lojas', './assets/tiles/lojas.png');
        this.load.image('predios', './assets/tiles/predios.png');
        this.load.image('lavanderia', './assets/tiles/lavanderia.png');
        this.load.image('prediosesc', './assets/tiles/prediosesc.png');
        this.load.image('sorvete', './assets/tiles/sorvete.png');
        this.load.image('terreno', './assets/tiles/terreno.png');
        this.load.image('bathroom', './assets/tiles/bathroom.png');
        this.load.image('basement', './assets/tiles/basement.png');
        this.load.image('sorveteria', './assets/tiles/sorveteria.png');
        this.load.image('rooms', './assets/tiles/rooms.png')
        this.load.image('saladec', './assets/tiles/saladec.png')
        this.load.image('biblioteca', './assets/tiles/biblioteca.png')
        this.load.image('moveis', './assets/tiles/moveis.png')
        //NPCS
        this.load.spritesheet('NPC1', './assets/npcs/NPC1/NPC1.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('NPC1close', './assets/npcs/NPC1/NPC1close.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('NPC1dialogo', './assets/npcs/NPC1/NPC1dialogo.png');
        //---------------------------------------------------------
        this.load.spritesheet('NPC2', './assets/npcs/NPC2/NPC2.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('NPC2close', './assets/npcs/NPC2/NPC2close.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('NPC2dialogo', './assets/npcs/NPC2/NPC2dialogo.png');
        //---------------------------------------------------------
        this.load.spritesheet('NPC3', './assets/npcs/NPC3/NPC3.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('NPC3close', './assets/npcs/NPC3/NPC3close.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('NPC3dialogo', './assets/npcs/NPC3/NPC3dialogo.png');
        //---------------------------------------------------------
        this.load.spritesheet('NPC4', './assets/npcs/NPC4/NPC4.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('NPC4close', './assets/npcs/NPC4/NPC4close.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('NPC4dialogo', './assets/npcs/NPC4/NPC4dialogo.png');
        //---------------------------------------------------------
        this.load.spritesheet('NPC5', './assets/npcs/NPC5/NPC5.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('NPC5close', './assets/npcs/NPC5/NPC5close.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('NPC5dialogo', './assets/npcs/NPC5/NPC5dialogo.png');
        //---------------------------------------------------------
        this.load.spritesheet('NPC6', './assets/npcs/NPC6/NPC6.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('NPC6close', './assets/npcs/NPC6/NPC6close.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('NPC6dialogo', './assets/npcs/NPC6/NPC6dialogo.png');
        //---------------------------------------------------------
        this.load.spritesheet('NPC7', './assets/npcs/NPC7/NPC7.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('NPC7close', './assets/npcs/NPC7/NPC7close.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('NPC7dialogo', './assets/npcs/NPC7/NPC7dialogo.png');
        //---------------------------------------------------------
        this.load.spritesheet('NPC8', './assets/npcs/NPC8/NPC8.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('NPC8close', './assets/npcs/NPC8/NPC8close.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('NPC8dialogo', './assets/npcs/NPC8/NPC8dialogo.png');
        //---------------------------------------------------------
        this.load.spritesheet('NPC9', './assets/npcs/NPC9/NPC9.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('NPC9close', './assets/npcs/NPC9/NPC9close.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('NPC9dialogo', './assets/npcs/NPC9/NPC9dialogo.png');
        //---------------------------------------------------------
        this.load.spritesheet('NPC10', './assets/npcs/NPC10/NPC10.png', {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('NPC10close', './assets/npcs/NPC10/NPC10close.png', {frameWidth: 16, frameHeight: 32});
        this.load.image('NPC10dialogo', './assets/npcs/NPC10/NPC10dialogo.png');
        //---------------------------------------------------------
        //TELA DE ESCOLHA DE PERSONAGENS
        this.load.image('bgEscolha', './assets/misc/bgEscolha.png');
        this.load.image('personagem1N', './assets/misc/personagem1N.png');
        this.load.image('personagem2N', './assets/misc/personagem2N.png');
        this.load.image('personagem3N', './assets/misc/personagem3N.png');
        this.load.image('personagem4N', './assets/misc/personagem4N.png');
        this.load.image('personagem1Hover', './assets/misc/personagem1Hover.png');
        this.load.image('personagem2Hover', './assets/misc/personagem2Hover.png');
        this.load.image('personagem3Hover', './assets/misc/personagem3Hover.png');
        this.load.image('personagem4Hover', './assets/misc/personagem4Hover.png');
        //---------------------------------------------------------
        //MINIGAME DE HACK
        this.load.image('pcHack', './assets/jogoHack/pcHack.png');
        this.load.image('pcHackBrilho', './assets/jogoHack/pcHackBrilho.png');
        this.load.image('fundoHack', './assets/jogoHack/fundoHackPixel.png');
        this.load.image('fundoHack2', './assets/jogoHack/fundoHack2.png');
        this.load.image('sigla1', './assets/jogoHack/sigla11.png');
        this.load.image('sigla2', './assets/jogoHack/sigla2.png');
        this.load.image('sigla3', './assets/jogoHack/sigla3.png');
        this.load.image('sigla4', './assets/jogoHack/sigla4.png');
        this.load.image('sigla5', './assets/jogoHack/sigla5.png');
        this.load.image('sigla6', './assets/jogoHack/sigla6.png');
        this.load.image('buracoHack', './assets/jogoHack/buracoHack.png');
        this.load.image('luzVermelha', './assets/jogoHack/luzVermelha.png');
        this.load.image('luzVerde', './assets/jogoHack/luzVerde.png');
        this.load.image('fundoGameOver', './assets/jogoHack/fundoGameOver.png');
        //---------------------------------------------------------
        //SONS
        this.load.audio('musicaDeFundo', './assets/sounds/background_game.mp3');
        this.load.audio('somDePassos', './assets/sounds/passos.wav');
        this.load.audio('somInteract', './assets/sounds/interact_sound.wav');
        this.load.audio('musicaHack', './assets/sounds/hack_game.wav');
        this.load.audio('clique', './assets/sounds/Clique.mp3');
        this.load.audio('soltar', './assets/sounds/Soltar.mp3');
        this.load.audio('acerto', './assets/sounds/sucess.wav');
        this.load.audio('erro', './assets/sounds/fail.wav');
        this.load.audio('quizConcluido', './assets/sounds/quiz_concluido.wav');
        //---------------------------------------------------------
        //DIALOGO
        this.load.spritesheet('balaoFala', './assets/misc/balaoFala.png', { frameWidth: 16, frameHeight: 16});
        this.load.plugin('DialogModalPlugin', 'plugin/dialog_plugin.js');
        //---------------------------------------------------------
        //Task
        this.load.image('bordaTask','./assets/misc/bordaTask.png' )
        //---------------------------------------------------------
        //BOTOES
        this.load.image('botaoExitPC', './assets/jogoHack/botaoExitPC.png');
        this.load.image('botaoExitPCHover', './assets/jogoHack/botaoExitPCHover.png');
        this.load.image('botaoRestart', './assets/jogoHack/botaoRestart.png');
        this.load.image('botaoRestartHover', './assets/jogoHack/botaoRestartHover.png');
        //-----------------------------------------------------------
        //CELULAR
        this.load.image('celular', './assets/misc/celular.png');
        this.load.image('appGps', './assets/misc/appGps.png');
        this.load.image('celularGps', './assets/misc/celularGps.png');
        this.load.image('celularGps2', './assets/misc/celularGps2.png');
        this.load.image('botaoHome', './assets/misc/botaoHome.png');
        this.load.image('botaoNext', './assets/misc/botaoNext.png');
        this.load.image('botaoBack', './assets/misc/botaoBack.png');
        this.load.image('botaoQuiz', 'assets/misc/botaoQuiz.png')
        this.load.image('appUrl', './assets/misc/appUrl.png');
        this.load.image('botaoUrls', './assets/misc/botaoUrls.png');
        this.load.image('celularUrls', './assets/misc/celularUrls.png');
        this.load.image('celularCtrl', './assets/misc/celularCtrl.png');
        this.load.image('botaoCtrl', './assets/misc/botaoCtrl.png');
        //-----------------------------------------------------------
        //MINIGAME DE QUIZ
        this.load.image('celularQuiz', './assets/quiz/celularQuiz.png');
        this.load.image('caixaPergunta', './assets/quiz/pergunta.png');
        this.load.image('caixaResposta', './assets/quiz/caixaResposta.png')
        this.load.image('caixaVerde', './assets/quiz/caixaVerde.png')
        this.load.image('caixaVermelha', './assets/quiz/caixaVermelha.png')
        this.load.image('celularQuizInicio','./assets/quiz/celularQuizInicio.png')
        //---------------------------------------------------------
        // JOGO MEMORIA
        this.load.image('cartaParaBaixo', './assets/jogoMemoria/card_back.png'); // Pré-carrega a imagem da carta para baixo
        this.load.image('card_0_0', './assets/jogoMemoria/card_0_0.png');
        this.load.image('card_0_', './assets/jogoMemoria/card_0_.png');
        this.load.image('card_1_1', './assets/jogoMemoria/card_1_1.png');
        this.load.image('card_1', './assets/jogoMemoria/card_1.png');
        this.load.image('card_2_2', './assets/jogoMemoria/card_2_2.png');
        this.load.image('card_2', './assets/jogoMemoria/card_2.png');
        this.load.image('card_3_3', './assets/jogoMemoria/card_3_3.png');
        this.load.image('card_3', './assets/jogoMemoria/card_3.png');
        this.load.image('card_4_4', './assets/jogoMemoria/card_4_4.png');
        this.load.image('card_4', './assets/jogoMemoria/card_4.png');
        this.load.image('card_5_5', './assets/jogoMemoria/card_5_5.png');
        this.load.image('card_5', './assets/jogoMemoria/card_5.png');
        this.load.image('coracao', './assets/jogoMemoria/coracao.png'); // Pré-carrega a imagem do coração
        this.load.image('bgMemoria', './assets/jogoMemoria/background.png');
        this.load.image('cabineTelefonica', './assets/misc/cabineTelefonica.png');
        this.load.image('cabineTelefonicaClose', './assets/misc/cabineTelefonicaClose.png');
        this.load.image('gameoverMemoria', './assets/jogoMemoria/gameoverMemoria.png');
        this.load.image('inicioJogoMemoria', './assets/jogoMemoria/jogoMmInicio.png');
        this.load.image('linkButton', './assets/jogoMemoria/botaoLinkN.png');
        this.load.image('linkButtonHover', './assets/jogoMemoria/botaoLinkHover.png');
        // ------------------------------
        //Us
        this.load.image('uFachada0', './assets/misc/uFachada0.png');
        this.load.image('uFachada1', './assets/misc/uFachada1.png');
        this.load.image('uFachada2', './assets/misc/uFachada2.png');
        this.load.image('uFachada3', './assets/misc/uFachada3.png');
        this.load.image('uFachada4', './assets/misc/uFachada4.png');
        this.load.image('uFachada5', './assets/misc/uFachada5.png');
        this.load.image('uFachada6', './assets/misc/uFachada6.png');
        this.load.image('uFachada7', './assets/misc/uFachada7.png');
        this.load.image('popUp', './assets/misc/popUp.png');
        //-----------------------------------------------------------
        //TELA FINAL
        this.load.image('cenaFinal', './assets/misc/cenaFinal.png');
        this.load.image('cenaFinal2', './assets/misc/cenaFinal2.png');
        this.load.image('botaoFlecha', './assets/misc/botaoFlecha.png');
        this.load.image('botaoFlechaHover', './assets/misc/botaoFlechaHover.png');
        this.load.image('botaoLinkedin', './assets/misc/botaoLinkedin.png');
        // ------------------------------
        //SIMBOLOS
        this.load.image('ppRx', './assets/simbolos/icone.Rexona.png');
        this.load.image('ppClear', './assets/simbolos/icone.Clear.png');
        this.load.image('ppEsc', './assets/simbolos/icone.Escritorio.png');
        this.load.image('ppKibom', './assets/simbolos/icone.Kibom.png');
        this.load.image('ppMT', './assets/simbolos/icone.MaeTerra.png');
        this.load.image('ppOMO', './assets/simbolos/icone.OMU.png');
        this.load.image('ppQuiz', './assets/simbolos/icone.Quiz.png');
        //---------------------------------------
        //VERIFICACAO DE CARREGAMENTO
        this.load.on('complete', () => {
            this.assetsLoaded = true; // Atualiza a variável quando o carregamento terminar
        });
        document.fonts.load('10pt "SaboFilled"').then(function () {
        // Após a fonte estar carregada, inicie o jogo
        });
        this.load.on('complete', () => {
            this.assetsLoaded = true; // Atualiza a variável quando o carregamento terminar
            this.ajustarElementosDOM(); // Chama a função de ajuste após o carregamento
        });

        // Garante que a função de ajuste seja chamada após o carregamento das fontes
        document.fonts.load('10pt "SaboFilled"').then(() => {
            this.ajustarElementosDOM(); // Chamada novamente por segurança, se houver elementos dependentes da fonte
        });
    }

    create() {
    this.scale.on('resize', this.ajustarElementosDOM, this);
    this.ajustarElementosDOM(); // Chama imediatamente para garantir que tudo está ajustado desde o início.
    }

    createControlScreen() {
        const { width, height } = this.sys.game.config;
        const bg = this.add.image(0, 0, 'telaControles');
        bg.setOrigin(0, 0); // Define a origem da imagem para o canto superior esquerdo

        // Escala a imagem para cobrir toda a tela
        bg.displayWidth = width;
        bg.displayHeight = height;

        let playButton = this.add.image(418, 470, 'playButton').setOrigin(0, 0).setInteractive().setVisible(true).setScale(1.5);
        playButton.on('pointerover', () => {
            playButton.setTexture('playButtonHover');
        });

        playButton.on('pointerout', () => {
            playButton.setTexture('playButton');
        });

        playButton.on('pointerdown', () => {
            if (this.assetsLoaded) {
                this.scene.start('cenaEscolhaPersonagem', this.game);
            }
        });
    }

    ajustarElementosDOM() {
        // Exemplo de ajuste de um elemento DOM específico
        const escala = this.scale.scaleFactor.x; // Obtém o fator de escala atual do Phaser
        // Exemplo de ajuste para um elemento DOM específico. Substitua 'meuElementoDom' pelo seu ID real
        const meuElementoDom = document.getElementById('meuElementoDom');
        if (meuElementoDom) {
            meuElementoDom.style.transform = `scale(${escala})`;
            meuElementoDom.style.transformOrigin = 'top left';
            // Ajuste essas propriedades conforme a necessidade de posicionamento
            meuElementoDom.style.left = `${this.scale.canvasBounds.left}px`;
            meuElementoDom.style.top = `${this.scale.canvasBounds.top}px`;
        }
    }
}