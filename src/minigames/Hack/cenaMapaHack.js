export default class cenaMapaHack extends Phaser.Scene {
    constructor(){
        super({key: 'cenaMapaHack'});}

        init(data) {
            this.hud = data.hud;
            this.nomeJogador = data.nomeJogador;
        }

    create(){
        this.scene.resume('HUD');
        let jogoTerminado = this.game.registry.get('jogoTerminado');
        const mapaHack =  this.add.sprite(400, 300, 'mapaHack')
        const botaoExit = this.add.image(150, 450, 'botaoExitPC').setInteractive()

        this.anims.create({
            key: 'mapaMapa',
            frames: this.anims.generateFrameNumbers('mapaHack', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        mapaHack.anims.play('mapaMapa')

        botaoExit.on('pointerover', () => {
            botaoExit.setTexture('botaoExitPCHover');
            });
            botaoExit.on('pointerout', () => {
            botaoExit.setTexture('botaoExitPC');
            });

        botaoExit.on('pointerdown', () => {
        this.game.registry.set('jogoTerminado', true); // Atualiza o estado no registro do Phaser
        // Inicia a cenaEscritorio passando os dados corretamente
        this.scene.start('cenaEscritorio', { x: 450, y: 380, jogoTerminado: true, hud: this.hud, nomeJogador: this.nomeJogador});
        this.scene.get('HUD').show();
        });

    }
}