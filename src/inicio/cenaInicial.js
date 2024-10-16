
export default class cenaInicial extends Phaser.Scene {
    constructor() {
        super({
            key: 'cenaInicial',
        });
    }

    preload() {//Carrega os assets iniciais
        this.load.image('playButton', './assets/misc/playbt.png');
        this.load.image('playButtonHover', './assets/misc/playbtHover.png');
        this.load.image('bg', './assets/misc/telaInicio.png')
        this.load.image('telaControles', './assets/misc/telaControles.png');

    }

    create() {
        const { width, height } = this.sys.game.config;
        const bg = this.add.image(0, 0, 'bg');
        bg.setOrigin(0, 0); // Define a origem da imagem para o canto superior esquerdo

        // Escala a imagem para cobrir toda a tela
        bg.displayWidth = width;
        bg.displayHeight = height;

            let playButton = this.add.image(this.game.config.width / 2 - 80, this.game.config.height / 4 * 3 - 60, 'playButton').setOrigin(0, 0).setInteractive().setVisible(true).setScale(1.3);

            // Quando o ponteiro passa por cima do botão, muda para a textura de hover
            playButton.on('pointerover', () => {
                playButton.setTexture('playButtonHover');
            });

            // Quando o ponteiro sai de cima do botão, volta para a textura original
            playButton.on('pointerout', () => {
                playButton.setTexture('playButton');
            });

            // Adiciona funcionalidade de clique ao botão
            playButton.on('pointerdown', () => {

                //Começa o jogo com a escolha do personagem
                this.scene.start('PreloadScene', this.game);
            }, this);
        }

    update () {
    }
}
