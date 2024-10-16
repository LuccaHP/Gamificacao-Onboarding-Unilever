class PedacosU {
  constructor() {
    if (!PedacosU.instance) {
      this.pedacos = 0
      PedacosU.instance = this
      this.popUp = null
      this.scene = null
    }
    return PedacosU.instance
  }

  init(scene, opts = {}) {
    this.scene = scene
    this.padding = opts.padding || 32
    this.windowHeight = opts.windowHeight || 150
    // A remoção da configuração da câmera simplifica o código, 
    // já que vamos calcular o centro com base na viewport da câmera.
  }

  getValor() {
    return this.pedacos
  }

  novoPedaco() {
    this.pedacos++
    this.createPopUp()
  }

  createPopUp() {
    const centerX = this.scene.cameras.main.centerX;
    const centerY = this.scene.cameras.main.centerY;
  
    // Criação do pop-up
    this.popUp = this.scene.add.image(centerX, centerY, 'popUp')
      .setVisible(true)
      .setScale(0.5)
      .setScrollFactor(0);

    const textOffsetY = 50; // Ajuste conforme necessário para alinhamento
    this.popUpText = this.scene.add.text(centerX, centerY + textOffsetY, `Pedaços coletados: ${this.getValor()}`, {
      fontSize: '10px',
      fill: '#FFF',
      fontFamily: 'SaboFilled',
      resolution: 10
    })
    .setVisible(true)
    .setScale(0.5)
    .setOrigin(0.5, 0.5)
    .setScrollFactor(0);
  this.popUpHide();
  }
  

  popUpHide() {
    if (this.popUp) {
      this.scene.time.delayedCall(2000, () => {
        this.popUp.setVisible(false)
        this.popUpText.setVisible(false)
      }, [], this)
    }
  }
}

// Uso
const instancia = new PedacosU()
// `scene` deveria ser uma referência válida para a cena atual do Phaser.
// Exemplo: instancia.init(this) dentro de uma cena do Phaser

export default instancia
