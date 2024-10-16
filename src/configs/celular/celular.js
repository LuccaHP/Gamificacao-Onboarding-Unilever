import pedacosU from "../pedacosU.js";
export default class celular extends Phaser.Scene {
    constructor() {
      super({ key: 'celular', active: true })
    }

    init(data) {
      this.playerX = data.x;
      this.playerY = data.y;
    }

    // Método para atualizar o texto de pontuação final
    updateFinalScoreText() {
      if (this.finalScoreText) {
        this.finalScoreText.setText(` Questões \nacertadas: ${this.score}`)
      }
      if (this.score === 3){
        this.sound.play('quizConcluido');
      }
    }
    create() {

        // Importando valor do módulo pedacosU
        const pedacosColetados = pedacosU.getValor();
        // Dentro da cena 'celular', para acessar o nome do jogador
// Dentro da cena 'celular', para acessar o nome do jogador
        let nomeJogador = this.registry.get('nomeJogador');

        this.score = 0
        this.celular = this.add.image(400, 300, 'celular').setScale(0.9)
        this.appGps = this.add.image(320, 149, 'appGps').setScale(0.9).setInteractive().setVisible(true)
        this.appUrl = this.add.image(373, 149, 'appUrl').setScale(0.9).setInteractive().setVisible(true)
        this.botaoQuiz = this.add.image(425, 149, 'botaoQuiz').setScale(0.85).setInteractive().setVisible(true)
        this.botaoHome = this.add.image(585, 339, 'botaoHome').setScale(0.9).setVisible(false).setInteractive()
        this.botaoNext = this.add.image(585, 263, 'botaoNext').setScale(0.9).setVisible(false).setInteractive()
        this.botaoBack = this.add.image(585, 263, 'botaoBack').setScale(0.9).setVisible(false).setInteractive()
        this.botaoUrls1 = this.add.image(320, 140, 'botaoUrls').setScale(0.9).setVisible(false).setInteractive()
        this.botaoUrls2 = this.add.image(320, 192, 'botaoUrls').setScale(0.9).setVisible(false).setInteractive()
        this.botaoUrls3 = this.add.image(320, 245, 'botaoUrls').setScale(0.9).setVisible(false).setInteractive()
        this.botaoCtrl = this.add.image(476, 148.5, 'botaoCtrl').setScale(0.9).setVisible(true).setInteractive()
      //Tela de início do quiz_____________________________________________________________________________________________________________________________________________________________________
      this.playButton = this.add.image(400, 300, 'playButton').setVisible(false).setInteractive();
      //Pergunta 1 ________________________________________________________________________________________________________________________________________________________________________________
        this.caixaResposta1 = this.add.image(245, 290, 'caixaResposta').setVisible(false).setInteractive()
        this.caixaResposta2 = this.add.image(550, 290, 'caixaResposta').setVisible(false).setInteractive()
        this.caixaResposta3 = this.add.image(245, 400, 'caixaResposta').setVisible(false).setInteractive()
        this.caixaResposta4 = this.add.image(550, 400, 'caixaResposta').setVisible(false).setInteractive()
        this.caixaPergunta = this.add.image(400, 190, 'caixaPergunta').setVisible(false)
        this.pergunta1 = this.add.text(120, 160, 'Qual é o compromisso ambiental\nda Unilever para 2030?', { fontSize: '25px', fill: '#4169E1', fontFamily: 'SaboFilled', resolution: 10, }).setVisible(false).setDepth(2)
        this.resposta1P1 = this.add.text(120, 250, 'Reduzir em 50% o\nuso de plástico\nvirgem.', { fontSize: '20px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10}).setVisible(false)
        this.resposta2P1 = this.add.text(430, 250, 'Tornar-se carbono\nneutro.', { fontSize: '20px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10}).setVisible(false)
        this.resposta3P1 = this.add.text(120, 360, 'Plantar um milhão\nde árvores.', { fontSize: '20px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10 }).setVisible(false)
        this.resposta4P1 = this.add.text(430, 360, 'Produzir 100% de\nenergia renovável em\ntodas as fábricas.', { fontSize: '18px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10 }).setVisible(false)
      //________________________________________________________________________________________________________________________________________________________________________________
      //Pergunta 2 _____________________________________________________________________________________________________________________________________________________________________
        this.caixaResposta5 = this.add.image(245, 290, 'caixaResposta').setVisible(false).setInteractive()
        this.caixaResposta6 = this.add.image(550, 290, 'caixaResposta').setVisible(false).setInteractive()
        this.caixaResposta7 = this.add.image(245, 400, 'caixaResposta').setVisible(false).setInteractive()
        this.caixaResposta8 = this.add.image(550, 400, 'caixaResposta').setVisible(false).setInteractive()
        this.caixaPergunta = this.add.image(400, 190, 'caixaPergunta').setVisible(false).setScale(1)
        this.pergunta2 = this.add.text(120, 160, 'Em qual ano a Unilever foi\nfundada?', { fontSize: '25px', fill: '#4169E1', fontFamily: 'SaboFilled', resolution: 10, }).setVisible(false).setDepth(2)
        this.resposta1P2 = this.add.text(120, 250, '1947', { fontSize: '20px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10}).setVisible(false)
        this.resposta2P2 = this.add.text(430, 250, '1929', { fontSize: '20px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10}).setVisible(false)
        this.resposta3P2 = this.add.text(120, 360, '1960', { fontSize: '20px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10 }).setVisible(false)
        this.resposta4P2 = this.add.text(430, 360, '1900', { fontSize: '20px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10 }).setVisible(false)
      //________________________________________________________________________________________________________________________________________________________________________________
      //Pergunta 3 _____________________________________________________________________________________________________________________________________________________________________
        this.caixaResposta9 = this.add.image(245, 290, 'caixaResposta').setVisible(false).setInteractive()
        this.caixaResposta10 = this.add.image(550, 290, 'caixaResposta').setVisible(false).setInteractive()
        this.caixaResposta11 = this.add.image(245, 400, 'caixaResposta').setVisible(false).setInteractive()
        this.caixaResposta12= this.add.image(550, 400, 'caixaResposta').setVisible(false).setInteractive()
        this.caixaPergunta = this.add.image(400, 190, 'caixaPergunta').setVisible(false).setScale(1)
        this.restartButton = this.add.image(400, 300, 'botaoRestart').setScale(0.7).setInteractive().setVisible(false);
        this.pergunta3 = this.add.text(120, 160, 'Qual é o lema da Unilever?', { fontSize: '25px', fill: '#4169E1', fontFamily: 'SaboFilled', resolution: 10}).setVisible(false).setDepth(2)
        this.resposta1P3 = this.add.text(120, 250, '"Fazendo a\ndiferença"', { fontSize: '20px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10}).setVisible(false)
        this.resposta2P3 = this.add.text(430, 250, '"Melhorando a vida,\ntodos os dias"', { fontSize: '20px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10}).setVisible(false)
        this.resposta3P3 = this.add.text(120, 360, '"Inovação sem\nlimites"', { fontSize: '20px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10 }).setVisible(false)
        this.resposta4P3 = this.add.text(430, 360, '"Conectando\npessoas"', { fontSize: '20px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10 }).setVisible(false)
      //________________________________________________________________________________________________________________________________________________________________________________
      //Sons _____________________________________________________________________________________________________________________________________________________________________
        this.erro = this.sound.add('erro', { volume: 0.3, loop: false });
        this.acerto = this.sound.add('acerto', { volume: 0.3, loop: false });
        this.quizConcluido = this.sound.add('quizConcluido', { volume: 0.3, loop: false });
      //________________________________________________________________________________________________________________________________________________________________________________
      //Resultado Final _____________________________________________________________________________________________________________________________________________________________________
        this.finalScoreText = this.add.text(400, 300, `Questões acertadas: ${this.score}`, {fontSize: '40px', fill: '#4169E1', fontFamily: 'SaboFilled', resolution: 10}).setOrigin(0.5).setVisible(false)
      //________________________________________________________________________________________________________________________________________________________________________________
        // Adicionar efeito de hover para as caixas de texto
        const caixasResposta = [this.caixaResposta1, this.caixaResposta2,
          this.caixaResposta3,
          this.caixaResposta4,
          this.caixaResposta5,
          this.caixaResposta6,
          this.caixaResposta7,
          this.caixaResposta8,
          this.caixaResposta9,
          this.caixaResposta10,
          this.caixaResposta11,
          this.caixaResposta12].forEach(caixa => {
            caixa.setInteractive(); // Definir como interativo
            caixa.on('pointerout', () => {
                caixa.setTexture('caixaResposta').setScale(1); // Trocar de volta para a imagem normal
            });
        });
       // Definição de ações para eventos de clique em diferentes elementos
      this.appGps.on('pointerdown', () => [
            this.celular.setTexture('celularGps'),
            this.appGps.setVisible(false),
            this.botaoHome.setVisible(true).setPosition(585, 339),
            this.botaoNext.setVisible(true),
            this.botaoBack.setVisible(false),
            this.appUrl.setVisible(false),
            this.botaoQuiz.setVisible(false),
            this.botaoCtrl.setVisible(false),
            this.caixaResposta1.setVisible(false),
            this.caixaResposta2.setVisible(false),
        ]);
        this.appUrl.on('pointerdown', () => [
            this.celular.setTexture('celularUrls'),
            this.appGps.setVisible(false),
            this.botaoHome.setVisible(true).setPosition(320, 300),
            this.botaoNext.setVisible(false),
            this.botaoBack.setVisible(false),
            this.appUrl.setVisible(false),
            this.botaoUrls1.setVisible(true),
            this.botaoUrls2.setVisible(true),
            this.botaoUrls3.setVisible(true),
            this.botaoQuiz.setVisible(false),
            this.botaoCtrl.setVisible(false),
            this.caixaResposta1.setVisible(false),
            this.caixaResposta2.setVisible(false)
        ]);
        this.botaoHome.on('pointerdown', () => [
            this.celular.setTexture('celular').setScale(0.9),
            this.appGps.setVisible(true),
            this.botaoNext.setVisible(false),
            this.botaoHome.setVisible(false),
            this.botaoBack.setVisible(false),
            this.appUrl.setVisible(true),
            this.botaoUrls1.setVisible(false),
            this.botaoUrls2.setVisible(false),
            this.botaoUrls3.setVisible(false),
            this.botaoQuiz.setVisible(true),
            this.caixaResposta1.setVisible(false),
            this.caixaResposta2.setVisible(false),
            this.botaoCtrl.setVisible(true)
        ])
        this.botaoNext.on('pointerdown', () => [
            this.celular.setTexture('celularGps2'),
            this.appGps.setVisible(false),
            this.botaoHome.setVisible(true),
            this.botaoNext.setVisible(false),
            this.botaoBack.setVisible(true),
            this.botaoQuiz.setVisible(false),
            this.caixaResposta1.setVisible(false),
            this.caixaResposta2.setVisible(false),
        ])
        this.botaoBack.on('pointerdown', () => [
            this.celular.setTexture('celularGps'),
            this.appGps.setVisible(false),
            this.botaoHome.setVisible(true),
            this.botaoNext.setVisible(true),
            this.botaoBack.setVisible(false),
            this.botaoQuiz.setVisible(false),
            this.caixaResposta1.setVisible(false),
            this.caixaResposta1.setVisible(false),
            this.caixaResposta2.setVisible(false)
        ])
        this.botaoCtrl.on('pointerdown', () => [
            this.celular.setTexture('celularCtrl'),
            this.appGps.setVisible(false),
            this.botaoHome.setVisible(true).setPosition(350, 400),
            this.botaoNext.setVisible(false),
            this.botaoBack.setVisible(false),
            this.botaoQuiz.setVisible(false),
            this.botaoCtrl.setVisible(false),
            this.caixaResposta1.setVisible(false),
            this.caixaResposta1.setVisible(false),
            this.appUrl.setVisible(false),
            this.caixaResposta2.setVisible(false)
        ])
        if(pedacosColetados === 7){
        this.restartButton.on('pointerdown', () => {
          this.celular.setTexture('celularQuiz').setScale(1),
          this.playButton.setVisible(false),
          this.caixaPergunta.setVisible(true),
          this.caixaResposta1.setVisible(true),
          this.caixaResposta2.setVisible(true),
          this.caixaResposta3.setVisible(true),
          this.caixaResposta4.setVisible(true),
          this.pergunta1.setVisible(true)
          this.resposta1P1.setVisible(true),
          this.resposta2P1.setVisible(true),
          this.resposta3P1.setVisible(true),
          this.resposta4P1.setVisible(true)
          this.restartButton.setVisible(false)
          this.score = 0
        });
        this.restartButton.on('pointerover', () => {
          this.restartButton.setTexture('botaoRestartHover');
      });
      // Quando o ponteiro sai de cima do botão, volta para a textura original
      this.restartButton.on('pointerout', () => {
          this.restartButton.setTexture('botaoRestart');
      });
          this.botaoQuiz.off('pointerdown').on('pointerdown', () => {
            this.celular.setTexture('celularQuizInicio'),
            this.appGps.setVisible(false),
            this.botaoNext.setVisible(false),
            this.botaoHome.setVisible(false),
            this.botaoBack.setVisible(false),
            this.appUrl.setVisible(false),
            this.botaoUrls1.setVisible(false),
            this.botaoUrls2.setVisible(false),
            this.botaoUrls3.setVisible(false),
            this.botaoQuiz.setVisible(false)
            this.playButton.setVisible(true),
            this.botaoCtrl.setVisible(false)
          });
      this.playButton.on('pointerover', () => {
          this.playButton.setTexture('playButtonHover');
      });
      // Quando o ponteiro sai de cima do botão, volta para a textura original
      this.playButton.on('pointerout', () => {
        this.playButton.setTexture('playButton');
      });
      // Adiciona funcionalidade de clique ao botão
      this.playButton.on('pointerdown', () => {
            this.celular.setTexture('celularQuiz').setScale(1),
            this.playButton.setVisible(false),
            this.caixaPergunta.setVisible(true),
            this.caixaResposta1.setVisible(true),
            this.caixaResposta2.setVisible(true),
            this.caixaResposta3.setVisible(true),
            this.caixaResposta4.setVisible(true),
            this.pergunta1.setVisible(true)
            this.resposta1P1.setVisible(true),
            this.resposta2P1.setVisible(true),
            this.resposta3P1.setVisible(true),
            this.resposta4P1.setVisible(true)
          });
        const pergunta2Correta1 = () => {
          this.score += 1;
          console.log(this.score);
          // Mudar a textura da caixa de resposta para correta
          this.caixaResposta1.setTexture('caixaVerde');
          this.sound.play('acerto');
          // Exibir a próxima pergunta
          this.time.delayedCall(1000, () => {
            this.caixaPergunta.setVisible(true),
            this.caixaResposta1.setVisible(false),
            this.caixaResposta2.setVisible(false),
            this.caixaResposta3.setVisible(false),
            this.caixaResposta4.setVisible(false),
            this.pergunta1.setVisible(false),
            this.resposta1P1.setVisible(false),
            this.resposta2P1.setVisible(false),
            this.resposta3P1.setVisible(false),
            this.resposta4P1.setVisible(false)
            this.caixaResposta5.setVisible(true),
            this.caixaResposta6.setVisible(true),
            this.caixaResposta7.setVisible(true),
            this.caixaResposta8.setVisible(true),
            this.pergunta2.setVisible(true),
            this.resposta1P2.setVisible(true),
            this.resposta2P2.setVisible(true),
            this.resposta3P2.setVisible(true),
            this.resposta4P2.setVisible(true),
            this.updateFinalScoreText()
          });
        };
          const pergunta2 = () => {
          // Mudar a textura da caixa de resposta para incorreta
          if (this.caixaResposta2.isClicked) {
            this.caixaResposta2.setTexture('caixaVermelha');
            this.sound.play('erro');
        }
          if (this.caixaResposta3.isClicked) {
            this.caixaResposta3.setTexture('caixaVermelha');
            this.sound.play('erro');
        }
          if (this.caixaResposta4.isClicked) {
            this.caixaResposta4.setTexture('caixaVermelha');
            this.sound.play('erro');
        }
          console.log(this.score)
          this.time.delayedCall(1000, () => {
            this.caixaPergunta.setVisible(true),
            this.caixaResposta1.setVisible(false),
            this.caixaResposta2.setVisible(false),
            this.caixaResposta3.setVisible(false),
            this.caixaResposta4.setVisible(false),
            this.pergunta1.setVisible(false),
            this.resposta1P1.setVisible(false),
            this.resposta2P1.setVisible(false),
            this.resposta3P1.setVisible(false),
            this.resposta4P1.setVisible(false),
            this.caixaResposta5.setVisible(true),
            this.caixaResposta6.setVisible(true),
            this.caixaResposta7.setVisible(true),
            this.caixaResposta8.setVisible(true),
            this.pergunta2.setVisible(true),
            this.resposta1P2.setVisible(true),
            this.resposta2P2.setVisible(true),
            this.resposta3P2.setVisible(true),
            this.resposta4P2.setVisible(true)
          });
        };
        // define qual é a resposta correta
        this.caixaResposta1.on('pointerdown', pergunta2Correta1);
        this.caixaResposta2.on('pointerdown', pergunta2);
        this.caixaResposta3.on('pointerdown', pergunta2);
        this.caixaResposta4.on('pointerdown', pergunta2);
        this.caixaResposta2.on('pointerdown', () => {
          this.caixaResposta2.isClicked = true;
          pergunta2();
        });
        this.caixaResposta3.on('pointerdown', () => {
          this.caixaResposta3.isClicked = true;
          pergunta2();
        });
        this.caixaResposta4.on('pointerdown', () => {
          this.caixaResposta4.isClicked = true;
          pergunta2();
        });
        // Mudar a textura da caixa de resposta para incorreta
        const pergunta3 = () => {
          console.log(this.score)
          if (this.caixaResposta5.isClicked) {
            this.caixaResposta5.setTexture('caixaVermelha');
            this.sound.play('erro');
        }
          if (this.caixaResposta7.isClicked) {
            this.caixaResposta7.setTexture('caixaVermelha');
            this.sound.play('erro');
        }
          if (this.caixaResposta8.isClicked) {
            this.caixaResposta8.setTexture('caixaVermelha');
            this.sound.play('erro');
        }
          this.time.delayedCall(1000, () => {
          this.caixaPergunta.setVisible(true),
          this.caixaResposta5.setVisible(false),
          this.caixaResposta6.setVisible(false),
          this.caixaResposta7.setVisible(false),
          this.caixaResposta8.setVisible(false),
          this.pergunta2.setVisible(false),
          this.resposta1P2.setVisible(false),
          this.resposta2P2.setVisible(false),
          this.resposta3P2.setVisible(false),
          this.resposta4P2.setVisible(false),
          this.caixaResposta9.setVisible(true),
          this.caixaResposta10.setVisible(true),
          this.caixaResposta11.setVisible(true),
          this.caixaResposta12.setVisible(true),
          this.pergunta3.setVisible(true),
          this.resposta1P3.setVisible(true),
          this.resposta2P3.setVisible(true),
          this.resposta3P3.setVisible(true),
          this.resposta4P3.setVisible(true)
          });
        };
        const pergunta3Correta2 = () => {
          this.score += 1
          console.log(this.score);
          // Mudar a textura da caixa de resposta para correta
          this.caixaResposta6.setTexture('caixaVerde');
          this.sound.play('acerto');
          // Exibir a próxima pergunta
          this.time.delayedCall(1000, () => {
          this.caixaPergunta.setVisible(true),
          this.caixaResposta5.setVisible(false),
          this.caixaResposta6.setVisible(false),
          this.caixaResposta7.setVisible(false),
          this.caixaResposta8.setVisible(false),
          this.pergunta2.setVisible(false),
          this.resposta1P2.setVisible(false),
          this.resposta2P2.setVisible(false),
          this.resposta3P2.setVisible(false),
          this.resposta4P2.setVisible(false),
          this.caixaResposta9.setVisible(true),
          this.caixaResposta10.setVisible(true),
          this.caixaResposta11.setVisible(true),
          this.caixaResposta12.setVisible(true),
          this.pergunta3.setVisible(true),
          this.resposta1P3.setVisible(true),
          this.resposta2P3.setVisible(true),
          this.resposta3P3.setVisible(true),
          this.resposta4P3.setVisible(true),
          this.updateFinalScoreText()
          });
        };
      // define qual é a resposta correta
        this.caixaResposta5.on('pointerdown', pergunta3);
        this.caixaResposta6.on('pointerdown', pergunta3Correta2);
        this.caixaResposta7.on('pointerdown', pergunta3);
        this.caixaResposta8.on('pointerdown', pergunta3);
        this.caixaResposta5.on('pointerdown', () => {
          this.caixaResposta5.isClicked = true;
          pergunta3();
        });
        this.caixaResposta7.on('pointerdown', () => {
          this.caixaResposta7.isClicked = true;
          pergunta3();
        });
        this.caixaResposta8.on('pointerdown', () => {
          this.caixaResposta8.isClicked = true;
          pergunta3();
        });
        const resultadoFinalCorreta3 = () => {
          this.score += 1
          console.log(this.score)
          // Mudar a textura da caixa de resposta para correta
          this.caixaResposta10.setTexture('caixaVerde');
          this.sound.play('acerto');
          // Exibir a tela de acertos
          this.time.delayedCall(1000, () => {
          this.caixaPergunta.setVisible(false),
          this.caixaResposta9.setVisible(false),
          this.caixaResposta10.setVisible(false),
          this.caixaResposta11.setVisible(false),
          this.caixaResposta12.setVisible(false),
          this.pergunta3.setVisible(false),
          this.resposta1P3.setVisible(false),
          this.resposta2P3.setVisible(false),
          this.resposta3P3.setVisible(false),
          this.resposta4P3.setVisible(false),
          this.finalScoreText.setVisible(true),
          this.updateFinalScoreText()
          });
          if (this.score === 3){
            this.time.delayedCall(2000, () => {
              this.scene.stop();
              // Iniciando cenaFinal a partir da cena 'celular'
              this.scene.start('cenaFinal', { nomeJogador: nomeJogador });
              });
          } else {
            this.time.delayedCall(1000, () => {
            this.restartButton.setVisible(true);
            this.finalScoreText.setVisible(false)
            })}
        };
        // Mudar a textura da caixa de resposta para incorreta
        const resultadoFinal = () => {
          console.log(this.score)
          if (this.caixaResposta9.isClicked) {
            this.caixaResposta9.setTexture('caixaVermelha');
            this.sound.play('erro');
        }
          if (this.caixaResposta11.isClicked) {
            this.caixaResposta11.setTexture('caixaVermelha');
            this.sound.play('erro');
        }
          if (this.caixaResposta12.isClicked) {
            this.caixaResposta12.setTexture('caixaVermelha');
            this.sound.play('erro');
        }
          this.time.delayedCall(1000, () => {
          this.caixaPergunta.setVisible(false),
          this.caixaResposta9.setVisible(false),
          this.caixaResposta10.setVisible(false),
          this.caixaResposta11.setVisible(false),
          this.caixaResposta12.setVisible(false),
          this.pergunta3.setVisible(false),
          this.resposta1P3.setVisible(false),
          this.resposta2P3.setVisible(false),
          this.resposta3P3.setVisible(false),
          this.resposta4P3.setVisible(false)
          this.finalScoreText.setVisible(true)
          });
        };

        // define qual é a resposta correta
        this.caixaResposta9.on('pointerdown', resultadoFinal);
        this.caixaResposta10.on('pointerdown', resultadoFinalCorreta3);
        this.caixaResposta11.on('pointerdown', resultadoFinal);
        this.caixaResposta12.on('pointerdown', resultadoFinal);
        this.caixaResposta9.on('pointerdown', () => {
          this.caixaResposta9.isClicked = true;
          resultadoFinal();
        });
        this.caixaResposta11.on('pointerdown', () => {
          this.caixaResposta11.isClicked = true;
          resultadoFinal();
        });
        this.caixaResposta12.on('pointerdown', () => {
          this.caixaResposta12.isClicked = true;
          resultadoFinal();
        });
      }

         // Configuração dos botões de acesso aos links
        this.botaoUrls1.on('pointerdown', () => [
          window.open(`https://unilever.sharepoint.com/sites/AboutUnilever/SitePages/Unilever-Dictionary.aspx`),
        ])

        this.botaoUrls2.on('pointerdown', () => [
          window.open(`https://degreed.com/pathway/w9d4oxqm8j/pathway?newWindow=true`),
        ])
        this.botaoUrls3.on('pointerdown', () => [
          window.open(`https://degreed.com/plan/3210455?editmode=false&autosuggest=false`),
        ])

        console.log("🚀 ~ celular ~ this.time.delayedCall ~ nomeJogador:", nomeJogador)

    }

  }