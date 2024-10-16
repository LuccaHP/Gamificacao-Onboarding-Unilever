//Importa cenas e classes de outros arquivos (Modulos)
import cenaInicial from "./inicio/cenaInicial.js";
import cenaEscritorio from "./scenes/cenaEscritorio.js";
import cenaCidade from "./scenes/cenaCidade.js";
import cenaLavanderia from "./scenes/cenaLavanderia.js";
import cenaHack1 from "./minigames/Hack/cenaHack1.js"
import cenaGameOver from "./minigames/Hack/cenaGameOver.js"
import cenaEscolhaPersonagem from "./inicio/cenaEscolhaPersonagem.js";
import PreloadScene from "./inicio/preload.js";
import cenaKibon from "./scenes/cenaKibon.js";
import cenaClear from "./scenes/cenaClear.js"
import cenaHack2 from "./minigames/Hack/cenaHack2.js";
import cenaMapaHack from "./minigames/Hack/cenaMapaHack.js";
import jogoMemoria from "./minigames/memoria/jogoMemoria.js";
import gameOver from "./minigames/memoria/gameOverMemoria.js";
import inicioJogoMemoria from "./minigames/memoria/telaInicio.js";
import cenaFinal from "./scenes/cenaFinal.js";


//Configuracoes globais do phaser que serao usadas no jogo
const config = {
    type: Phaser.AUTO, //Define automaticamente o Phaser a ser usado
    dom: {
        createContainer: true // Isso habilita o suporte a elementos DOM no Phaser
    },
    pixelArt: true,
    physics: { //Cria fisica
        default: 'arcade', //Fisica 'arcade' do Phaser
        arcade: {
            gravity: { y: 0}, //Gravidade 0
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT, // Ou Phaser.Scale.ENVELOP para garantir que o conteúdo inteiro seja visível
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'yourGameContainer', // O ID do contêiner do seu jogo (opcional, mas recomendado para melhor controle)
        width: 800,
        height: 600
    },

    scene: [cenaInicial, PreloadScene, cenaEscolhaPersonagem, cenaHack1, cenaHack2, cenaGameOver, inicioJogoMemoria, jogoMemoria, gameOver, cenaMapaHack, cenaCidade, cenaEscritorio, cenaLavanderia, cenaKibon, cenaClear, cenaFinal] //Define ordem das cenas

};
let game = new Phaser.Game(config) //Cria jogo a partir das configuracoes definidas