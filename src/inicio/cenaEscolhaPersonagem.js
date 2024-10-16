
export default class CenaEscolhaPersonagem extends Phaser.Scene {
    constructor() {
        super({ key: 'cenaEscolhaPersonagem' });
        this.nomeJogador = ''; // Adicionado para rastrear o nome digitado
        this.personagemSelecionado = null; // ID do personagem selecionado
    }

    create() {
        const { width, height } = this.sys.game.config;
        const bg = this.add.image(0, 0, 'bgEscolha');
        bg.setOrigin(0, 0); // Define a origem da imagem para o canto superior esquerdo

        // Escala a imagem para cobrir toda a tela
        bg.displayWidth = width;
        bg.displayHeight = height;
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        this.add.text(centerX - 78, centerY + 120, `Digite seu nome:`, { fontSize: '15px', fill: '#FFF', fontFamily: 'SaboFilled', resolution: 10 });
        this.criarCaixaDeTexto(centerX, centerY + 150);

        // Personagens
        this.personagens = []; // Array para armazenar os sprites dos personagens

        for (let i = 1; i <= 4; i++) {
            const personagem = this.add.image(centerX - 270 + (180 * (i - 1)), centerY, `personagem${i}N`).setInteractive();
            personagem.setScale(1.2);
            personagem.on('pointerover', () => {
                if (this.personagemSelecionado !== i) {
                    personagem.setTexture(`personagem${i}Hover`);
                }
            });
            personagem.on('pointerout', () => {
                if (this.personagemSelecionado !== i) {
                    personagem.setTexture(`personagem${i}N`);
                }
            });
            personagem.on('pointerdown', () => this.selecionarPersonagem(i));
            this.personagens.push(personagem); // Adiciona o sprite do personagem ao array
        }
    }

    criarCaixaDeTexto(x, y) {
        const canvas = this.game.canvas;
        const rect = canvas.getBoundingClientRect(); // Obtém a posição e dimensão do canvas na página
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.style.position = 'absolute';
        inputElement.style.left = `${rect.left + (x - 100)}px`; // Ajusta a posição X baseando-se no canvas
        inputElement.style.top = `${rect.top + y}px`; // Ajusta a posição Y baseando-se no canvas
        inputElement.style.width = '200px';
        inputElement.style.height = '40px';
        inputElement.setAttribute('maxlength', '10'); // Define o limite máximo de caracteres
        const playBtn = document.createElement('img');
        playBtn.src = './assets/misc/playbt.png'; // Caminho para a imagem padrão do botão
        playBtn.style.position = 'absolute';
        playBtn.style.left = `${rect.left + (x - 50)}px`; // Posicionamento com base na posição do canvas
        playBtn.style.top = `${rect.top + y + 50}px`; // Posicionamento com base na posição do canvas
        playBtn.style.width = '100px';
        playBtn.style.height = '40px';
        document.body.appendChild(playBtn);
        const hoverImagePath = './assets/misc/playbtHover.png'; // Substitua pelo caminho correto da imagem de hover
        playBtn.addEventListener('mouseover', () => {
            playBtn.src = hoverImagePath; // Muda a imagem para a versão de hover
        });
        playBtn.addEventListener('mouseout', () => {
            playBtn.src = './assets/misc/playbt.png'; // Retorna para a imagem original
        });
        playBtn.addEventListener('click', () => {
            console.log('Botão de play clicado!');
        });


        // Finalmente, adiciona o botão de imagem ao documento para que seja exibido
        document.body.appendChild(playBtn);
        document.body.appendChild(inputElement);

        playBtn.addEventListener('click', () => {
            if (this.personagemSelecionado && inputElement.value.trim() !== '') {
                this.nomeJogador = inputElement.value; // Armazena o nome digitado
                inputElement.remove();
                playBtn.remove();
                this.iniciarJogo(); // Chama a função para iniciar o jogo
                this.registry.set('nomeJogador', this.nomeJogador);

            }
        });
    }

    selecionarPersonagem(personagem) {
        if (this.personagemSelecionado) {
            // Reverte a textura do personagem anteriormente selecionado para a original
            const personagemAnterior = this.personagemSelecionado;
            this.personagens[personagemAnterior - 1].setTexture(`personagem${personagemAnterior}N`);
        }

        this.personagemSelecionado = personagem; // Atualiza o personagem selecionado
        // Atualiza a textura do novo personagem selecionado para o estado de hover
        this.personagens[personagem - 1].setTexture(`personagem${personagem}Hover`);
    }

    iniciarJogo() {
        // Certifica-se de que tanto o personagem quanto o nome foram selecionados/digitados
        if (this.personagemSelecionado && this.nomeJogador) {
            this.scene.start('cenaCidade', {
                personagemSelecionado: this.personagemSelecionado,
                nomeJogador: this.nomeJogador,
            });
        }
    }
}




