import DialogModalPlugin from "../plugin/dialog_plugin.js";

export default class NPC extends Phaser.GameObjects.Sprite {//Cria classe NPC
    constructor(scene, x, y, texture, frame, config) {//Define atributos para a classe
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.config = config || {};
        this.name = this.config.name || '';
        this.dialog = this.config.dialog || [];
        this.dialogIndex = 0;
        this.dialogoAtivo = false;
        this.originalTexture = texture;
        this.interagido = false;
        this.interactTexture = this.config.interactTexture || texture;
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setSize(16, 15, true)
        //Cria os atributos

        // Inicializa as animações assim que o NPC é criado
        this.initAnimations();

        // Inicie com a animação 'idle' original
        this.play(`${this.originalTexture}_idle`);
    }

    initAnimations() {
        //Cria as animacoes dos NPCs
        if (!this.scene.anims.get(`${this.originalTexture}_idle`)) {
            this.scene.anims.create({
                key: `${this.originalTexture}_idle`,
                frames: this.scene.anims.generateFrameNumbers(this.originalTexture, { start: 0, end: 5 }),
                frameRate: 4.3,
                repeat: -1
            });
        }
        if (!this.scene.anims.get(`${this.interactTexture}_idle`)) {
            this.scene.anims.create({
                key: `${this.interactTexture}_idle`,
                frames: this.scene.anims.generateFrameNumbers(this.interactTexture, { start: 0, end: 11 }),
                frameRate: 4.3,
                repeat: -1
            });
        }
    }

    startDialogue() {
        //Funcao startDialogue aplica logica de dialogo ao NPC
        if (!this.scene.dialogoAtivo) {
            this.scene.dialogModal = new DialogModalPlugin(this.scene);
            this.scene.dialogModal.init({
                cameraConfig: {
                    width: this.scene.cameras.main.width,
                    height: this.scene.cameras.main.height
                }
            });
            //Variaveis de verificacao
            this.scene.dialogoAtivo = true;
            this.dialogIndex = 0;
            this.lastDialogueTime = Date.now(); //Coleta tempo real dentro do jogo
            this.showDialog();
        } else { //Impede o jogador de passar de dialogo em menos de 2500ms = 2.5s
            if (Date.now() - this.lastDialogueTime >= 0) {
                this.dialogIndex++;
                if (this.dialogIndex < this.dialog.length) {
                    this.showDialog();//Funcao de mostrar o dialogo
                    this.lastDialogueTime = Date.now();
                } else {
                    this.endDialogue(); //Funcao de encerrar o dialogo
                }
            }
        }
    }

    showDialog() {//Cria funcao de mostrar o dialogo
        // Exibe o texto do diálogo atual com a imagem
        const { text, imageKey } = this.dialog[this.dialogIndex];//Define index de dialogos
        this.scene.dialogModal.setText(text, true, imageKey);//Define imagem a ser mostrada
    }

    endDialogue() {//Funcao de encerrar dialogo
        if (this.scene.dialogModal) {
            this.scene.dialogModal.destroy();
            this.scene.dialogModal = null;
        }
        this.scene.dialogoAtivo = false;
        this.dialogIndex = 0; // Reset o índice do diálogo para a próxima interação

    }

    texturaInteracao() {

        //Funcao que define textura do NPC quando em proximidade para interacao
        const distancia = Phaser.Math.Distance.Between(this.scene.player.sprite.x, this.scene.player.sprite.y, this.x, this.y);
        if (distancia < 50 && !this.balaoFalaSprite) {
            // Cria e inicia a animação do balão de fala
            this.balaoFalaSprite = this.scene.add.sprite(this.x, this.y - 20, 'balaoFala').play('balaoFalaAnim');
        } else if (distancia >= 50 && this.balaoFalaSprite) {
            // Destruir o balão de fala quando o jogador se afastar
            this.balaoFalaSprite.destroy();
            this.balaoFalaSprite = null;
        }

        if (distancia < 70 && !this.dialogoAtivo) {
            this.play(`${this.interactTexture}_idle`, true);
        } else if (distancia >= 70 && this.anims.currentAnim.key !== `${this.originalTexture}_idle`) {
            this.play(`${this.originalTexture}_idle`, true);
        }
    }
}