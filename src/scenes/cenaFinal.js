import cenaCidade from "./cenaCidade.js"

export default class cenaFinal extends Phaser.Scene { //Cria cena e define como Cena pelo Phaser
    constructor() {
        super('cenaFinal'); //Da nome a cena
    }

// Dentro de cenaFinal
init(data) {
    this.nomeJogador = data.nomeJogador;
}


    create() {
        
        this.background = this.add.image(400, 300, 'cenaFinal');
        this.scene.stop('HUD');
        this.texto1 = this.add.text(52, 310, `Parabéns, Colaborador(a) ${this.nomeJogador}!`, { fontSize: '25px', fill: '#000', fontFamily: 'SaboFilled', resolution: 10 });
        this.texto2 =this.add.text(52, 350, `Você completou sua incrível jornada de\nrecuperação do "U" da Unilever e finalizou\no onboarding da UniOps.`, { fontSize: '25px', fill: '#000', fontFamily: 'SaboFilled', resolution: 10 });
        this.botaoLinkedin1 = this.add.image(420, 185, 'botaoLinkedin').setInteractive().setScale(0.16).setVisible(false)
        this.botaoLinkedin2 = this.add.image(390, 225, 'botaoLinkedin').setInteractive().setScale(0.16).setVisible(false)
        this.botaoLinkedin3 = this.add.image(605, 270, 'botaoLinkedin').setInteractive().setScale(0.16).setVisible(false)
        this.botaoLinkedin4 = this.add.image(525, 305, 'botaoLinkedin').setInteractive().setScale(0.16).setVisible(false)
        this.botaoLinkedin5 = this.add.image(475, 345, 'botaoLinkedin').setInteractive().setScale(0.16).setVisible(false)
        this.botaoLinkedin6 = this.add.image(470, 385, 'botaoLinkedin').setInteractive().setScale(0.16).setVisible(false)
        this.botaoLinkedin7 = this.add.image(455, 425, 'botaoLinkedin').setInteractive().setScale(0.16).setVisible(false)
        this.botaoFlecha = this.add.image(440, 440, 'botaoFlecha').setOrigin(0, 0).setInteractive().setVisible(true).setScale(1);
        this.botaoFlecha.on('pointerover', () => {
            this.botaoFlecha.setTexture('botaoFlechaHover');
        });

        this.botaoFlecha.on('pointerout', () => {
            this.botaoFlecha.setTexture('botaoFlecha');
        });

        this.botaoFlecha.on('pointerdown', () => {   
                this.background.setTexture('cenaFinal2');
                this.texto1.setVisible(false);
                this.texto2.setVisible(false);
                this.texto2.setVisible(false);
                this.botaoFlecha.setVisible(false);
                this.botaoLinkedin1.setVisible(true)
                this.botaoLinkedin2.setVisible(true)
                this.botaoLinkedin3.setVisible(true)
                this.botaoLinkedin4.setVisible(true)
                this.botaoLinkedin5.setVisible(true)
                this.botaoLinkedin6.setVisible(true)
                this.botaoLinkedin7.setVisible(true)
        });

        this.botaoLinkedin1.on('pointerdown', () => [
            window.open(`https://www.linkedin.com/in/andre-dleizer-cintra-do-prado-7203702b4/`),
            ])
        this.botaoLinkedin2.on('pointerdown', () => [
            window.open(`https://www.linkedin.com/in/andre-lobo-dev/`),
            ])
        this.botaoLinkedin3.on('pointerdown', () => [
            window.open(`https://www.linkedin.com/in/gabriel-nascimento-563382243/`),
            ])
        this.botaoLinkedin4.on('pointerdown', () => [
            window.open(`https://www.linkedin.com/in/laura-rodrigues-277927217/`),
            ])
        this.botaoLinkedin5.on('pointerdown', () => [
            window.open(`https://www.linkedin.com/in/lucca-henrique-pereira-119254258/`),
            ])
        this.botaoLinkedin6.on('pointerdown', () => [
            window.open(`https://www.linkedin.com/in/milena-castro-39a2152b3/`),
            ])
        this.botaoLinkedin7.on('pointerdown', () => [
            window.open(`http://www.linkedin.com/in/ryan-gartlan-82331b2b3`),
            ])

    }

    }

