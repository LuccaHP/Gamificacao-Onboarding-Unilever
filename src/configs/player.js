//Cria e exporta classe chamada "Player"
export default class Player {
    constructor(scene, x, y, playerKey) { //Define estrutura de construcao para essa classe
        this.scene = scene;
        this.playerKey = playerKey; //Define variavel playerKey
        this.sprite = scene.physics.add.sprite(x, y, playerKey); //Estrutura de criacao da sprite
        this.speed = 110; //Define velocidade padrao
        this.create(); //Cria funcao "create"
        this.registerSceneEvents()
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setSize(16, 15, true)
        this.sprite.setOffset(0, 17)
    }

    create() {
        this.somDePassos = this.scene.sound.add('somDePassos', { volume: 0.5, loop: false });
        //-------------------------------------------------INICIO
        //Cria animacoes de movimentacao e Idle:
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(this.playerKey, { start: 60, end: 65 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers(this.playerKey, { start: 48, end: 53 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'up',
            frames: this.scene.anims.generateFrameNumbers(this.playerKey, { start: 54, end: 59 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers(this.playerKey, { start: 66, end: 71 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'idlefront',
            frames: this.scene.anims.generateFrameNumbers(this.playerKey, { start: 42, end: 47 }),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'idleback',
            frames: this.scene.anims.generateFrameNumbers(this.playerKey, { start: 30, end: 35 }),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'idleright',
            frames: this.scene.anims.generateFrameNumbers(this.playerKey, { start: 24, end: 29 }),
            frameRate: 6,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'idleleft',
            frames: this.scene.anims.generateFrameNumbers(this.playerKey, { start: 36, end: 41 }),
            frameRate: 6,
            repeat: -1
        });
        //----------------------------------------------------FIM

    }
        tocarSomDePassos() { //Funcao para logica de som de passos do player
        // Verifica se o som de passos já está tocando, se não, toca o som
        if (!this.somDePassos.isPlaying) {
            this.somDePassos.play();
        }
    }
        pararSomDePassos() {
        if (this.somDePassos.isPlaying) {
            this.somDePassos.stop();
        }
    }
        registerSceneEvents() {
        this.scene.events.on('shutdown', this.pararSomDePassos, this)
        this.scene.events.on('destroy', this.pararSomDePassos, this)
    }

    update() {
        //Define controles de movimento para o personagem
        const { left, right, up, down } = this.scene.cursors;
        this.scene.isMoving = false; //Cria variavel para verificar se o personagem esta se movendo
        //Movimentacao do personagem a partir dos controles definidos
        if (left.isDown) { //O que acontece quando o controle 'left' for apertado
            this.sprite.setVelocityX(-this.speed); //Velocidade do personagem é mudada para a velocidade definida como padrao para a esquerda
            this.sprite.anims.play('left', true); //Animacao comeca
            this.scene.isMoving = true; //Verifica que o personagem esta se movendo
            this.lastMovement = 'left'; //Verifica qual foi a ultima direcao que o personagem se moveu
            this.tocarSomDePassos();
            //Estrutura de movimentacao para as outras direcoes...
        } else if (right.isDown) {
            this.sprite.setVelocityX(this.speed);
            this.sprite.anims.play('right', true);
            this.scene.isMoving = true;
            this.lastMovement = 'right';
            this.tocarSomDePassos();
        } else {
            this.sprite.setVelocityX(0); //Se o personagem nao estiver se movendo velocidade = 0
        }

        if (up.isDown) {
            this.sprite.setVelocityY(-this.speed);
            if (!this.scene.isMoving) {
                this.sprite.anims.play('up', true);
                this.lastMovement = 'up'
                this.tocarSomDePassos();
            }
            this.scene.isMoving = true;
        } else if (down.isDown) {
            this.sprite.setVelocityY(this.speed);
            if (!this.scene.isMoving) {
                this.sprite.anims.play('down', true);
                this.lastMovement = 'down'
                this.tocarSomDePassos();
            }
            this.scene.isMoving = true;
        } else {
            this.sprite.setVelocityY(0);
        }
        if (!this.scene.isMoving && this.lastMovement === 'down') { //Comeca animacao Idle
            this.sprite.anims.play('idlefront', true)
        }
        if (!this.scene.isMoving && this.lastMovement === 'up') {
            this.sprite.anims.play('idleback', true)
        }
        if (!this.scene.isMoving && this.lastMovement === 'right') {
            this.sprite.anims.play('idleright', true)
        }
        if (!this.scene.isMoving && this.lastMovement === 'left') {
            this.sprite.anims.play('idleleft', true)
        }
        if (!this.scene.isMoving) {
        this.pararSomDePassos()
        if (this.lastMovement === 'down') {
        this.sprite.anims.play('idlefront', true)
            } else if (this.lastMovement === 'up') {
        this.sprite.anims.play('idleback', true)
            } else if (this.lastMovement === 'right') {
        this.sprite.anims.play('idleright', true)
            } else if (this.lastMovement === 'left') {
        this.sprite.anims.play('idleleft', true)
            }
        }
    }
}
