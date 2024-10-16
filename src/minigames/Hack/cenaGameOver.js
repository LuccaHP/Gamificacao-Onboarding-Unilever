export default class cenaHack extends Phaser.Scene {
    constructor(){
        super({key: 'cenaGameOver'});}

        init(data) {
            this.hud = data.hud;
            this.nomeJogador = data.nomeJogador
        }
    create(){
    this.add.image(400, 300, 'fundoGameOver');

    let restartButton = this.add.image(400, 500, 'botaoRestart').setScale(0.5).setInteractive().setVisible(true);

            // Quando o ponteiro passa por cima do botão, muda para a textura de hover
            restartButton.on('pointerover', () => {
                restartButton.setTexture('botaoRestartHover');
            });

            // Quando o ponteiro sai de cima do botão, volta para a textura original
            restartButton.on('pointerout', () => {
                restartButton.setTexture('botaoRestart');
            });

            // Adiciona funcionalidade de clique ao botão
            restartButton.on('pointerdown', () => {

                //Recomeca o miniGame
                this.scene.start('cenaHack1', {hud: this.hud, nomeJogador: this.nomeJogador});
            }, this);

    }
    }