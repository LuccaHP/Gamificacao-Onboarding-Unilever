export default class jogoMemoria extends Phaser.Scene {
    constructor() {
        super({ key: 'jogoMemoria' }); // Define a chave da cena
    }

    // Cria os elementos do jogo
    create() {
        this.scene.get('HUD').hide();
        this.add.image(400, 300, 'bgMemoria').setScale(1);
        let firstCard = null;
        let secondCard = null;
        let cards = [];
        let cardPositions = {};
        let checkingPair = false;
        let lives = 10;
        let heartImages = [];
        let paresEncontrados = 0; // Adicionado para contar os pares encontrados
        let showingCards = true;

        const heartSpacing = 40;
        for (let i = 0; i < lives; i++) {
            const heart = this.add.image(60 + i * (30 + heartSpacing), 50, 'coracao').setScale(2.5);
            heartImages.push(heart);
        }

        const paresCorretos = [
            ['card_0_0', 'card_0_'],
            ['card_1_1', 'card_1'],
            ['card_2_2', 'card_2'],
            ['card_3_3', 'card_3'],
            ['card_4_4', 'card_4'],
            ['card_5_5', 'card_5']
        ];
        let cardsArray = Phaser.Utils.Array.Shuffle([...paresCorretos.flat()]); // Embaralha as cartas
        const cardSpacingX = 150;
        const cardSpacingY = 150;
        const maxCardWidth = 130;
        const rows = 3;
        const cols = 4;
        const totalCardWidth = cols * maxCardWidth * 0.5 + (cols - 1) * cardSpacingX;
        const totalEmptySpaceX = this.sys.game.config.width - totalCardWidth;
        const xOffset = totalEmptySpaceX / 2 + maxCardWidth * 0.75;
        const totalCardHeight = rows * maxCardWidth * 0.5 + (rows - 1) * cardSpacingY;
        const totalEmptySpaceY = this.sys.game.config.height - totalCardHeight;
        const yOffset = totalEmptySpaceY / 2 + maxCardWidth * 0.75;
        let startX = xOffset;
        let startY = yOffset;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const card = this.add.image(startX + j * cardSpacingX, startY + i * cardSpacingY, cardsArray[i * cols + j]).setScale(1);
                if (card.width > maxCardWidth) {
                    card.setScale(maxCardWidth / card.width);
                }

                card.setInteractive();
                const cardIndex = i * cols + j;
                card.cardID = cardsArray[cardIndex]; // Atribui um ID da carta baseado no array embaralhado

                card.on('pointerdown', function () {
                    if (!showingCards && !checkingPair && card.texture.key === 'cartaParaBaixo') {
                        card.setTexture(card.cardID);

                        if (!firstCard) {
                            firstCard = card;
                        } else {
                            secondCard = card;
                            checkingPair = true;

                            const ehParValido = (card1, card2) => {
                                return paresCorretos.some(par => par.includes(card1.cardID) && par.includes(card2.cardID));
                            };

                            if (ehParValido(firstCard, secondCard)) {
                                paresEncontrados++;
                                firstCard = null;
                                secondCard = null;
                                checkingPair = false;

                                if (paresEncontrados === paresCorretos.length) {
                                    setTimeout(() => {
                                        this.scene.start('cenaCidade', { x: 744, y: 558}); // Inicia a cena 'cenaCidade
                                        this.scene.get('HUD').show();
                                    }, 1000);
                                }
                            } else {
                                setTimeout(() => {
                                    firstCard.setTexture('cartaParaBaixo');
                                    secondCard.setTexture('cartaParaBaixo');
                                    firstCard = null;
                                    secondCard = null;
                                    checkingPair = false;

                                    lives--;
                                    heartImages[lives].destroy();
                                    if (lives === 0) {
                                        this.scene.start('gameOverMemoria');
                                    }
                                }, 2500);
                            }
                        }
                    }
                }.bind(this));

                cards.push(card);
            }
        }

        setTimeout(() => {
            showingCards = false;
            cards.forEach(card => card.setTexture('cartaParaBaixo'));
        }, 5000);
    }
}
