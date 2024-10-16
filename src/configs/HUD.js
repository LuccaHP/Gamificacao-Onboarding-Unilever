import pedacosU from "./pedacosU.js";

export default class HUD extends Phaser.Scene {
  constructor() {
    super({ key: 'HUD', active: true });
  }

  create() {
    // Código de inicialização aqui
    this.background = this.add.rectangle(10, 10, 330, 100, 0x000000).setOrigin(0).setAlpha(0.65);
    this.bordaTask = this.add.image(185, 68, 'bordaTask');
    this.taskList = this.add.text(20, 16, 'Tasks:',{fontSize: '15px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10,});
    this.pedacosText = this.add.text(20, 80, ``, {fontSize: '15px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10});
    this.updateTasks([]);

    // Inicialmente visível
    this.setVisible(true);
  }

  updateTasks(tasks) {
    // Atualizar a lista de tarefas exibida para o jogador
    this.taskList.setText(['Tarefas:'].concat(tasks));
  }
  updatePedacosText() {
    this.pedacosText.setText(`Pedacos do U coletados: ${pedacosU.getValor()}/7`);
  }

  setVisible(visible) {
    // Altera a visibilidade de todos os elementos da cena
    this.background.visible = visible;
    this.bordaTask.visible = visible;
    this.taskList.visible = visible;
    this.pedacosText.visible = visible;
  }

  //Métodos de esconder e mostrar a HUD
  show() {
    this.setVisible(true);
  }

  hide() {
    this.setVisible(false);
  }
}