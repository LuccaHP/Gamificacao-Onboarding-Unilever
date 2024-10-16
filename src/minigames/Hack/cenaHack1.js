// Cena do jogo onde os blocos serão arrastados para posições específicas
export default class cenaHack1 extends Phaser.Scene {
    constructor(){
        super({key: 'cenaHack1'});
    }

    init(data) {
        this.hud = data.hud; 
        this.nomeJogador = data.nomeJogador;
    }
    // Cria os elementos do jogo
    create (){
        let jogoTerminado = this.game.registry.get('jogoTerminado');
        this.scene.get('HUD').hide();

        if (!this.musicaHack || !this.musicaHack.isPlaying) {
        this.musicaHack = this.sound.add('musicaHack', { volume: 0.1, loop: true })
        this.musicaHack.play()
        }
        this.cameras.main.fadeIn(1000); //fade sempre que a cena for iniciada
        
        // Adiciona a imagem de fundo na cena
        this.add.image(400, 300, 'fundoHack');

        // Cria áreas de destino para os blocos
        this.add.image(512, 192, 'buracoHack').setScale(0.18);
        this.add.image(512, 320, 'buracoHack').setScale(0.18);
        this.add.image(512, 448, 'buracoHack').setScale(0.18);
        //Cria as luzes indicadoras
        this.luzes = [];
        this.luzes.push(this.add.image(670, 190, 'luzVermelha').setScale(0.18));
        this.luzes.push(this.add.image(670, 328, 'luzVermelha').setScale(0.18));
        this.luzes.push(this.add.image(670, 446, 'luzVermelha').setScale(0.18));

        // Cria os blocos que podem ser arrastados
        const block1 = this.add.sprite(100, 192, 'sigla3', 1).setScale(0.18);
        const block2 = this.add.sprite(100, 448, 'sigla2', 1).setScale(0.18);
        const block3 = this.add.sprite(100, 320, 'sigla1', 1).setScale(0.18);
        // Torna os blocos interativos e arrastáveis
        block1.setInteractive({ draggable: true });
        block2.setInteractive({ draggable: true });
        block3.setInteractive({ draggable: true });
        // Variáveis para verificar se os blocos estão sobre as áreas corretas
        let over1 = false;
        let over2 = false;
        let over3 = false;
        // Evento que é acionado durante o arrasto de um bloco
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            // Faz o arrasto do bloco ser 'snap' (encaixado) em uma grade de 64x64
            dragX = Phaser.Math.Snap.To(dragX, 64);
            dragY = Phaser.Math.Snap.To(dragY, 64);
            gameObject.setPosition(dragX, dragY);
        });

        // Evento que é acionado quando o arrasto de um bloco é finalizado
        this.input.on('dragend', (pointer, gameObject) => {
            //Coleta posicao do bloco arrastado
            const x = gameObject.x;
            const y = gameObject.y;

            // Verifica se o bloco está sobre uma área de destino correta e define-o nessa posição
            if (block1.x === 512 && block1.y === 448 && !over1)
            {
                over1 = true;
                gameObject.setFrame(0);
                gameObject.disableInteractive();
                this.luzes[2].setTexture('luzVerde');
            }
            else if (block2.x === 512 && block2.y === 192 && !over2)
            {
                over2 = true;
                gameObject.setFrame(0);
                gameObject.disableInteractive();
                this.luzes[0].setTexture('luzVerde');
            }
            else if (block3.x === 512 && block3.y === 320 && !over3)
            {
                over3 = true;
                gameObject.setFrame(0);
                gameObject.disableInteractive();
                this.luzes[1].setTexture('luzVerde');
            }

            //Caso o bloco nao esteja na area correta inicia cena gameOver
            if(block1.x === 512 && block1.y === 192 || block1.x === 512 && block1.y === 320){
            this.scene.start('cenaGameOver', this.game);
            }
            if(block2.x === 512 && block2.y === 448 || block2.x === 512 && block2.y === 320){
                this.scene.start('cenaGameOver', this.game);
            }
            if(block3.x === 512 && block3.y === 448|| block3.x === 512 && block3.y === 192){
                this.scene.start('cenaGameOver', this.game);
            }
            if(over1 == true && over2 == true && over3 == true){
              // Inicia um temporizador para atrasar o carregamento da próxima cena
        this.time.delayedCall(1000, () => {
            // Carrega a próxima cena após 2 segundos (1000 milissegundos = 1s)
            this.scene.start('cenaHack2', {hud: this.hud, nomeJogador: this.nomeJogador});//Inicia segunda fase do miniGame
        });
    }
});
    }
}