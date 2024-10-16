export default class DialogModalPlugin {
  constructor(scene) {
    this.scene = scene;
    this.systems = scene.sys;
    if (!scene.sys.settings.isBooted) {
      scene.sys.events.once('boot', this.boot, this);
    }
  }

  static register(PluginManager) {
    PluginManager.register('DialogModalPlugin', DialogModalPlugin, 'dialogModal');
  }

  boot() {
    var eventEmitter = this.systems.events;
    eventEmitter.on('shutdown', this.shutdown, this);
    eventEmitter.on('destroy', this.destroy, this);
  }

  shutdown() {}

  destroy() {
    this.shutdown();
    this.scene = undefined;
    if (this.timedEvent) this.timedEvent.remove();
    if (this.text) this.text.destroy();
    if (this.graphics) this.graphics.destroy();
    if (this.closeBtn) this.closeBtn.destroy();
    if (this.dialogImage) this.dialogImage.destroy();
  }

  init(opts) {
    if (!opts) opts = {};
    this.borderThickness = opts.borderThickness || 3;
    this.borderColor = opts.borderColor || 0x597bff;
    this.borderAlpha = opts.borderAlpha || 1;
    this.windowAlpha = opts.windowAlpha || 0.8;
    this.windowColor = opts.windowColor || 0x04001a;
    this.windowHeight = opts.windowHeight || 150;
    this.padding = opts.padding || 32;
    this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod';
    this.dialogSpeed = opts.dialogSpeed || 30;
    this.eventCounter = 0;
    this.visible = true;
    this.text;
    this.dialog;
    this.graphics;
    this.closeBtn;
    if (opts.cameraConfig) {
      this.cameraWidth = opts.cameraConfig.width;
      this.cameraHeight = opts.cameraConfig.height;
    }
    if (opts.imageKey) {
      // A posição e tamanho da imagem devem ser ajustados conforme necessário
      this.dialogImage = this.scene.add.image(150, 150, opts.imageKey).setOrigin(0, 0);
      this.dialogImage.setVisible(false); // Inicialmente escondida
  }
    this._createWindow();
  }

  _getGameWidth() {
    return this.cameraWidth || this.scene.cameras.main.width;
  }

  _getGameHeight() {
    return this.cameraHeight || this.scene.cameras.main.height;
  }

  _calculateWindowDimensions(width, height) {
    var x = this.padding;
    var y = height - (this.windowHeight / this.scene.cameras.main.zoom) - this.padding - 90;
    var rectWidth = width - (this.padding * 2) - 150;
    var rectHeight = this.windowHeight;
    return {
      x,
      y,
      rectWidth,
      rectHeight
    };
  }

  _createWindow() {
    this.gameHeight = this._getGameHeight();
    this.gameWidth = this._getGameWidth();
    this.dimensions = this._calculateWindowDimensions(this.gameWidth, this.gameHeight);

    // Leva em consideração a posição e o zoom da câmera
    this.cameraPosition = this.scene.cameras.main.getWorldPoint(this.dimensions.x, this.dimensions.y);
    this.cameraRectWidth = this.dimensions.rectWidth / this.scene.cameras.main.zoom;
    this.cameraRectHeight = this.dimensions.rectHeight / this.scene.cameras.main.zoom;

    this.graphics = this.scene.add.graphics();
    this._createOuterWindow(this.cameraPosition.x, this.cameraPosition.y, this.cameraRectWidth, this.cameraRectHeight);
    this._createInnerWindow(this.cameraPosition.x, this.cameraPosition.y, this.cameraRectWidth, this.cameraRectHeight);
    this._createCloseModalButton();

    if (this.dialogImage) {
        // Posiciona a imagem imediatamente à direita da caixa de diálogo
        const imageX = cameraPosition.x + cameraRectWidth; // Não há espaçamento adicional
        const imageY = cameraPosition.y; // Alinha a parte superior da imagem com a parte superior da caixa de diálogo

        // Aplica o posicionamento
        this.dialogImage.setPosition(imageX, imageY);
        this.dialogImage.setVisible(this.isWindowVisible);
    }
}


  _createInnerWindow(x, y, rectWidth, rectHeight) {
    this.graphics.fillStyle(this.windowColor, this.windowAlpha);
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
  }

  _createOuterWindow(x, y, rectWidth, rectHeight) {
    this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
    this.graphics.strokeRect(x, y, rectWidth, rectHeight);
  }

  _createCloseModalButton() {
    // Ajusta a posição X para alinhar com a borda direita da janela, menos o padding e a largura do botão
    var btnX = this.cameraPosition.x + this.cameraRectWidth - this.padding + 10;
    // Ajusta a posição Y para alinhar com o topo da janela, adicionando um pequeno offset se necessário
    var btnY = this.cameraPosition.y + 45;

    this.closeBtn = this.scene.make.text({
      x: btnX,
      y: btnY,
      text: 'E ->',
      style: {
        font: 'Fantasy',
        resolution: 4.2,
        fill:'#3a68e3'
      }
    });
  }


  toggleWindow() {
    this.visible = !this.visible;

    // Atualiza a visibilidade de todos os componentes
    if (this.text) this.text.setVisible(this.visible);
    if (this.graphics) this.graphics.setVisible(this.visible);
    if (this.closeBtn) this.closeBtn.setVisible(this.visible);

    // Garante que a imagem segue a visibilidade do diálogo
    if (this.dialogImage) {
        this.dialogImage.setVisible(this.visible);
    }
}



  setText(text, animate, imageKey) {
    if (typeof text === 'undefined') {
        console.error('Tentativa de definir texto indefinido no diálogo.');
        return; // Sai do método para evitar mais erros
    }
    this.eventCounter = 0;
    this.dialog = text.split('');
    if (this.timedEvent) this.timedEvent.remove();
    var tempText = animate ? '' : text;
    this._setText(tempText);
    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - (this.dialogSpeed * 3.5),
        callback: this._animateText,
        callbackScope: this,
        loop: true
      });
    }

    // Manipulação da imagem
    // Manipulação da imagem dentro de setText
    if (imageKey) {
      if (!this.dialogImage) {
          this.dialogImage = this.scene.add.image(0, 0, imageKey).setOrigin(0, 0);
      } else {
          this.dialogImage.setTexture(imageKey);
      }

      // Certifica-se de que `this.cameraPosition` e `this.cameraRectWidth` foram definidos
      if (this.cameraPosition && this.cameraRectWidth !== undefined) {
          const imageX = this.cameraPosition.x + this.cameraRectWidth + 5;
          const imageY = this.cameraPosition.y;

          this.dialogImage.setPosition(imageX, imageY);
      }

      this.dialogImage.setVisible(this.visible);
      this.dialogImage.setDepth(100);
  }
}


  _setText(text) {
    if (this.text) this.text.destroy();

    var x = this.padding + 10;
    var y = this._getGameHeight() - (this.windowHeight / this.scene.cameras.main.zoom) - this.padding - 90 + 10;

    // Leva em consideração a posição e o zoom da câmera
    var cameraPosition = this.scene.cameras.main.getWorldPoint(x, y);

    this.text = this.scene.make.text({
        x: cameraPosition.x,
        y: cameraPosition.y,
        text,
        style: {
          wordWrap: { width: this._getGameWidth() - (this.padding * 2) - 25 },
          fontSize: '12px',  // Ajuste o tamanho da fonte conforme necessário
          fontFamily: 'SaboFilled',
          resolution: 4.2
        }
    });

}

  _animateText() {
    this.eventCounter++;
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
    if (this.eventCounter === this.dialog.length) {
      this.timedEvent.remove();
    }
  }
}