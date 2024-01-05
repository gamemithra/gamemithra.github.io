import Phaser from "../lib/phaser.js";
export default class CardModule extends Phaser.Scene {
  constructor(gameScene, audioManager) {
    super({ key: "CardModule" });
    this.gameScene = gameScene;
    this.currentPlayer = "";
    this.audioManager = audioManager;
    this.playerX = 10;
    this.aiX = gameScene.sys.game.config.width - 10;
    this.playerX2 = gameScene.sys.game.config.width / 2 - 300;
    this.aiX2 = gameScene.sys.game.config.width / 2 + 300;
    this.playerDeckData = gameScene.cache.json.get("player_cardData");
    this.aiDeckData = gameScene.cache.json.get("ai_cardData");
    this.attributeButtons = [];
    this.attributestatics = [];
    this.cardIndex = 0;
    this.playerFeedbackArray = [];
    this.aiFeedbackArray = [];
    this.playerCard = null;
    this.aiCard = null;
    this.playerCards = [];
    this.aiCards = [];
  }
  async initializeDecks(numberOfCards) {
    this.createButtonFeedBack(); // Initialize this first
    this.playerCards = [];
    this.aiCards = [];

    for (let i = 0; i < numberOfCards; i++) {
      const playerCard = {
        image: this.gameScene.add.image(this.playerX, 500, "cardFront"),
        data: this.playerDeckData[i],
        type: "Player Card",
      };
      this.playerCards.push(playerCard);
      this.audioManager.playPageFlip();
    }

    for (let i = 0; i < numberOfCards; i++) {
      const aiCard = {
        image: this.gameScene.add.image(this.aiX, 500, "cardFront"),
        data: this.aiDeckData[i],
        type: "AI",
      };
      this.aiCards.push(aiCard);
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        this.drawNextCards();
        resolve();
      }, 300); // Use animation duration or an appropriate delay
    });
  }
  drawNextCards() {
    this.audioManager.playShuffle();
    //this.currentPlayer = 'ai';
    console.log("current player: " + this.currentPlayer);
    console.log("playerCradsLength : " + this.playerCards.length);
    console.log("aiCardsLength : " + this.aiCards.length);

    if (this.playerCards.length > 0 && this.aiCards.length > 0) {
      const playerCardData = this.playerCards[this.playerCards.length - 1].data;
      const aiCardData = this.aiCards[this.aiCards.length - 1].data;

      // Draw new cards and assign them to playerCard and aiCard
      this.playerCard = this.drawCard(
        this.gameScene,
        this.playerCards[0],
        playerCardData,
        this.playerX2
      );

      this.aiCard = this.drawCard(
        this.gameScene,
        this.aiCards[0],
        aiCardData,
        this.aiX2
      );

      // Update data associated with playerCard and aiCard
      this.playerCard.cardData = playerCardData;
      this.aiCard.cardData = aiCardData;

      // Remove the first elements from playerCards and aiCards
      this.playerCards.shift();
      this.aiCards.shift();
      this.gameScene.time.delayedCall(1200, () => {
        if (this.currentPlayer === "player") {
          this.revealCard(this.playerCard);
        } else {
          this.revealCard(this.aiCard);
        }
      });
    } else {
      this.gameScene.showGameOverScreen();
    }
  }

  drawCard(scene, firstCard, cardData, posX2) {
    if (firstCard) {
      firstCard.image.y -= 32;
      this.audioManager.playPageFlip();
      scene.tweens.add({
        targets: firstCard.image,
        x: posX2,
        scaleX: 1.25,
        scaleY: 1.25,
        duration: 500,
        onComplete: () => {},
      });

      firstCard.cardData = cardData;
      return firstCard;
    }
  }

  async revealCard(card) {
    // console.log(`Revealing card: ${card.type}`);
    this.audioManager.playCut();
    if (card.image.texture.key === "cardBack") {
      this.flipCard(card.image, "cardBack", "cardFront");
    } else {
      this.flipCard(card.image, "cardFront", "cardBack");
      setTimeout(() => {
        this.createAttributeButtons(card);
      }, 500);
      if (card && this.currentPlayer === "player") {
        card.image.preFX.setPadding(22);
        const fx = card.image.preFX.addGlow();

        // Adjust outerStrength and other parameters as needed for your effect
        const glowTween = this.tweens.add({
          targets: fx,
          outerStrength: 10, // Adjust the value as per your desired glow intensity
          color: 0xffffff,
          yoyo: true,
          loop: -1,
          ease: "sine.inout",
        });
      }
    }
  }
  async createAttributeButtons(card) {
    const buttonSpacingY = 40;
    const startY = 430;
    const currentCardData = card.cardData;
    console.log(
      "creating attribute buttons : " +
        card.type +
        "currentCard.Data : " +
        card.data
    );
    console.log("currentCardData : " + currentCardData);

    for (const [index, key] of Object.keys(currentCardData).entries()) {
      const attributeValue = currentCardData[key];
      const buttonX = card.image.x - 8;
      const buttonY = startY + index * buttonSpacingY;

      if (index === 0) {
        const text = this.gameScene.add.text(
          buttonX - 80,
          buttonY + 10,
          ` ${attributeValue}`,
          {
            fontFamily: "Arial, sans-serif",
            fontSize: "30px",
            color: "#800000",
            fontStyle: "bold",
          }
        );
        this.attributestatics.push(text);
      } else if (index === 1) {
        const photoX = buttonX;
        const photoY = buttonY - 140;
        const maxWidth = 340;
        const maxHeight = 200;
        const photoImage = this.gameScene.add.image(photoX, photoY, key);
        photoImage.setScale(1.3);
        // const imageWidth = 200;
        // const imageHeight = 200;
        // photoImage.setScale(
        //   imageWidth / photoImage.width,
        //   imageHeight / photoImage.height
        // );
        photoImage.setOrigin(0.5, 0.5);
        photoImage.setInteractive();
        this.attributestatics.push(photoImage);
      } else {
        const button = this.gameScene.add.text(
          buttonX,
          buttonY,
          `${key}: ${attributeValue}`,
          {
            fontFamily: "Arial, sans-serif",
            fontSize: "26px",
            color: "#F08080",
            fontStyle: "bold",
          }
        );

        button.setOrigin(0.5, 0.5);

        button.on("pointerdown", () => {
          if (this.currentPlayer === "player") {
            button.setFontSize(26);
            button.setColor("#229954");
            button.setFontStyle("bold");
            button.setDepth(3);
            this.audioManager.playSelect();
            setTimeout(() => {
              this.handleCardSelection(attributeValue, index);
            }, 500);
          }
        });
        if (this.currentPlayer === "player") {
          button.setInteractive();
        }
        this.attributeButtons.push(button);
      }
    }
    if (this.currentPlayer !== "player") {
      await this.waitForAttributeButtons().then(() => {
        this.gameScene.time.delayedCall(1200, () => {
          this.autoSelectAttribute();
        });
      });
    }
  }
  async waitForAttributeButtons() {
    // Check if attributeButtons are already created
    while (this.attributeButtons.length === 0) {
      // Wait for a short delay
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  // Inside your CardModule class
  async autoSelectAttribute() {
    this.audioManager.playSelect();

    try {
      if (this.attributeButtons.length > 0) {
        const randomValue = Math.floor(
          Math.random() * this.attributeButtons.length
        );
        const selectedText = this.attributeButtons[randomValue];

        if (!selectedText) {
          throw new Error("Selected text is undefined.");
        }

        selectedText.setFontSize(30);
        selectedText.setColor("#229954");
        selectedText.setFontStyle("bold");
        selectedText.setDepth(2.2);

        const index = randomValue + 2;
        setTimeout(() => {
          this.handleCardSelection(selectedText, index);
        }, 1200);
      } else {
        console.error("No attribute buttons available for selection.");
      }
    } catch (error) {
      console.error("Error in autoSelectAttribute:", error);
    }
  }

  async handleCardSelection(attributeValue, index) {
    await this.revealHiddenCard(index).then(() => {
      this.evaluateSelection(attributeValue, index);
    });
  }
  async revealHiddenCard(index) {
    if (this.currentPlayer === "player") {
      this.revealCard(this.aiCard);
      this.toggleFeedback(index);
    } else {
      this.revealCard(this.playerCard);
      this.toggleFeedback(index);
    }
  }
  toggleFeedback(index) {
    if (this.currentPlayer === "player") {
      this.gameScene.time.delayedCall(500, () => {
        this.aiFeedbackArray[index - 2].setVisible(true);
      });
      setTimeout(() => {
        this.aiFeedbackArray[index - 2].setVisible(false);
        this.flipCard(this.aiCard.image, "cardBack", "cardFront");
        this.clearAtributesOnCard();
      }, 1000);
    } else {
      this.gameScene.time.delayedCall(500, () => {
        this.playerFeedbackArray[index - 2].setVisible(true);
      });
      setTimeout(() => {
        this.playerFeedbackArray[index - 2].setVisible(false);
        this.flipCard(this.playerCard.image, "cardBack", "cardFront");
        this.clearAtributesOnCard();
      }, 1000);
    }
  }

  async evaluateSelection(attributeValue, index) {
    this.disableAttributeButtons();
    let hiddenCardAttributeValue;
    let winner;
    if (this.currentPlayer === "player") {
      hiddenCardAttributeValue =
        this.aiDeckData[this.cardIndex][
          Object.keys(this.aiDeckData[this.cardIndex])[index]
        ];

      if (attributeValue > hiddenCardAttributeValue) {
        winner = "player";
      } else {
        winner = "ai";
      }
    } else {
      hiddenCardAttributeValue =
        this.playerDeckData[this.cardIndex][
          Object.keys(this.playerDeckData[this.cardIndex])[index]
        ];
      if (attributeValue > hiddenCardAttributeValue) {
        winner = "ai";
      } else {
        winner = "player";
      }
    }
    this.winRoundSequence(winner);
  }
  winRoundSequence(winner) {
    if (winner === "player") {
      const removedAICard = this.aiCards.shift(); // Remove AI's first card
      const removedAICardData = this.aiDeckData.shift();
      // Remove AI's first card's data
      // Add the removed AI card back to the AI's deck
      this.aiDeckData.push(removedAICardData);

      // Create a new image for the removed AI card and add it to the player's cards array
      const newPlayerCard = {
        image: this.gameScene.add.image(this.playerX, 500, "cardFront"),
        data: removedAICardData,
        type: "Player Card",
      };
      this.playerCards.push(newPlayerCard);
    } else {
      // AI wins the round
      const removedPlayerCard = this.playerCards.shift(); // Remove player's first card
      const removedPlayerCardData = this.playerDeckData.shift();
      // Remove player's first card's data
      // Add the removed player card back to the player's deck
      this.playerDeckData.push(removedPlayerCardData);
      // Create a new image for the removed player card and add it to the AI's cards array
      const newAICard = {
        image: this.gameScene.add.image(this.aiX, 500, "cardFront"),
        data: removedPlayerCardData,
        type: "AI Card",
      };
      this.aiCards.push(newAICard);
    }
    setTimeout(() => {
      this.moveCardsToWinner(winner);
    }, 1000);
  }

  async moveCardsToWinner(winner) {
    const duration = 1000;
    const zIndexToSet = -1;
    this.playerCard.image.setTexture("cardFront");
    this.aiCard.image.setTexture("cardFront");

    if (winner === "player") {
      this.gameScene.tweens.add({
        targets: [this.playerCard.image, this.aiCard.image],
        x: -100,
        scaleX: 0.5,
        scaleY: 0.5,
        duration: duration,
        onComplete: () => {
          if (this.playerCard && this.aiCard) {
            this.playerCard.image.setDepth(zIndexToSet);
            this.aiCard.image.setDepth(zIndexToSet);

            this.gameScene.UpdateScores(winner);
            this.currentPlayer = winner; //should not assign before

            setTimeout(() => {
              this.drawNextCards();
            }, 1200);
          }
        },
      });
    } else {
      this.gameScene.tweens.add({
        targets: [this.playerCard.image, this.aiCard.image],
        x: this.aiX + 200,
        scaleX: 0.5,
        scaleY: 0.5,
        duration: duration,
        onComplete: () => {
          if (this.playerCard && this.aiCard) {
            this.playerCard.image.setDepth(zIndexToSet);
            this.aiCard.image.setDepth(zIndexToSet);

            this.gameScene.UpdateScores(winner);
            this.currentPlayer = winner; //should not assign before
            setTimeout(() => {
              this.drawNextCards();
            }, 1200);
          }
        },
      });
    }
  }
  async disableAttributeButtons() {
    for (const button of this.attributeButtons) {
      button.setInteractive(false);
    }
  }

  createButtonFeedBack() {
    const buttonSpacingY = 40;
    const feedbackSize = {
      width: 300,
      height: 30,
    };
    const feedbackColor = 0x229954;
    const zIndexToSet = 1.5; // Set the depth value here

    for (let i = 0; i < 5; i = i + 1) {
      const buttonY = 500 + i * buttonSpacingY;
      const buttonX = this.playerX2 - 150;
      const playerFeedback = this.gameScene.add.graphics();
      playerFeedback.fillStyle(feedbackColor);
      playerFeedback.fillRect(
        buttonX,
        buttonY,
        feedbackSize.width,
        feedbackSize.height
      );
      playerFeedback.alpha = 0.4;
      playerFeedback.setVisible(false);
      playerFeedback.setDepth(zIndexToSet); // Set the depth
      this.playerFeedbackArray.push(playerFeedback);
    }

    for (let i = 0; i < 5; i = i + 1) {
      const buttonY = 500 + i * buttonSpacingY;
      const buttonX = this.aiX2 - 150;
      const aiFeedback = this.gameScene.add.graphics();
      aiFeedback.fillStyle(feedbackColor);
      aiFeedback.fillRect(
        buttonX,
        buttonY,
        feedbackSize.width,
        feedbackSize.height
      );
      aiFeedback.alpha = 0.4;
      aiFeedback.setVisible(false);
      aiFeedback.setDepth(zIndexToSet); // Set the depth
      this.aiFeedbackArray.push(aiFeedback);
    }
  }
  clearAtributesOnCard() {
    for (const button of this.attributeButtons) {
      button.destroy();
    }
    for (const item of this.attributestatics) {
      item.destroy();
    }
    this.attributestatics = [];
    this.attributeButtons = [];
  }
  flipCard(cardImage, fromTexture, toTexture) {
    const flipDuration = 250;
    cardImage.scaleX = -1;

    this.gameScene.tweens.add({
      targets: cardImage,
      scaleX: 1,
      duration: flipDuration,
      onComplete: () => {
        cardImage.setTexture(toTexture);

        this.gameScene.tweens.add({
          targets: cardImage,
          scaleX: 1.25,
          duration: flipDuration,
          onComplete: () => {
            // Animation complete callback
          },
        });
      },
    });
  }
}
