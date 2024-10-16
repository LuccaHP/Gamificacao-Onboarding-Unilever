
export default class inicioJogoMemoria extends Phaser.Scene {
    constructor() {
        super({
            key: 'inicioJogoMemoria',
        });
    }


    create() {
        this.scene.get('HUD').hide();

        this.add.image(400, 300, 'inicioJogoMemoria')

            let playButton = this.add.image(550, 470, 'playButton').setOrigin(0, 0).setInteractive().setVisible(true).setScale(1.3);

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
                this.scene.start('jogoMemoria', this.game);
            }, this);

            const linkButton = this.add.image(70, 470, 'linkButton').setOrigin(0, 0).setInteractive().setVisible(true).setScale(1.3);

            // Quando o ponteiro passa por cima do botão, muda para a textura de hover
            linkButton.on('pointerover', () => {
                linkButton.setTexture('linkButtonHover');
            });

            // Quando o ponteiro sai de cima do botão, volta para a textura original
            linkButton.on('pointerout', () => {
                linkButton.setTexture('linkButton');
            });

            // Adiciona funcionalidade de clique ao botão
            linkButton.on('pointerdown', () => {
                window.open(`https://degreed.com/pathway/w9d4oxqm8j/pathway?newWindow=true`);
            }, this);
        }

}
