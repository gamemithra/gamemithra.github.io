/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/phaser.js":
/*!***************************!*\
  !*** ./src/lib/phaser.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.Phaser);

/***/ }),

/***/ "./src/scenes/AudioManager.js":
/*!************************************!*\
  !*** ./src/scenes/AudioManager.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AudioManager)
/* harmony export */ });
class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.music = null;
  }

  preload() {
    this.scene.load.audio("music", ["assets/audio/music.mp3"]);
    this.scene.load.audio("btnClick", ["assets/audio/btnClick.wav"]);
    this.scene.load.audio("pageFlip", ["assets/audio/pageFlip.mp3"]);
    this.scene.load.audio("select", ["assets/audio/btnClick.wav"]);
    this.scene.load.audio("shuffle", ["assets/audio/shuffle.wav"]);
    this.scene.load.audio("cut", ["assets/audio/cut.wav"]);
    this.scene.load.audio("winRound", ["assets/audio/win.mp3"]);
    this.scene.load.audio("failureSound", ["assets/audio/failure.mp3"]);
    this.scene.load.audio("gameOver", ["assets/audio/gameOver.mp3"]);
  }

  create() {
    this.music = this.scene.sound.add("music");
    this.btnClick = this.scene.sound.add("btnClick");
    this.pageFlip = this.scene.sound.add("pageFlip");
    this.select = this.scene.sound.add("select");
    this.shuffle = this.scene.sound.add("shuffle");
    this.cut = this.scene.sound.add("cut");
    this.winRound = this.scene.sound.add("winRound");
    this.failureSound = this.scene.sound.add("failureSound");
    this.gameOver = this.scene.sound.add("gameOver");
  }

  playBackgroundMusic() {
    if (this.music) {
      this.music.play({ loop: true });
    } else {
      console.log("No music loaded");
    }
  }
  stopBackgroundMusic() {
    this.music.stop();
  }
  playButtonClick() {
    if (this.btnClick) {
      this.btnClick.play();
    } else {
      console.log("No music loaded");
    }
  }
  playPageFlip() {
    this.pageFlip.play();
  }
  playShuffle() {
    this.pageFlip.play();
  }
  playCut() {
    this.cut.play();
  }
  playWinRound() {
    this.winRound.play();
  }
  playFailureRound() {
    this.failureSound.play();
  }
  playSelect() {
    if (this.select) {
      this.select.play();
    } else {
      console.log("No music loaded");
    }
  }
  playGameOver() {
    this.gameOver.play();
  }
}


/***/ }),

/***/ "./src/scenes/CardModule.js":
/*!**********************************!*\
  !*** ./src/scenes/CardModule.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CardModule)
/* harmony export */ });
/* harmony import */ var _lib_phaser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/phaser.js */ "./src/lib/phaser.js");

class CardModule extends _lib_phaser_js__WEBPACK_IMPORTED_MODULE_0__["default"].Scene {
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


/***/ }),

/***/ "./src/scenes/GameScene.js":
/*!*********************************!*\
  !*** ./src/scenes/GameScene.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameScene)
/* harmony export */ });
/* harmony import */ var _lib_phaser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/phaser.js */ "./src/lib/phaser.js");
/* harmony import */ var _coinFlipAnimation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coinFlipAnimation.js */ "./src/scenes/coinFlipAnimation.js");
/* harmony import */ var _CardModule_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CardModule.js */ "./src/scenes/CardModule.js");




class GameScene extends _lib_phaser_js__WEBPACK_IMPORTED_MODULE_0__["default"].Scene {
  constructor() {
    super("GameScene");
    this.audioManager = null;
    this.winnerImage = null;
    this.failureImage = null;
    this.gameOverImage = null;
    this.scores = 0;
    this.scoreText = null;
    this.playerCardsCount = 0;
    this.playerCardsCountText = null;
    this.aiCardsCount = 0;
    this.aiCardsCountText = null;
    this.currentScore = 0;
    this.newScore = 0;
    this.numberOfCardsInDecks = 0;
  }
  init(data) {
    this.numberOfCardsInDecks = data;
    console.log("cards to dealt: " + this.numberOfCardsInDecks);
    this.audioManager = this.scene.get("MainMenuScene").audioManager;
  }

  preload() {
    this.load.image("game-background", "assets/img/hud/game-bg.jpg");
    //coin toss animation
    this.load.image("coinYou", "assets/img/Flip_coin/gold_u.png");
    this.load.image("coin2", "assets/img/Flip_coin/gold_2.png");
    this.load.image("coin3", "assets/img/Flip_coin/gold_3.png");
    this.load.image("coin4", "assets/img/Flip_coin/gold_4.png");
    this.load.image("coinAI", "assets/img/Flip_coin/gold_AI.png");
    // Load card images
    this.load.image("cardFront", "assets/img/cards/cardFront.png"); // Front image
    this.load.image("cardBack", "assets/img/cards/cardBack.png"); // Back image
    //load carddata from jsons
    this.load.json("player_cardData", "assets/json/player_cardData.json");
    this.load.json("ai_cardData", "assets/json/ai_cardData.json");
    //load hud images
    this.load.image("yourCards", "assets/img/hud/yourCards.png");
    this.load.image("opponentsCards", "assets/img/hud/opponentsCards.png");
    this.load.image("aiAvatar", "assets/img/hud/aiAvatar.png");
    this.load.image("playerAvatar", "assets/img/hud/playerAvatar.png");
    this.load.image("scoreBoard", "assets/img/hud/scoreBoard.png");
    this.load.image("music-on", "assets/img/hud/musicOn.png");
    this.load.image("music-off", "assets/img/hud/musicOff.png");
    this.load.image("youWon", "assets/img/hud/youWon.png");
    this.load.image("youLost", "assets/img/hud/youLost.png");
    this.load.image("gameOverImage", "assets/img/hud/gameOver_bg.png");
    this.load.image("menu", "assets/img/hud/menu.png");
    this.load.image("retry", "assets/img/hud/restart.png");
    //loading cricket players photos
    this.load.image("Virat Kohli", "assets/img/Player_photos/Virat-kohli.png");

    this.load.image(
      "Kane Williamson",
      "assets/img/Player_photos/kane_williamson.png"
    );
    this.load.image("Joe Root", "assets/img/Player_photos/Rohit_sharma.png");
    this.load.image("Babar Azam", "assets/img/Player_photos/Babar_azam.png");
    this.load.image(
      "Dawid warner",
      "assets/img/Player_photos/dawid_warner.png"
    );
    this.load.image(
      "Goutam ghambir",
      "assets/img/Player_photos/Goutam_ghambir.png"
    );
    this.load.image("Harbajan", "assets/img/Player_photos/Harbajan.png");
    this.load.image(
      "Kagiso-Rabada",
      "assets/img/Player_photos/Kagiso-Rabada.png"
    );
    this.load.image("MsDhoni", "assets/img/Player_photos/MsDhoni.png");
    this.load.image(
      "Ravindra_jadeja",
      "assets/img/Player_photos/Ravindra_jadeja.png"
    );
    this.load.image("sachin", "assets/img/Player_photos/sachin.png");
    this.load.image(
      "verander_sawag",
      "assets/img/Player_photos/verander_sawag.png"
    );
    this.load.image(
      "Steve Smith",
      "assets/img/Player_photos/kane_williamson.png"
    );
  }
  create() {
    this.audioManager.playBackgroundMusic();

    // Pass audioManager to the CardModule
    this.cardModule = new _CardModule_js__WEBPACK_IMPORTED_MODULE_2__["default"](this, this.audioManager);

    // Apply the post-processing effect to the scene
    this.cameras.main.setPostPipeline("Glow");
    this.playerCardsCount = this.numberOfCardsInDecks;
    this.aiCardsCount = this.numberOfCardsInDecks;

    const centerX = this.sys.game.config.width / 2;
    const centerY = this.sys.game.config.height / 2;
    const gameBg = this.add.image(0, 0, "game-background").setOrigin(0);
    // const blurFilter = this.add.filter('Blur');
    // gameBg.setPostPipeline(blurFilter);
    // blurFilter.setBlur(10);

    const randomValue = Math.random() < 0.5 ? "ai" : "player";

    (0,_coinFlipAnimation_js__WEBPACK_IMPORTED_MODULE_1__.createCoinFlipAnimation)(this, centerX, centerY, randomValue, (result) => {
      this.time.delayedCall(1000, () => {
        this.startGame(`${result}`);
      });
    });
  }

  startGame(initialPlayer) {
    this.cardModule.currentPlayer = initialPlayer;

    this.cardModule.initializeDecks(this.numberOfCardsInDecks, initialPlayer);
    this.showHud();
  }

  UpdateScores(winner) {
    console.log("winner is: " + winner);
    if (winner === "player") {
      this.scores += 100;
      this.time.delayedCall(100, () => {
        this.winnerImage.setVisible(true); // Hide the image
        this.audioManager.playWinRound();
      });
      this.time.delayedCall(1000, () => {
        this.winnerImage.setVisible(false); // Hide the image
      });
    } else {
      this.scores -= 100;
      this.time.delayedCall(100, () => {
        this.failureImage.setVisible(true); // Hide the image
        this.audioManager.playFailureRound();
      });
      this.time.delayedCall(1000, () => {
        this.failureImage.setVisible(false); // Hide the image
      });
    }
    this.currentScore = this.newScore;
    this.newScore = this.scores;
    this.scoreText.setText(this.scores);

    this.aiCardsCountText.setText(this.cardModule.aiCards.length);
    this.playerCardsCountText.setText(this.cardModule.playerCards.length);
  }

  showHud() {
    this.winnerImage = this.add
      .image(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2,
        "youWon"
      )
      .setOrigin(0.5, 0.5)
      .setVisible(false)
      .setDepth(1); // Set the same high depth value, e.g., 1;

    this.failureImage = this.add
      .image(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2,
        "youLost"
      )
      .setOrigin(0.5, 0.5)
      .setVisible(false)
      .setDepth(1); // Set the same high depth value, e.g., 1;
    const playerCardsCountBG = this.add
      .image(20, this.sys.game.config.height - 20, "yourCards")
      .setScale(1.2)
      .setOrigin(0, 1);
    this.playerCardsCountText = this.add.text(
      playerCardsCountBG.width - 10, // Adjust the x position as needed
      playerCardsCountBG.y - 85, // Adjust the y position as needed
      this.playerCardsCount,
      {
        fontFamily: "grobold",
        fontSize: "50px",
        fontStyle: "bold",
        fill: "#ffffff", // Set the text color
      }
    );
    this.playerCardsCountText.setOrigin(0, 0);
    this.add.existing(this.playerCardsCountText);

    const aiCardsCountBG = this.add
      .image(
        this.sys.game.config.width - 20,
        this.sys.game.config.height - 20,
        "opponentsCards"
      )
      .setScale(1.2)
      .setOrigin(1, 1);
    const aiAvatar = this.add.image(
      aiCardsCountBG.x - 60,
      aiCardsCountBG.y - 60,
      "aiAvatar"
    );
    const playerAvatar = this.add.image(
      playerCardsCountBG.x + 60,
      playerCardsCountBG.y - 60,
      "playerAvatar"
    );

    this.aiCardsCountText = this.add.text(
      aiCardsCountBG.x - 490, // Adjust the x position as needed
      aiCardsCountBG.y - 55, // Adjust the y position as needed
      this.aiCardsCount,
      {
        fontFamily: "grobold",
        fontSize: "50px",
        fontStyle: "bold",
        fill: "#ffffff", // Set the text color
      }
    );
    this.aiCardsCountText.setOrigin(0.5, 0.5);
    this.add.existing(this.aiCardsCountText);
    this.add
      .image(this.sys.game.config.width - 80, 70, "music-off")
      .setScale(0.15)
      .setOrigin(0.5, 0.5);
    let toggle = false; // Declare toggle as a variable

    const MusicToggle = this.add
      .image(this.sys.game.config.width - 80, 70, "music-on")
      .setScale(0.15)
      .setOrigin(0.5, 0.5);

    MusicToggle.on("pointerdown", () => {
      console.log("Button clicked!"); // Add this line for debugging
      toggle = !toggle;
      if (toggle) {
        this.audioManager.playBackgroundMusic();
        MusicToggle.setTexture("music-on");
      } else {
        this.audioManager.stopBackgroundMusic();
        MusicToggle.setTexture("music-off");
      }
    });

    MusicToggle.setInteractive();

    //updating scoreboard
    const scoreBoard = this.add
      .image(20, 20, "scoreBoard")
      .setScale(0.1, 0.15)
      .setOrigin(0, 0);
    this.scoreText = this.add.text(
      scoreBoard.x + 200, // Adjust the x position as needed
      scoreBoard.y + 10, // Adjust the y position as needed
      this.scores,
      {
        fontFamily: "grobold",
        fontSize: "40px",
        fontStyle: "bold",
        fill: "#ffffff", // Set the text color
      }
    );

    this.scoreText.setOrigin(0, 0);
    this.add.existing(this.scoreText);
    this.UpdateScoreNumbers(this.currentScore, this.newScore);
  }
  UpdateScoreNumbers(currentScore, newScore) {
    let updateTween = this.tweens.addCounter({
      from: currentScore,
      to: newScore,
      duration: 2000,
      ease: "linear",
      onUpdate: (tween) => {
        const value = Math.round(tween.getValue());
        this.scoreText.setText(`${value}`);
      },
    });
    if (updateTween.isPlaying()) {
      //  The tween is already running, so we'll update the end value with resetting it
      updateTween.updateTo("value", newScore);
    } else {
      //  The tween has finished, so create a new one
      updateTween = this.tweens.addCounter({
        from: currentScore,
        to: newScore,
        duration: 2000,
        ease: "linear",
        onUpdate: (tween) => {
          const value = Math.round(tween.getValue());
          this.scoreText.setText(`${value}`);
        },
      });
    }
  }
  showGameOverScreen() {
    this.audioManager.playGameOver();
    const centerX = this.sys.game.config.width / 2;
    const centerY = this.sys.game.config.height / 2;

    // Create a group for the game over elements
    const gameOverGroup = this.add.group();

    // Create the game over image
    this.gameOverImage = this.add
      .image(centerX, centerY, "gameOverImage")
      .setOrigin(0.5)
      .setScale(1.4, 1.2);
    gameOverGroup.add(this.gameOverImage);

    // Display the final score
    const scoreTextgameOverScreen = this.add
      .text(
        centerX,
        centerY + 80, // Adjust the Y position as needed
        ` ${this.scores}`,
        {
          fontFamily: "grobold",
          fontSize: "40px",
          fontStyle: "bold",
          fill: "#ffffff",
        }
      )
      .setOrigin(0.5);
    gameOverGroup.add(scoreTextgameOverScreen);
    // Create the menu button
    const menuButton = this.add
      .image(
        centerX - 110,
        centerY + 200, // Adjust the Y position as needed
        "menu",
        {
          fontFamily: "grobold",
          fontSize: "30px",
          fontStyle: "bold",
          fill: "#ffffff",
        }
      )
      .setOrigin(0.5)
      .setInteractive();
    gameOverGroup.add(menuButton);
    // Create the retry button
    const retryButton = this.add
      .image(
        centerX + 110,
        centerY + 200, // Adjust the Y position as needed
        "retry",
        {
          fontFamily: "grobold",
          fontSize: "30px",
          fontStyle: "bold",
          fill: "#ffffff",
        }
      )
      .setOrigin(0.5)
      .setInteractive();
    gameOverGroup.add(retryButton);

    // Add a pointerdown event for the retry button
    retryButton.on("pointerdown", () => {
      // Implement logic to restart the game
      // For example, you can reset scores and start a new game

      this.scores = 0;
      this.UpdateScoreNumbers(this.currentScore, this.newScore);
      this.scene.restart();
    });

    // Add a pointerdown event for the menu button
    menuButton.on("pointerdown", () => {
      // Implement logic to return to the main menu
      // For example, you can load a different scene
      this.scores = 0;
      this.UpdateScoreNumbers(this.currentScore, this.newScore);
      this.scene.start("MainMenuScene"); // Replace 'MainMenuScene' with the actual scene key for your main menu
    });

    // Make the game over elements visible
    gameOverGroup.setVisible(true);
  }
}


/***/ }),

/***/ "./src/scenes/MainMenuScene.js":
/*!*************************************!*\
  !*** ./src/scenes/MainMenuScene.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainMenuScene)
/* harmony export */ });
/* harmony import */ var _AudioManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AudioManager.js */ "./src/scenes/AudioManager.js");


class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene");
    this.audioManager = null;
  }

  preload() {
    this.load.image("menu_bg", "assets/img/hud/MainMenu_Cric_clash.png");
    this.load.image("play_button", "assets/img/hud/play_button.png");
    this.load.image("helpBtn", "assets/img/hud/help_button.png");
    this.load.image("infoBg", "assets/img/hud/bg-help.jpg");
    this.load.image("closeButton", "assets/img/hud/close_button.png");
    this.audioManager = new _AudioManager_js__WEBPACK_IMPORTED_MODULE_0__["default"](this);
    this.audioManager.preload();

    // Set up a loading progress bar
    const loadingText = this.add.text(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      "Loading...",
      {
        fontSize: "32px",
        fill: "#ffffff",
        align: "center",
      }
    );
    loadingText.setOrigin(0.5);

    this.load.on("progress", (value) => {
      // Update the loading progress bar as assets are loaded
      loadingText.setText(`Loading... ${Math.round(value * 100)}%`);
    });

    this.load.on("complete", () => {
      // All assets are loaded, hide the loading text and create your scene
      loadingText.setVisible(false);

      this.createScene();
    });
  }

  create() {
    // Create the audio manager
    this.audioManager.create();
  }

  createScene() {
    // Create the scene content now that all assets are loaded
    const menu_bg = this.add.image(0, 0, "menu_bg");
    menu_bg.setOrigin(0, 0);
    menu_bg.setScale(
      this.sys.game.config.width / menu_bg.width,
      this.sys.game.config.height / menu_bg.height
    );

    // Create and turn on a group of buttons
    const buttonGroup = this.add.group();

    // Add your buttons to the group and position them as needed
    const playBtn = this.add.image(
      this.sys.game.config.width - 300,
      this.sys.game.config.height / 2,
      "play_button"
    );
    playBtn.preFX.setPadding(22);

    const fx = playBtn.preFX.addGlow();

    // Adjust outerStrength and other parameters as needed for your effect
    const glowTween = this.tweens.add({
      targets: fx,
      outerStrength: 10, // Adjust the value as per your desired glow intensity
      color: 0xffffff,
      yoyo: true,
      loop: -1,
      ease: "sine.inout",
    });
    const helpBtn = this.add.image(
      this.sys.game.config.width - 300,
      this.sys.game.config.height / 2 + 150,
      "helpBtn"
    );

    buttonGroup.addMultiple([playBtn, helpBtn]);

    playBtn.setScale(0.2);
    playBtn.setInteractive();
    playBtn.on("pointerup", () => {
      // Handle button click
      this.scene.start("OptionScene");
    });

    helpBtn.setScale(0.12);
    helpBtn.setInteractive();
    helpBtn.on("pointerup", () => {
      // Create an overlay image for the help message background
      const helpMessageBg = this.add.image(0, 0, "infoBg"); // 'infoBg' is the key of your image asset
      helpMessageBg.setOrigin(0);
      helpMessageBg.setDisplaySize(
        this.game.config.width,
        this.game.config.height
      );
      helpMessageBg.setDepth(1); // Set a higher depth to ensure it's on top of other elements

      // Create a close button
      const closeButton = this.add.image(40, 40, "closeButton"); // 'closeButton' is the key of your close button image asset
      closeButton.setOrigin(0);
      closeButton.setScale(0.1);
      closeButton.setInteractive(); // Allow the button to be interactive
      closeButton.setDepth(2); // Set a higher depth than the help message background

      // Close the help message and remove the overlay when the close button is clicked
      closeButton.on("pointerup", () => {
        helpMessageBg.destroy(); // Remove the help message background
        closeButton.destroy(); // Remove the close button
      });
    });
  }
}


/***/ }),

/***/ "./src/scenes/OptionScene.js":
/*!***********************************!*\
  !*** ./src/scenes/OptionScene.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OptionScene)
/* harmony export */ });
/* harmony import */ var _lib_phaser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/phaser.js */ "./src/lib/phaser.js");


class OptionScene extends _lib_phaser_js__WEBPACK_IMPORTED_MODULE_0__["default"].Scene {
  constructor() {
    super("OptionScene");
  }
  init() {
    this.audioManager = this.scene.get("MainMenuScene").audioManager;
  }
  preload() {
    this.load.image("background", "assets/img/hud/bg-menu.jpg");
    this.load.image("option_backing", "assets/img/hud/option-Backing2.png");
    this.load.image("deckOfSixteen", "assets/img/hud/16.png");
    this.load.image("deckOfThirty", "assets/img/hud/30.png");
    this.load.image("deckOfFiftyTwo", "assets/img/hud/52.png");
    this.load.image("deckOfSixteen-hover", "assets/img/hud/16-pressed.png");
    this.load.image("deckOfThirty-hover", "assets/img/hud/30-pressed.png");
    this.load.image("deckOfFiftyTwo-hover", "assets/img/hud/52-pressed.png");
  }
  create() {
    const centerX = this.sys.game.config.width / 2;
    const centerY = this.sys.game.config.height / 2;
    const background = this.add.image(centerX, centerY, "background");
    background.setOrigin(0.5);
    background.setScale(
      this.sys.game.config.width,
      this.sys.game.config.height
    );
    // Create backing image for buttons
    const optionBacking = this.add.image(centerX, centerY, "option_backing");
    optionBacking.setScale(0.9, 0.8);
    // Create a container to hold the buttons and background
    const buttonContainer = this.add.container(centerX, centerY + 50);
    const spacing = 300; // Adjust as needed
    // // Create deck selection buttons
    const deckOfSixteen = this.createDeckButton(
      -spacing,
      "deckOfSixteen",
      "deckOfSixteen-hover",
      4,
      1
    );
    const deckOfThirty = this.createDeckButton(
      0,
      "deckOfThirty",
      "deckOfThirty-hover",
      6,
      1
    );
    const deckOfFiftyTwo = this.createDeckButton(
      spacing,
      "deckOfFiftyTwo",
      "deckOfFiftyTwo-hover",
      8,
      1
    );

    // // Add buttons to the button container
    buttonContainer.add(deckOfSixteen);
    buttonContainer.add(deckOfThirty);
    buttonContainer.add(deckOfFiftyTwo);
  }
  createDeckButton(x, imageKey, hoverImageKey, cardCount, scale) {
    const deckButton = this.add.image(x, 0, imageKey);
    deckButton.setScale(scale);
    const initialY = deckButton.y;

    // Set hover state
    deckButton
      .setInteractive()
      .on("pointerover", () => {
        // Change the image to the hover state image when hovered
        deckButton.setTexture(hoverImageKey);
      })
      .on("pointerout", () => {
        // Change the image back to the normal state image when not hovered
        // deckButton.setTexture(`deckOf${cardCount}`);
        deckButton.setTexture(imageKey);
      })
      .on("pointerup", () => {
        // this.scene.start('GameScene', 4);//here we are getting number of cards
        this.scene.start("GameScene", cardCount);
        this.audioManager.playButtonClick();
      });
    this.tweens.add({
      targets: deckButton,

      y: initialY - 40, // Adjust this value for the desired bounce height
      duration: 500, // Adjust the duration as needed
      yoyo: true, // Bounce back to the initial position
      repeat: 0,
      ease: "bounce.in",
    });

    return deckButton;

    // this.tweens.add({
    //     targets: ufo2,
    //     x: 700,
    //     duration: 2000,
    //     repeat: -1,
    //     hold: 500,
    //     repeatDelay: 500,
    //     ease: 'bounce.out'
    // });

    // this.tweens.add({
    //     targets: ufo3,
    //     x: 700,
    //     duration: 2000,
    //     repeat: -1,
    //     hold: 500,
    //     repeatDelay: 500,
    //     ease: 'bounce.inout'
    // });
  }
}


/***/ }),

/***/ "./src/scenes/coinFlipAnimation.js":
/*!*****************************************!*\
  !*** ./src/scenes/coinFlipAnimation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCoinFlipAnimation: () => (/* binding */ createCoinFlipAnimation)
/* harmony export */ });

function createCoinFlipAnimation(scene, x, y, randomValue, onComplete) {
    // Create a sprite for the coin at the desired position
    const coin = scene.add.sprite(x, y, 'coinYou'); // Adjust the position as needed

    // Create an animation for the coin flip
    const flipAnimation = scene.anims.create({
        key: 'spin',
        frames: [
            { key: 'coinYou' },
            { key: 'coin2' },
            { key: 'coin3' },
            { key: 'coin4' },
            { key: 'coinAI' },
            { key: 'coin2' },
            { key: 'coin3' },
            { key: 'coin4' },
            // Add more frames as needed
        ],
        frameRate: 10, // Adjust the frame rate as needed
        repeat: -1, // Set to -1 for continuous looping
    });

    // Play the coin flip animation
    coin.play('spin');

    // Stop the animation after a certain time (e.g., 2 seconds)
    scene.time.delayedCall(2000, () => {
        coin.anims.stop('spin');
        coin.setTexture(randomValue === 'heads' ? 'coinYou' : 'coinAI');
        onComplete(randomValue);
        scene.time.delayedCall(1000, () => {
            coin.setVisible(false); // Hide the coin
        });
    });

    return coin;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_phaser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/phaser.js */ "./src/lib/phaser.js");
/* harmony import */ var _scenes_GameScene_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/GameScene.js */ "./src/scenes/GameScene.js");
/* harmony import */ var _scenes_OptionScene_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/OptionScene.js */ "./src/scenes/OptionScene.js");
/* harmony import */ var _scenes_MainMenuScene_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/MainMenuScene.js */ "./src/scenes/MainMenuScene.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new _lib_phaser_js__WEBPACK_IMPORTED_MODULE_0__["default"].Game({
  type: _lib_phaser_js__WEBPACK_IMPORTED_MODULE_0__["default"].AUTO,
  width: 1920,
  height: 1080,
  scene: [_scenes_MainMenuScene_js__WEBPACK_IMPORTED_MODULE_3__["default"], _scenes_OptionScene_js__WEBPACK_IMPORTED_MODULE_2__["default"], _scenes_GameScene_js__WEBPACK_IMPORTED_MODULE_1__["default"]],
  scale: {
    // mode: Phaser.Scale.AUTO,
    mode: _lib_phaser_js__WEBPACK_IMPORTED_MODULE_0__["default"].Scale.AUTO,
    autoCenter: _lib_phaser_js__WEBPACK_IMPORTED_MODULE_0__["default"].Scale.CENTER_BOTH,
  },
  fx: {
    glow: {
      distance: 32,
      quality: 0.1,
    },
  },
  callbacks: {
    preload: function () {
      // Initialize AudioManager in one of your scenes (e.g., MainMenuScene)
      this.scene.scenes[0].audioManager = new AudioManager(
        this.scene.scenes[0]
      );
    },
    create: function () {
      // Start playing background music or handle audio as needed
      this.scene.scenes[0].audioManager.playBackgroundMusic();
    },
  },
}));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEMsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RXNDO0FBQ3ZCLHlCQUF5QixzREFBTTtBQUM5QztBQUNBLFlBQVksbUJBQW1CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTs7QUFFQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxRQUFRO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQyxVQUFVO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsZUFBZTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxhQUFhLElBQUksSUFBSSxlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7O0FBRXpDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0Isb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7O0FBRUEsb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDamZzQztBQUMyQjtBQUN4Qjs7QUFFMUIsd0JBQXdCLHNEQUFNO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEUsa0VBQWtFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsc0RBQVU7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFJLDhFQUF1QjtBQUMzQjtBQUNBLDBCQUEwQixPQUFPO0FBQ2pDLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBLE9BQU87QUFDUDtBQUNBLDRDQUE0QztBQUM1QyxPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSxPQUFPO0FBQ1A7QUFDQSw2Q0FBNkM7QUFDN0MsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qjs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsTUFBTTtBQUN4QyxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLE1BQU07QUFDMUMsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksWUFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvWDZDOztBQUU5QjtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix3REFBWTtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF3Qyx3QkFBd0I7QUFDaEUsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDOztBQUVqQztBQUNBLGlFQUFpRTtBQUNqRTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLCtCQUErQjs7QUFFL0I7QUFDQTtBQUNBLGlDQUFpQztBQUNqQywrQkFBK0I7QUFDL0IsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDeEhzQzs7QUFFdkIsMEJBQTBCLHNEQUFNO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSwwQ0FBMEMsVUFBVTtBQUNwRDtBQUNBLE9BQU87QUFDUDtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkhPO0FBQ1A7QUFDQSxvREFBb0Q7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnQkFBZ0I7QUFDOUIsY0FBYyxjQUFjO0FBQzVCLGNBQWMsY0FBYztBQUM1QixjQUFjLGNBQWM7QUFDNUIsY0FBYyxlQUFlO0FBQzdCLGNBQWMsY0FBYztBQUM1QixjQUFjLGNBQWM7QUFDNUIsY0FBYyxjQUFjO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQyxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBOzs7Ozs7O1VDckNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOcUM7O0FBRVM7QUFDSTtBQUNJOztBQUV0RCxpRUFBZSxJQUFJLHNEQUFNO0FBQ3pCLFFBQVEsc0RBQU07QUFDZDtBQUNBO0FBQ0EsVUFBVSxnRUFBYSxFQUFFLDhEQUFXLEVBQUUsNERBQVM7QUFDL0M7QUFDQTtBQUNBLFVBQVUsc0RBQU07QUFDaEIsZ0JBQWdCLHNEQUFNO0FBQ3RCLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQyxDQUFDLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcmljX2NsYXNoLXYwLy4vc3JjL2xpYi9waGFzZXIuanMiLCJ3ZWJwYWNrOi8vY3JpY19jbGFzaC12MC8uL3NyYy9zY2VuZXMvQXVkaW9NYW5hZ2VyLmpzIiwid2VicGFjazovL2NyaWNfY2xhc2gtdjAvLi9zcmMvc2NlbmVzL0NhcmRNb2R1bGUuanMiLCJ3ZWJwYWNrOi8vY3JpY19jbGFzaC12MC8uL3NyYy9zY2VuZXMvR2FtZVNjZW5lLmpzIiwid2VicGFjazovL2NyaWNfY2xhc2gtdjAvLi9zcmMvc2NlbmVzL01haW5NZW51U2NlbmUuanMiLCJ3ZWJwYWNrOi8vY3JpY19jbGFzaC12MC8uL3NyYy9zY2VuZXMvT3B0aW9uU2NlbmUuanMiLCJ3ZWJwYWNrOi8vY3JpY19jbGFzaC12MC8uL3NyYy9zY2VuZXMvY29pbkZsaXBBbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vY3JpY19jbGFzaC12MC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jcmljX2NsYXNoLXYwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jcmljX2NsYXNoLXYwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY3JpY19jbGFzaC12MC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NyaWNfY2xhc2gtdjAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgd2luZG93LlBoYXNlciIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKHNjZW5lKSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMubXVzaWMgPSBudWxsO1xuICB9XG5cbiAgcHJlbG9hZCgpIHtcbiAgICB0aGlzLnNjZW5lLmxvYWQuYXVkaW8oXCJtdXNpY1wiLCBbXCJhc3NldHMvYXVkaW8vbXVzaWMubXAzXCJdKTtcbiAgICB0aGlzLnNjZW5lLmxvYWQuYXVkaW8oXCJidG5DbGlja1wiLCBbXCJhc3NldHMvYXVkaW8vYnRuQ2xpY2sud2F2XCJdKTtcbiAgICB0aGlzLnNjZW5lLmxvYWQuYXVkaW8oXCJwYWdlRmxpcFwiLCBbXCJhc3NldHMvYXVkaW8vcGFnZUZsaXAubXAzXCJdKTtcbiAgICB0aGlzLnNjZW5lLmxvYWQuYXVkaW8oXCJzZWxlY3RcIiwgW1wiYXNzZXRzL2F1ZGlvL2J0bkNsaWNrLndhdlwiXSk7XG4gICAgdGhpcy5zY2VuZS5sb2FkLmF1ZGlvKFwic2h1ZmZsZVwiLCBbXCJhc3NldHMvYXVkaW8vc2h1ZmZsZS53YXZcIl0pO1xuICAgIHRoaXMuc2NlbmUubG9hZC5hdWRpbyhcImN1dFwiLCBbXCJhc3NldHMvYXVkaW8vY3V0LndhdlwiXSk7XG4gICAgdGhpcy5zY2VuZS5sb2FkLmF1ZGlvKFwid2luUm91bmRcIiwgW1wiYXNzZXRzL2F1ZGlvL3dpbi5tcDNcIl0pO1xuICAgIHRoaXMuc2NlbmUubG9hZC5hdWRpbyhcImZhaWx1cmVTb3VuZFwiLCBbXCJhc3NldHMvYXVkaW8vZmFpbHVyZS5tcDNcIl0pO1xuICAgIHRoaXMuc2NlbmUubG9hZC5hdWRpbyhcImdhbWVPdmVyXCIsIFtcImFzc2V0cy9hdWRpby9nYW1lT3Zlci5tcDNcIl0pO1xuICB9XG5cbiAgY3JlYXRlKCkge1xuICAgIHRoaXMubXVzaWMgPSB0aGlzLnNjZW5lLnNvdW5kLmFkZChcIm11c2ljXCIpO1xuICAgIHRoaXMuYnRuQ2xpY2sgPSB0aGlzLnNjZW5lLnNvdW5kLmFkZChcImJ0bkNsaWNrXCIpO1xuICAgIHRoaXMucGFnZUZsaXAgPSB0aGlzLnNjZW5lLnNvdW5kLmFkZChcInBhZ2VGbGlwXCIpO1xuICAgIHRoaXMuc2VsZWN0ID0gdGhpcy5zY2VuZS5zb3VuZC5hZGQoXCJzZWxlY3RcIik7XG4gICAgdGhpcy5zaHVmZmxlID0gdGhpcy5zY2VuZS5zb3VuZC5hZGQoXCJzaHVmZmxlXCIpO1xuICAgIHRoaXMuY3V0ID0gdGhpcy5zY2VuZS5zb3VuZC5hZGQoXCJjdXRcIik7XG4gICAgdGhpcy53aW5Sb3VuZCA9IHRoaXMuc2NlbmUuc291bmQuYWRkKFwid2luUm91bmRcIik7XG4gICAgdGhpcy5mYWlsdXJlU291bmQgPSB0aGlzLnNjZW5lLnNvdW5kLmFkZChcImZhaWx1cmVTb3VuZFwiKTtcbiAgICB0aGlzLmdhbWVPdmVyID0gdGhpcy5zY2VuZS5zb3VuZC5hZGQoXCJnYW1lT3ZlclwiKTtcbiAgfVxuXG4gIHBsYXlCYWNrZ3JvdW5kTXVzaWMoKSB7XG4gICAgaWYgKHRoaXMubXVzaWMpIHtcbiAgICAgIHRoaXMubXVzaWMucGxheSh7IGxvb3A6IHRydWUgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm8gbXVzaWMgbG9hZGVkXCIpO1xuICAgIH1cbiAgfVxuICBzdG9wQmFja2dyb3VuZE11c2ljKCkge1xuICAgIHRoaXMubXVzaWMuc3RvcCgpO1xuICB9XG4gIHBsYXlCdXR0b25DbGljaygpIHtcbiAgICBpZiAodGhpcy5idG5DbGljaykge1xuICAgICAgdGhpcy5idG5DbGljay5wbGF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm8gbXVzaWMgbG9hZGVkXCIpO1xuICAgIH1cbiAgfVxuICBwbGF5UGFnZUZsaXAoKSB7XG4gICAgdGhpcy5wYWdlRmxpcC5wbGF5KCk7XG4gIH1cbiAgcGxheVNodWZmbGUoKSB7XG4gICAgdGhpcy5wYWdlRmxpcC5wbGF5KCk7XG4gIH1cbiAgcGxheUN1dCgpIHtcbiAgICB0aGlzLmN1dC5wbGF5KCk7XG4gIH1cbiAgcGxheVdpblJvdW5kKCkge1xuICAgIHRoaXMud2luUm91bmQucGxheSgpO1xuICB9XG4gIHBsYXlGYWlsdXJlUm91bmQoKSB7XG4gICAgdGhpcy5mYWlsdXJlU291bmQucGxheSgpO1xuICB9XG4gIHBsYXlTZWxlY3QoKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0KSB7XG4gICAgICB0aGlzLnNlbGVjdC5wbGF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm8gbXVzaWMgbG9hZGVkXCIpO1xuICAgIH1cbiAgfVxuICBwbGF5R2FtZU92ZXIoKSB7XG4gICAgdGhpcy5nYW1lT3Zlci5wbGF5KCk7XG4gIH1cbn1cbiIsImltcG9ydCBQaGFzZXIgZnJvbSBcIi4uL2xpYi9waGFzZXIuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmRNb2R1bGUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xuICBjb25zdHJ1Y3RvcihnYW1lU2NlbmUsIGF1ZGlvTWFuYWdlcikge1xuICAgIHN1cGVyKHsga2V5OiBcIkNhcmRNb2R1bGVcIiB9KTtcbiAgICB0aGlzLmdhbWVTY2VuZSA9IGdhbWVTY2VuZTtcbiAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSBcIlwiO1xuICAgIHRoaXMuYXVkaW9NYW5hZ2VyID0gYXVkaW9NYW5hZ2VyO1xuICAgIHRoaXMucGxheWVyWCA9IDEwO1xuICAgIHRoaXMuYWlYID0gZ2FtZVNjZW5lLnN5cy5nYW1lLmNvbmZpZy53aWR0aCAtIDEwO1xuICAgIHRoaXMucGxheWVyWDIgPSBnYW1lU2NlbmUuc3lzLmdhbWUuY29uZmlnLndpZHRoIC8gMiAtIDMwMDtcbiAgICB0aGlzLmFpWDIgPSBnYW1lU2NlbmUuc3lzLmdhbWUuY29uZmlnLndpZHRoIC8gMiArIDMwMDtcbiAgICB0aGlzLnBsYXllckRlY2tEYXRhID0gZ2FtZVNjZW5lLmNhY2hlLmpzb24uZ2V0KFwicGxheWVyX2NhcmREYXRhXCIpO1xuICAgIHRoaXMuYWlEZWNrRGF0YSA9IGdhbWVTY2VuZS5jYWNoZS5qc29uLmdldChcImFpX2NhcmREYXRhXCIpO1xuICAgIHRoaXMuYXR0cmlidXRlQnV0dG9ucyA9IFtdO1xuICAgIHRoaXMuYXR0cmlidXRlc3RhdGljcyA9IFtdO1xuICAgIHRoaXMuY2FyZEluZGV4ID0gMDtcbiAgICB0aGlzLnBsYXllckZlZWRiYWNrQXJyYXkgPSBbXTtcbiAgICB0aGlzLmFpRmVlZGJhY2tBcnJheSA9IFtdO1xuICAgIHRoaXMucGxheWVyQ2FyZCA9IG51bGw7XG4gICAgdGhpcy5haUNhcmQgPSBudWxsO1xuICAgIHRoaXMucGxheWVyQ2FyZHMgPSBbXTtcbiAgICB0aGlzLmFpQ2FyZHMgPSBbXTtcbiAgfVxuICBhc3luYyBpbml0aWFsaXplRGVja3MobnVtYmVyT2ZDYXJkcykge1xuICAgIHRoaXMuY3JlYXRlQnV0dG9uRmVlZEJhY2soKTsgLy8gSW5pdGlhbGl6ZSB0aGlzIGZpcnN0XG4gICAgdGhpcy5wbGF5ZXJDYXJkcyA9IFtdO1xuICAgIHRoaXMuYWlDYXJkcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkNhcmRzOyBpKyspIHtcbiAgICAgIGNvbnN0IHBsYXllckNhcmQgPSB7XG4gICAgICAgIGltYWdlOiB0aGlzLmdhbWVTY2VuZS5hZGQuaW1hZ2UodGhpcy5wbGF5ZXJYLCA1MDAsIFwiY2FyZEZyb250XCIpLFxuICAgICAgICBkYXRhOiB0aGlzLnBsYXllckRlY2tEYXRhW2ldLFxuICAgICAgICB0eXBlOiBcIlBsYXllciBDYXJkXCIsXG4gICAgICB9O1xuICAgICAgdGhpcy5wbGF5ZXJDYXJkcy5wdXNoKHBsYXllckNhcmQpO1xuICAgICAgdGhpcy5hdWRpb01hbmFnZXIucGxheVBhZ2VGbGlwKCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkNhcmRzOyBpKyspIHtcbiAgICAgIGNvbnN0IGFpQ2FyZCA9IHtcbiAgICAgICAgaW1hZ2U6IHRoaXMuZ2FtZVNjZW5lLmFkZC5pbWFnZSh0aGlzLmFpWCwgNTAwLCBcImNhcmRGcm9udFwiKSxcbiAgICAgICAgZGF0YTogdGhpcy5haURlY2tEYXRhW2ldLFxuICAgICAgICB0eXBlOiBcIkFJXCIsXG4gICAgICB9O1xuICAgICAgdGhpcy5haUNhcmRzLnB1c2goYWlDYXJkKTtcbiAgICB9XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRyYXdOZXh0Q2FyZHMoKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSwgMzAwKTsgLy8gVXNlIGFuaW1hdGlvbiBkdXJhdGlvbiBvciBhbiBhcHByb3ByaWF0ZSBkZWxheVxuICAgIH0pO1xuICB9XG4gIGRyYXdOZXh0Q2FyZHMoKSB7XG4gICAgdGhpcy5hdWRpb01hbmFnZXIucGxheVNodWZmbGUoKTtcbiAgICAvL3RoaXMuY3VycmVudFBsYXllciA9ICdhaSc7XG4gICAgY29uc29sZS5sb2coXCJjdXJyZW50IHBsYXllcjogXCIgKyB0aGlzLmN1cnJlbnRQbGF5ZXIpO1xuICAgIGNvbnNvbGUubG9nKFwicGxheWVyQ3JhZHNMZW5ndGggOiBcIiArIHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoKTtcbiAgICBjb25zb2xlLmxvZyhcImFpQ2FyZHNMZW5ndGggOiBcIiArIHRoaXMuYWlDYXJkcy5sZW5ndGgpO1xuXG4gICAgaWYgKHRoaXMucGxheWVyQ2FyZHMubGVuZ3RoID4gMCAmJiB0aGlzLmFpQ2FyZHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcGxheWVyQ2FyZERhdGEgPSB0aGlzLnBsYXllckNhcmRzW3RoaXMucGxheWVyQ2FyZHMubGVuZ3RoIC0gMV0uZGF0YTtcbiAgICAgIGNvbnN0IGFpQ2FyZERhdGEgPSB0aGlzLmFpQ2FyZHNbdGhpcy5haUNhcmRzLmxlbmd0aCAtIDFdLmRhdGE7XG5cbiAgICAgIC8vIERyYXcgbmV3IGNhcmRzIGFuZCBhc3NpZ24gdGhlbSB0byBwbGF5ZXJDYXJkIGFuZCBhaUNhcmRcbiAgICAgIHRoaXMucGxheWVyQ2FyZCA9IHRoaXMuZHJhd0NhcmQoXG4gICAgICAgIHRoaXMuZ2FtZVNjZW5lLFxuICAgICAgICB0aGlzLnBsYXllckNhcmRzWzBdLFxuICAgICAgICBwbGF5ZXJDYXJkRGF0YSxcbiAgICAgICAgdGhpcy5wbGF5ZXJYMlxuICAgICAgKTtcblxuICAgICAgdGhpcy5haUNhcmQgPSB0aGlzLmRyYXdDYXJkKFxuICAgICAgICB0aGlzLmdhbWVTY2VuZSxcbiAgICAgICAgdGhpcy5haUNhcmRzWzBdLFxuICAgICAgICBhaUNhcmREYXRhLFxuICAgICAgICB0aGlzLmFpWDJcbiAgICAgICk7XG5cbiAgICAgIC8vIFVwZGF0ZSBkYXRhIGFzc29jaWF0ZWQgd2l0aCBwbGF5ZXJDYXJkIGFuZCBhaUNhcmRcbiAgICAgIHRoaXMucGxheWVyQ2FyZC5jYXJkRGF0YSA9IHBsYXllckNhcmREYXRhO1xuICAgICAgdGhpcy5haUNhcmQuY2FyZERhdGEgPSBhaUNhcmREYXRhO1xuXG4gICAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IGVsZW1lbnRzIGZyb20gcGxheWVyQ2FyZHMgYW5kIGFpQ2FyZHNcbiAgICAgIHRoaXMucGxheWVyQ2FyZHMuc2hpZnQoKTtcbiAgICAgIHRoaXMuYWlDYXJkcy5zaGlmdCgpO1xuICAgICAgdGhpcy5nYW1lU2NlbmUudGltZS5kZWxheWVkQ2FsbCgxMjAwLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyXCIpIHtcbiAgICAgICAgICB0aGlzLnJldmVhbENhcmQodGhpcy5wbGF5ZXJDYXJkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJldmVhbENhcmQodGhpcy5haUNhcmQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYW1lU2NlbmUuc2hvd0dhbWVPdmVyU2NyZWVuKCk7XG4gICAgfVxuICB9XG5cbiAgZHJhd0NhcmQoc2NlbmUsIGZpcnN0Q2FyZCwgY2FyZERhdGEsIHBvc1gyKSB7XG4gICAgaWYgKGZpcnN0Q2FyZCkge1xuICAgICAgZmlyc3RDYXJkLmltYWdlLnkgLT0gMzI7XG4gICAgICB0aGlzLmF1ZGlvTWFuYWdlci5wbGF5UGFnZUZsaXAoKTtcbiAgICAgIHNjZW5lLnR3ZWVucy5hZGQoe1xuICAgICAgICB0YXJnZXRzOiBmaXJzdENhcmQuaW1hZ2UsXG4gICAgICAgIHg6IHBvc1gyLFxuICAgICAgICBzY2FsZVg6IDEuMjUsXG4gICAgICAgIHNjYWxlWTogMS4yNSxcbiAgICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge30sXG4gICAgICB9KTtcblxuICAgICAgZmlyc3RDYXJkLmNhcmREYXRhID0gY2FyZERhdGE7XG4gICAgICByZXR1cm4gZmlyc3RDYXJkO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJldmVhbENhcmQoY2FyZCkge1xuICAgIC8vIGNvbnNvbGUubG9nKGBSZXZlYWxpbmcgY2FyZDogJHtjYXJkLnR5cGV9YCk7XG4gICAgdGhpcy5hdWRpb01hbmFnZXIucGxheUN1dCgpO1xuICAgIGlmIChjYXJkLmltYWdlLnRleHR1cmUua2V5ID09PSBcImNhcmRCYWNrXCIpIHtcbiAgICAgIHRoaXMuZmxpcENhcmQoY2FyZC5pbWFnZSwgXCJjYXJkQmFja1wiLCBcImNhcmRGcm9udFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mbGlwQ2FyZChjYXJkLmltYWdlLCBcImNhcmRGcm9udFwiLCBcImNhcmRCYWNrXCIpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY3JlYXRlQXR0cmlidXRlQnV0dG9ucyhjYXJkKTtcbiAgICAgIH0sIDUwMCk7XG4gICAgICBpZiAoY2FyZCAmJiB0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyXCIpIHtcbiAgICAgICAgY2FyZC5pbWFnZS5wcmVGWC5zZXRQYWRkaW5nKDIyKTtcbiAgICAgICAgY29uc3QgZnggPSBjYXJkLmltYWdlLnByZUZYLmFkZEdsb3coKTtcblxuICAgICAgICAvLyBBZGp1c3Qgb3V0ZXJTdHJlbmd0aCBhbmQgb3RoZXIgcGFyYW1ldGVycyBhcyBuZWVkZWQgZm9yIHlvdXIgZWZmZWN0XG4gICAgICAgIGNvbnN0IGdsb3dUd2VlbiA9IHRoaXMudHdlZW5zLmFkZCh7XG4gICAgICAgICAgdGFyZ2V0czogZngsXG4gICAgICAgICAgb3V0ZXJTdHJlbmd0aDogMTAsIC8vIEFkanVzdCB0aGUgdmFsdWUgYXMgcGVyIHlvdXIgZGVzaXJlZCBnbG93IGludGVuc2l0eVxuICAgICAgICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICAgICAgICB5b3lvOiB0cnVlLFxuICAgICAgICAgIGxvb3A6IC0xLFxuICAgICAgICAgIGVhc2U6IFwic2luZS5pbm91dFwiLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXN5bmMgY3JlYXRlQXR0cmlidXRlQnV0dG9ucyhjYXJkKSB7XG4gICAgY29uc3QgYnV0dG9uU3BhY2luZ1kgPSA0MDtcbiAgICBjb25zdCBzdGFydFkgPSA0MzA7XG4gICAgY29uc3QgY3VycmVudENhcmREYXRhID0gY2FyZC5jYXJkRGF0YTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwiY3JlYXRpbmcgYXR0cmlidXRlIGJ1dHRvbnMgOiBcIiArXG4gICAgICAgIGNhcmQudHlwZSArXG4gICAgICAgIFwiY3VycmVudENhcmQuRGF0YSA6IFwiICtcbiAgICAgICAgY2FyZC5kYXRhXG4gICAgKTtcbiAgICBjb25zb2xlLmxvZyhcImN1cnJlbnRDYXJkRGF0YSA6IFwiICsgY3VycmVudENhcmREYXRhKTtcblxuICAgIGZvciAoY29uc3QgW2luZGV4LCBrZXldIG9mIE9iamVjdC5rZXlzKGN1cnJlbnRDYXJkRGF0YSkuZW50cmllcygpKSB7XG4gICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGN1cnJlbnRDYXJkRGF0YVtrZXldO1xuICAgICAgY29uc3QgYnV0dG9uWCA9IGNhcmQuaW1hZ2UueCAtIDg7XG4gICAgICBjb25zdCBidXR0b25ZID0gc3RhcnRZICsgaW5kZXggKiBidXR0b25TcGFjaW5nWTtcblxuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLmdhbWVTY2VuZS5hZGQudGV4dChcbiAgICAgICAgICBidXR0b25YIC0gODAsXG4gICAgICAgICAgYnV0dG9uWSArIDEwLFxuICAgICAgICAgIGAgJHthdHRyaWJ1dGVWYWx1ZX1gLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IFwiQXJpYWwsIHNhbnMtc2VyaWZcIixcbiAgICAgICAgICAgIGZvbnRTaXplOiBcIjMwcHhcIixcbiAgICAgICAgICAgIGNvbG9yOiBcIiM4MDAwMDBcIixcbiAgICAgICAgICAgIGZvbnRTdHlsZTogXCJib2xkXCIsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXN0YXRpY3MucHVzaCh0ZXh0KTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IDEpIHtcbiAgICAgICAgY29uc3QgcGhvdG9YID0gYnV0dG9uWDtcbiAgICAgICAgY29uc3QgcGhvdG9ZID0gYnV0dG9uWSAtIDE0MDtcbiAgICAgICAgY29uc3QgbWF4V2lkdGggPSAzNDA7XG4gICAgICAgIGNvbnN0IG1heEhlaWdodCA9IDIwMDtcbiAgICAgICAgY29uc3QgcGhvdG9JbWFnZSA9IHRoaXMuZ2FtZVNjZW5lLmFkZC5pbWFnZShwaG90b1gsIHBob3RvWSwga2V5KTtcbiAgICAgICAgcGhvdG9JbWFnZS5zZXRTY2FsZSgxLjMpO1xuICAgICAgICAvLyBjb25zdCBpbWFnZVdpZHRoID0gMjAwO1xuICAgICAgICAvLyBjb25zdCBpbWFnZUhlaWdodCA9IDIwMDtcbiAgICAgICAgLy8gcGhvdG9JbWFnZS5zZXRTY2FsZShcbiAgICAgICAgLy8gICBpbWFnZVdpZHRoIC8gcGhvdG9JbWFnZS53aWR0aCxcbiAgICAgICAgLy8gICBpbWFnZUhlaWdodCAvIHBob3RvSW1hZ2UuaGVpZ2h0XG4gICAgICAgIC8vICk7XG4gICAgICAgIHBob3RvSW1hZ2Uuc2V0T3JpZ2luKDAuNSwgMC41KTtcbiAgICAgICAgcGhvdG9JbWFnZS5zZXRJbnRlcmFjdGl2ZSgpO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXN0YXRpY3MucHVzaChwaG90b0ltYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuZ2FtZVNjZW5lLmFkZC50ZXh0KFxuICAgICAgICAgIGJ1dHRvblgsXG4gICAgICAgICAgYnV0dG9uWSxcbiAgICAgICAgICBgJHtrZXl9OiAke2F0dHJpYnV0ZVZhbHVlfWAsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZm9udEZhbWlseTogXCJBcmlhbCwgc2Fucy1zZXJpZlwiLFxuICAgICAgICAgICAgZm9udFNpemU6IFwiMjZweFwiLFxuICAgICAgICAgICAgY29sb3I6IFwiI0YwODA4MFwiLFxuICAgICAgICAgICAgZm9udFN0eWxlOiBcImJvbGRcIixcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgYnV0dG9uLnNldE9yaWdpbigwLjUsIDAuNSk7XG5cbiAgICAgICAgYnV0dG9uLm9uKFwicG9pbnRlcmRvd25cIiwgKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyXCIpIHtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRGb250U2l6ZSgyNik7XG4gICAgICAgICAgICBidXR0b24uc2V0Q29sb3IoXCIjMjI5OTU0XCIpO1xuICAgICAgICAgICAgYnV0dG9uLnNldEZvbnRTdHlsZShcImJvbGRcIik7XG4gICAgICAgICAgICBidXR0b24uc2V0RGVwdGgoMyk7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlci5wbGF5U2VsZWN0KCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYXJkU2VsZWN0aW9uKGF0dHJpYnV0ZVZhbHVlLCBpbmRleCk7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyXCIpIHtcbiAgICAgICAgICBidXR0b24uc2V0SW50ZXJhY3RpdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmF0dHJpYnV0ZUJ1dHRvbnMucHVzaChidXR0b24pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyICE9PSBcInBsYXllclwiKSB7XG4gICAgICBhd2FpdCB0aGlzLndhaXRGb3JBdHRyaWJ1dGVCdXR0b25zKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2FtZVNjZW5lLnRpbWUuZGVsYXllZENhbGwoMTIwMCwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYXV0b1NlbGVjdEF0dHJpYnV0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBhc3luYyB3YWl0Rm9yQXR0cmlidXRlQnV0dG9ucygpIHtcbiAgICAvLyBDaGVjayBpZiBhdHRyaWJ1dGVCdXR0b25zIGFyZSBhbHJlYWR5IGNyZWF0ZWRcbiAgICB3aGlsZSAodGhpcy5hdHRyaWJ1dGVCdXR0b25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gV2FpdCBmb3IgYSBzaG9ydCBkZWxheVxuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwKSk7XG4gICAgfVxuICB9XG4gIC8vIEluc2lkZSB5b3VyIENhcmRNb2R1bGUgY2xhc3NcbiAgYXN5bmMgYXV0b1NlbGVjdEF0dHJpYnV0ZSgpIHtcbiAgICB0aGlzLmF1ZGlvTWFuYWdlci5wbGF5U2VsZWN0KCk7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuYXR0cmlidXRlQnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHJhbmRvbVZhbHVlID0gTWF0aC5mbG9vcihcbiAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy5hdHRyaWJ1dGVCdXR0b25zLmxlbmd0aFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSB0aGlzLmF0dHJpYnV0ZUJ1dHRvbnNbcmFuZG9tVmFsdWVdO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWRUZXh0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VsZWN0ZWQgdGV4dCBpcyB1bmRlZmluZWQuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZWN0ZWRUZXh0LnNldEZvbnRTaXplKDMwKTtcbiAgICAgICAgc2VsZWN0ZWRUZXh0LnNldENvbG9yKFwiIzIyOTk1NFwiKTtcbiAgICAgICAgc2VsZWN0ZWRUZXh0LnNldEZvbnRTdHlsZShcImJvbGRcIik7XG4gICAgICAgIHNlbGVjdGVkVGV4dC5zZXREZXB0aCgyLjIpO1xuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gcmFuZG9tVmFsdWUgKyAyO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZUNhcmRTZWxlY3Rpb24oc2VsZWN0ZWRUZXh0LCBpbmRleCk7XG4gICAgICAgIH0sIDEyMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIGF0dHJpYnV0ZSBidXR0b25zIGF2YWlsYWJsZSBmb3Igc2VsZWN0aW9uLlwiKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGF1dG9TZWxlY3RBdHRyaWJ1dGU6XCIsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVDYXJkU2VsZWN0aW9uKGF0dHJpYnV0ZVZhbHVlLCBpbmRleCkge1xuICAgIGF3YWl0IHRoaXMucmV2ZWFsSGlkZGVuQ2FyZChpbmRleCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmV2YWx1YXRlU2VsZWN0aW9uKGF0dHJpYnV0ZVZhbHVlLCBpbmRleCk7XG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgcmV2ZWFsSGlkZGVuQ2FyZChpbmRleCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IFwicGxheWVyXCIpIHtcbiAgICAgIHRoaXMucmV2ZWFsQ2FyZCh0aGlzLmFpQ2FyZCk7XG4gICAgICB0aGlzLnRvZ2dsZUZlZWRiYWNrKGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXZlYWxDYXJkKHRoaXMucGxheWVyQ2FyZCk7XG4gICAgICB0aGlzLnRvZ2dsZUZlZWRiYWNrKGluZGV4KTtcbiAgICB9XG4gIH1cbiAgdG9nZ2xlRmVlZGJhY2soaW5kZXgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllclwiKSB7XG4gICAgICB0aGlzLmdhbWVTY2VuZS50aW1lLmRlbGF5ZWRDYWxsKDUwMCwgKCkgPT4ge1xuICAgICAgICB0aGlzLmFpRmVlZGJhY2tBcnJheVtpbmRleCAtIDJdLnNldFZpc2libGUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFpRmVlZGJhY2tBcnJheVtpbmRleCAtIDJdLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICB0aGlzLmZsaXBDYXJkKHRoaXMuYWlDYXJkLmltYWdlLCBcImNhcmRCYWNrXCIsIFwiY2FyZEZyb250XCIpO1xuICAgICAgICB0aGlzLmNsZWFyQXRyaWJ1dGVzT25DYXJkKCk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYW1lU2NlbmUudGltZS5kZWxheWVkQ2FsbCg1MDAsICgpID0+IHtcbiAgICAgICAgdGhpcy5wbGF5ZXJGZWVkYmFja0FycmF5W2luZGV4IC0gMl0uc2V0VmlzaWJsZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucGxheWVyRmVlZGJhY2tBcnJheVtpbmRleCAtIDJdLnNldFZpc2libGUoZmFsc2UpO1xuICAgICAgICB0aGlzLmZsaXBDYXJkKHRoaXMucGxheWVyQ2FyZC5pbWFnZSwgXCJjYXJkQmFja1wiLCBcImNhcmRGcm9udFwiKTtcbiAgICAgICAgdGhpcy5jbGVhckF0cmlidXRlc09uQ2FyZCgpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZXZhbHVhdGVTZWxlY3Rpb24oYXR0cmlidXRlVmFsdWUsIGluZGV4KSB7XG4gICAgdGhpcy5kaXNhYmxlQXR0cmlidXRlQnV0dG9ucygpO1xuICAgIGxldCBoaWRkZW5DYXJkQXR0cmlidXRlVmFsdWU7XG4gICAgbGV0IHdpbm5lcjtcbiAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSBcInBsYXllclwiKSB7XG4gICAgICBoaWRkZW5DYXJkQXR0cmlidXRlVmFsdWUgPVxuICAgICAgICB0aGlzLmFpRGVja0RhdGFbdGhpcy5jYXJkSW5kZXhdW1xuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYWlEZWNrRGF0YVt0aGlzLmNhcmRJbmRleF0pW2luZGV4XVxuICAgICAgICBdO1xuXG4gICAgICBpZiAoYXR0cmlidXRlVmFsdWUgPiBoaWRkZW5DYXJkQXR0cmlidXRlVmFsdWUpIHtcbiAgICAgICAgd2lubmVyID0gXCJwbGF5ZXJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbm5lciA9IFwiYWlcIjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZGVuQ2FyZEF0dHJpYnV0ZVZhbHVlID1cbiAgICAgICAgdGhpcy5wbGF5ZXJEZWNrRGF0YVt0aGlzLmNhcmRJbmRleF1bXG4gICAgICAgICAgT2JqZWN0LmtleXModGhpcy5wbGF5ZXJEZWNrRGF0YVt0aGlzLmNhcmRJbmRleF0pW2luZGV4XVxuICAgICAgICBdO1xuICAgICAgaWYgKGF0dHJpYnV0ZVZhbHVlID4gaGlkZGVuQ2FyZEF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgICAgIHdpbm5lciA9IFwiYWlcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbm5lciA9IFwicGxheWVyXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMud2luUm91bmRTZXF1ZW5jZSh3aW5uZXIpO1xuICB9XG4gIHdpblJvdW5kU2VxdWVuY2Uod2lubmVyKSB7XG4gICAgaWYgKHdpbm5lciA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgY29uc3QgcmVtb3ZlZEFJQ2FyZCA9IHRoaXMuYWlDYXJkcy5zaGlmdCgpOyAvLyBSZW1vdmUgQUkncyBmaXJzdCBjYXJkXG4gICAgICBjb25zdCByZW1vdmVkQUlDYXJkRGF0YSA9IHRoaXMuYWlEZWNrRGF0YS5zaGlmdCgpO1xuICAgICAgLy8gUmVtb3ZlIEFJJ3MgZmlyc3QgY2FyZCdzIGRhdGFcbiAgICAgIC8vIEFkZCB0aGUgcmVtb3ZlZCBBSSBjYXJkIGJhY2sgdG8gdGhlIEFJJ3MgZGVja1xuICAgICAgdGhpcy5haURlY2tEYXRhLnB1c2gocmVtb3ZlZEFJQ2FyZERhdGEpO1xuXG4gICAgICAvLyBDcmVhdGUgYSBuZXcgaW1hZ2UgZm9yIHRoZSByZW1vdmVkIEFJIGNhcmQgYW5kIGFkZCBpdCB0byB0aGUgcGxheWVyJ3MgY2FyZHMgYXJyYXlcbiAgICAgIGNvbnN0IG5ld1BsYXllckNhcmQgPSB7XG4gICAgICAgIGltYWdlOiB0aGlzLmdhbWVTY2VuZS5hZGQuaW1hZ2UodGhpcy5wbGF5ZXJYLCA1MDAsIFwiY2FyZEZyb250XCIpLFxuICAgICAgICBkYXRhOiByZW1vdmVkQUlDYXJkRGF0YSxcbiAgICAgICAgdHlwZTogXCJQbGF5ZXIgQ2FyZFwiLFxuICAgICAgfTtcbiAgICAgIHRoaXMucGxheWVyQ2FyZHMucHVzaChuZXdQbGF5ZXJDYXJkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQUkgd2lucyB0aGUgcm91bmRcbiAgICAgIGNvbnN0IHJlbW92ZWRQbGF5ZXJDYXJkID0gdGhpcy5wbGF5ZXJDYXJkcy5zaGlmdCgpOyAvLyBSZW1vdmUgcGxheWVyJ3MgZmlyc3QgY2FyZFxuICAgICAgY29uc3QgcmVtb3ZlZFBsYXllckNhcmREYXRhID0gdGhpcy5wbGF5ZXJEZWNrRGF0YS5zaGlmdCgpO1xuICAgICAgLy8gUmVtb3ZlIHBsYXllcidzIGZpcnN0IGNhcmQncyBkYXRhXG4gICAgICAvLyBBZGQgdGhlIHJlbW92ZWQgcGxheWVyIGNhcmQgYmFjayB0byB0aGUgcGxheWVyJ3MgZGVja1xuICAgICAgdGhpcy5wbGF5ZXJEZWNrRGF0YS5wdXNoKHJlbW92ZWRQbGF5ZXJDYXJkRGF0YSk7XG4gICAgICAvLyBDcmVhdGUgYSBuZXcgaW1hZ2UgZm9yIHRoZSByZW1vdmVkIHBsYXllciBjYXJkIGFuZCBhZGQgaXQgdG8gdGhlIEFJJ3MgY2FyZHMgYXJyYXlcbiAgICAgIGNvbnN0IG5ld0FJQ2FyZCA9IHtcbiAgICAgICAgaW1hZ2U6IHRoaXMuZ2FtZVNjZW5lLmFkZC5pbWFnZSh0aGlzLmFpWCwgNTAwLCBcImNhcmRGcm9udFwiKSxcbiAgICAgICAgZGF0YTogcmVtb3ZlZFBsYXllckNhcmREYXRhLFxuICAgICAgICB0eXBlOiBcIkFJIENhcmRcIixcbiAgICAgIH07XG4gICAgICB0aGlzLmFpQ2FyZHMucHVzaChuZXdBSUNhcmQpO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubW92ZUNhcmRzVG9XaW5uZXIod2lubmVyKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIGFzeW5jIG1vdmVDYXJkc1RvV2lubmVyKHdpbm5lcikge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gMTAwMDtcbiAgICBjb25zdCB6SW5kZXhUb1NldCA9IC0xO1xuICAgIHRoaXMucGxheWVyQ2FyZC5pbWFnZS5zZXRUZXh0dXJlKFwiY2FyZEZyb250XCIpO1xuICAgIHRoaXMuYWlDYXJkLmltYWdlLnNldFRleHR1cmUoXCJjYXJkRnJvbnRcIik7XG5cbiAgICBpZiAod2lubmVyID09PSBcInBsYXllclwiKSB7XG4gICAgICB0aGlzLmdhbWVTY2VuZS50d2VlbnMuYWRkKHtcbiAgICAgICAgdGFyZ2V0czogW3RoaXMucGxheWVyQ2FyZC5pbWFnZSwgdGhpcy5haUNhcmQuaW1hZ2VdLFxuICAgICAgICB4OiAtMTAwLFxuICAgICAgICBzY2FsZVg6IDAuNSxcbiAgICAgICAgc2NhbGVZOiAwLjUsXG4gICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnBsYXllckNhcmQgJiYgdGhpcy5haUNhcmQpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyQ2FyZC5pbWFnZS5zZXREZXB0aCh6SW5kZXhUb1NldCk7XG4gICAgICAgICAgICB0aGlzLmFpQ2FyZC5pbWFnZS5zZXREZXB0aCh6SW5kZXhUb1NldCk7XG5cbiAgICAgICAgICAgIHRoaXMuZ2FtZVNjZW5lLlVwZGF0ZVNjb3Jlcyh3aW5uZXIpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID0gd2lubmVyOyAvL3Nob3VsZCBub3QgYXNzaWduIGJlZm9yZVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3TmV4dENhcmRzKCk7XG4gICAgICAgICAgICB9LCAxMjAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYW1lU2NlbmUudHdlZW5zLmFkZCh7XG4gICAgICAgIHRhcmdldHM6IFt0aGlzLnBsYXllckNhcmQuaW1hZ2UsIHRoaXMuYWlDYXJkLmltYWdlXSxcbiAgICAgICAgeDogdGhpcy5haVggKyAyMDAsXG4gICAgICAgIHNjYWxlWDogMC41LFxuICAgICAgICBzY2FsZVk6IDAuNSxcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucGxheWVyQ2FyZCAmJiB0aGlzLmFpQ2FyZCkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJDYXJkLmltYWdlLnNldERlcHRoKHpJbmRleFRvU2V0KTtcbiAgICAgICAgICAgIHRoaXMuYWlDYXJkLmltYWdlLnNldERlcHRoKHpJbmRleFRvU2V0KTtcblxuICAgICAgICAgICAgdGhpcy5nYW1lU2NlbmUuVXBkYXRlU2NvcmVzKHdpbm5lcik7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB3aW5uZXI7IC8vc2hvdWxkIG5vdCBhc3NpZ24gYmVmb3JlXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3TmV4dENhcmRzKCk7XG4gICAgICAgICAgICB9LCAxMjAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgZGlzYWJsZUF0dHJpYnV0ZUJ1dHRvbnMoKSB7XG4gICAgZm9yIChjb25zdCBidXR0b24gb2YgdGhpcy5hdHRyaWJ1dGVCdXR0b25zKSB7XG4gICAgICBidXR0b24uc2V0SW50ZXJhY3RpdmUoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUJ1dHRvbkZlZWRCYWNrKCkge1xuICAgIGNvbnN0IGJ1dHRvblNwYWNpbmdZID0gNDA7XG4gICAgY29uc3QgZmVlZGJhY2tTaXplID0ge1xuICAgICAgd2lkdGg6IDMwMCxcbiAgICAgIGhlaWdodDogMzAsXG4gICAgfTtcbiAgICBjb25zdCBmZWVkYmFja0NvbG9yID0gMHgyMjk5NTQ7XG4gICAgY29uc3QgekluZGV4VG9TZXQgPSAxLjU7IC8vIFNldCB0aGUgZGVwdGggdmFsdWUgaGVyZVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpID0gaSArIDEpIHtcbiAgICAgIGNvbnN0IGJ1dHRvblkgPSA1MDAgKyBpICogYnV0dG9uU3BhY2luZ1k7XG4gICAgICBjb25zdCBidXR0b25YID0gdGhpcy5wbGF5ZXJYMiAtIDE1MDtcbiAgICAgIGNvbnN0IHBsYXllckZlZWRiYWNrID0gdGhpcy5nYW1lU2NlbmUuYWRkLmdyYXBoaWNzKCk7XG4gICAgICBwbGF5ZXJGZWVkYmFjay5maWxsU3R5bGUoZmVlZGJhY2tDb2xvcik7XG4gICAgICBwbGF5ZXJGZWVkYmFjay5maWxsUmVjdChcbiAgICAgICAgYnV0dG9uWCxcbiAgICAgICAgYnV0dG9uWSxcbiAgICAgICAgZmVlZGJhY2tTaXplLndpZHRoLFxuICAgICAgICBmZWVkYmFja1NpemUuaGVpZ2h0XG4gICAgICApO1xuICAgICAgcGxheWVyRmVlZGJhY2suYWxwaGEgPSAwLjQ7XG4gICAgICBwbGF5ZXJGZWVkYmFjay5zZXRWaXNpYmxlKGZhbHNlKTtcbiAgICAgIHBsYXllckZlZWRiYWNrLnNldERlcHRoKHpJbmRleFRvU2V0KTsgLy8gU2V0IHRoZSBkZXB0aFxuICAgICAgdGhpcy5wbGF5ZXJGZWVkYmFja0FycmF5LnB1c2gocGxheWVyRmVlZGJhY2spO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSA9IGkgKyAxKSB7XG4gICAgICBjb25zdCBidXR0b25ZID0gNTAwICsgaSAqIGJ1dHRvblNwYWNpbmdZO1xuICAgICAgY29uc3QgYnV0dG9uWCA9IHRoaXMuYWlYMiAtIDE1MDtcbiAgICAgIGNvbnN0IGFpRmVlZGJhY2sgPSB0aGlzLmdhbWVTY2VuZS5hZGQuZ3JhcGhpY3MoKTtcbiAgICAgIGFpRmVlZGJhY2suZmlsbFN0eWxlKGZlZWRiYWNrQ29sb3IpO1xuICAgICAgYWlGZWVkYmFjay5maWxsUmVjdChcbiAgICAgICAgYnV0dG9uWCxcbiAgICAgICAgYnV0dG9uWSxcbiAgICAgICAgZmVlZGJhY2tTaXplLndpZHRoLFxuICAgICAgICBmZWVkYmFja1NpemUuaGVpZ2h0XG4gICAgICApO1xuICAgICAgYWlGZWVkYmFjay5hbHBoYSA9IDAuNDtcbiAgICAgIGFpRmVlZGJhY2suc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgICBhaUZlZWRiYWNrLnNldERlcHRoKHpJbmRleFRvU2V0KTsgLy8gU2V0IHRoZSBkZXB0aFxuICAgICAgdGhpcy5haUZlZWRiYWNrQXJyYXkucHVzaChhaUZlZWRiYWNrKTtcbiAgICB9XG4gIH1cbiAgY2xlYXJBdHJpYnV0ZXNPbkNhcmQoKSB7XG4gICAgZm9yIChjb25zdCBidXR0b24gb2YgdGhpcy5hdHRyaWJ1dGVCdXR0b25zKSB7XG4gICAgICBidXR0b24uZGVzdHJveSgpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5hdHRyaWJ1dGVzdGF0aWNzKSB7XG4gICAgICBpdGVtLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5hdHRyaWJ1dGVzdGF0aWNzID0gW107XG4gICAgdGhpcy5hdHRyaWJ1dGVCdXR0b25zID0gW107XG4gIH1cbiAgZmxpcENhcmQoY2FyZEltYWdlLCBmcm9tVGV4dHVyZSwgdG9UZXh0dXJlKSB7XG4gICAgY29uc3QgZmxpcER1cmF0aW9uID0gMjUwO1xuICAgIGNhcmRJbWFnZS5zY2FsZVggPSAtMTtcblxuICAgIHRoaXMuZ2FtZVNjZW5lLnR3ZWVucy5hZGQoe1xuICAgICAgdGFyZ2V0czogY2FyZEltYWdlLFxuICAgICAgc2NhbGVYOiAxLFxuICAgICAgZHVyYXRpb246IGZsaXBEdXJhdGlvbixcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgY2FyZEltYWdlLnNldFRleHR1cmUodG9UZXh0dXJlKTtcblxuICAgICAgICB0aGlzLmdhbWVTY2VuZS50d2VlbnMuYWRkKHtcbiAgICAgICAgICB0YXJnZXRzOiBjYXJkSW1hZ2UsXG4gICAgICAgICAgc2NhbGVYOiAxLjI1LFxuICAgICAgICAgIGR1cmF0aW9uOiBmbGlwRHVyYXRpb24sXG4gICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGNvbXBsZXRlIGNhbGxiYWNrXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgUGhhc2VyIGZyb20gXCIuLi9saWIvcGhhc2VyLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVDb2luRmxpcEFuaW1hdGlvbiB9IGZyb20gXCIuL2NvaW5GbGlwQW5pbWF0aW9uLmpzXCI7XG5pbXBvcnQgQ2FyZE1vZHVsZSBmcm9tIFwiLi9DYXJkTW9kdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFBoYXNlci5TY2VuZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFwiR2FtZVNjZW5lXCIpO1xuICAgIHRoaXMuYXVkaW9NYW5hZ2VyID0gbnVsbDtcbiAgICB0aGlzLndpbm5lckltYWdlID0gbnVsbDtcbiAgICB0aGlzLmZhaWx1cmVJbWFnZSA9IG51bGw7XG4gICAgdGhpcy5nYW1lT3ZlckltYWdlID0gbnVsbDtcbiAgICB0aGlzLnNjb3JlcyA9IDA7XG4gICAgdGhpcy5zY29yZVRleHQgPSBudWxsO1xuICAgIHRoaXMucGxheWVyQ2FyZHNDb3VudCA9IDA7XG4gICAgdGhpcy5wbGF5ZXJDYXJkc0NvdW50VGV4dCA9IG51bGw7XG4gICAgdGhpcy5haUNhcmRzQ291bnQgPSAwO1xuICAgIHRoaXMuYWlDYXJkc0NvdW50VGV4dCA9IG51bGw7XG4gICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xuICAgIHRoaXMubmV3U2NvcmUgPSAwO1xuICAgIHRoaXMubnVtYmVyT2ZDYXJkc0luRGVja3MgPSAwO1xuICB9XG4gIGluaXQoZGF0YSkge1xuICAgIHRoaXMubnVtYmVyT2ZDYXJkc0luRGVja3MgPSBkYXRhO1xuICAgIGNvbnNvbGUubG9nKFwiY2FyZHMgdG8gZGVhbHQ6IFwiICsgdGhpcy5udW1iZXJPZkNhcmRzSW5EZWNrcyk7XG4gICAgdGhpcy5hdWRpb01hbmFnZXIgPSB0aGlzLnNjZW5lLmdldChcIk1haW5NZW51U2NlbmVcIikuYXVkaW9NYW5hZ2VyO1xuICB9XG5cbiAgcHJlbG9hZCgpIHtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJnYW1lLWJhY2tncm91bmRcIiwgXCJhc3NldHMvaW1nL2h1ZC9nYW1lLWJnLmpwZ1wiKTtcbiAgICAvL2NvaW4gdG9zcyBhbmltYXRpb25cbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJjb2luWW91XCIsIFwiYXNzZXRzL2ltZy9GbGlwX2NvaW4vZ29sZF91LnBuZ1wiKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJjb2luMlwiLCBcImFzc2V0cy9pbWcvRmxpcF9jb2luL2dvbGRfMi5wbmdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwiY29pbjNcIiwgXCJhc3NldHMvaW1nL0ZsaXBfY29pbi9nb2xkXzMucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcImNvaW40XCIsIFwiYXNzZXRzL2ltZy9GbGlwX2NvaW4vZ29sZF80LnBuZ1wiKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJjb2luQUlcIiwgXCJhc3NldHMvaW1nL0ZsaXBfY29pbi9nb2xkX0FJLnBuZ1wiKTtcbiAgICAvLyBMb2FkIGNhcmQgaW1hZ2VzXG4gICAgdGhpcy5sb2FkLmltYWdlKFwiY2FyZEZyb250XCIsIFwiYXNzZXRzL2ltZy9jYXJkcy9jYXJkRnJvbnQucG5nXCIpOyAvLyBGcm9udCBpbWFnZVxuICAgIHRoaXMubG9hZC5pbWFnZShcImNhcmRCYWNrXCIsIFwiYXNzZXRzL2ltZy9jYXJkcy9jYXJkQmFjay5wbmdcIik7IC8vIEJhY2sgaW1hZ2VcbiAgICAvL2xvYWQgY2FyZGRhdGEgZnJvbSBqc29uc1xuICAgIHRoaXMubG9hZC5qc29uKFwicGxheWVyX2NhcmREYXRhXCIsIFwiYXNzZXRzL2pzb24vcGxheWVyX2NhcmREYXRhLmpzb25cIik7XG4gICAgdGhpcy5sb2FkLmpzb24oXCJhaV9jYXJkRGF0YVwiLCBcImFzc2V0cy9qc29uL2FpX2NhcmREYXRhLmpzb25cIik7XG4gICAgLy9sb2FkIGh1ZCBpbWFnZXNcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJ5b3VyQ2FyZHNcIiwgXCJhc3NldHMvaW1nL2h1ZC95b3VyQ2FyZHMucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcIm9wcG9uZW50c0NhcmRzXCIsIFwiYXNzZXRzL2ltZy9odWQvb3Bwb25lbnRzQ2FyZHMucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcImFpQXZhdGFyXCIsIFwiYXNzZXRzL2ltZy9odWQvYWlBdmF0YXIucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcInBsYXllckF2YXRhclwiLCBcImFzc2V0cy9pbWcvaHVkL3BsYXllckF2YXRhci5wbmdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwic2NvcmVCb2FyZFwiLCBcImFzc2V0cy9pbWcvaHVkL3Njb3JlQm9hcmQucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcIm11c2ljLW9uXCIsIFwiYXNzZXRzL2ltZy9odWQvbXVzaWNPbi5wbmdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwibXVzaWMtb2ZmXCIsIFwiYXNzZXRzL2ltZy9odWQvbXVzaWNPZmYucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcInlvdVdvblwiLCBcImFzc2V0cy9pbWcvaHVkL3lvdVdvbi5wbmdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwieW91TG9zdFwiLCBcImFzc2V0cy9pbWcvaHVkL3lvdUxvc3QucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcImdhbWVPdmVySW1hZ2VcIiwgXCJhc3NldHMvaW1nL2h1ZC9nYW1lT3Zlcl9iZy5wbmdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwibWVudVwiLCBcImFzc2V0cy9pbWcvaHVkL21lbnUucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcInJldHJ5XCIsIFwiYXNzZXRzL2ltZy9odWQvcmVzdGFydC5wbmdcIik7XG4gICAgLy9sb2FkaW5nIGNyaWNrZXQgcGxheWVycyBwaG90b3NcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJWaXJhdCBLb2hsaVwiLCBcImFzc2V0cy9pbWcvUGxheWVyX3Bob3Rvcy9WaXJhdC1rb2hsaS5wbmdcIik7XG5cbiAgICB0aGlzLmxvYWQuaW1hZ2UoXG4gICAgICBcIkthbmUgV2lsbGlhbXNvblwiLFxuICAgICAgXCJhc3NldHMvaW1nL1BsYXllcl9waG90b3Mva2FuZV93aWxsaWFtc29uLnBuZ1wiXG4gICAgKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJKb2UgUm9vdFwiLCBcImFzc2V0cy9pbWcvUGxheWVyX3Bob3Rvcy9Sb2hpdF9zaGFybWEucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcIkJhYmFyIEF6YW1cIiwgXCJhc3NldHMvaW1nL1BsYXllcl9waG90b3MvQmFiYXJfYXphbS5wbmdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFxuICAgICAgXCJEYXdpZCB3YXJuZXJcIixcbiAgICAgIFwiYXNzZXRzL2ltZy9QbGF5ZXJfcGhvdG9zL2Rhd2lkX3dhcm5lci5wbmdcIlxuICAgICk7XG4gICAgdGhpcy5sb2FkLmltYWdlKFxuICAgICAgXCJHb3V0YW0gZ2hhbWJpclwiLFxuICAgICAgXCJhc3NldHMvaW1nL1BsYXllcl9waG90b3MvR291dGFtX2doYW1iaXIucG5nXCJcbiAgICApO1xuICAgIHRoaXMubG9hZC5pbWFnZShcIkhhcmJhamFuXCIsIFwiYXNzZXRzL2ltZy9QbGF5ZXJfcGhvdG9zL0hhcmJhamFuLnBuZ1wiKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXG4gICAgICBcIkthZ2lzby1SYWJhZGFcIixcbiAgICAgIFwiYXNzZXRzL2ltZy9QbGF5ZXJfcGhvdG9zL0thZ2lzby1SYWJhZGEucG5nXCJcbiAgICApO1xuICAgIHRoaXMubG9hZC5pbWFnZShcIk1zRGhvbmlcIiwgXCJhc3NldHMvaW1nL1BsYXllcl9waG90b3MvTXNEaG9uaS5wbmdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFxuICAgICAgXCJSYXZpbmRyYV9qYWRlamFcIixcbiAgICAgIFwiYXNzZXRzL2ltZy9QbGF5ZXJfcGhvdG9zL1JhdmluZHJhX2phZGVqYS5wbmdcIlxuICAgICk7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwic2FjaGluXCIsIFwiYXNzZXRzL2ltZy9QbGF5ZXJfcGhvdG9zL3NhY2hpbi5wbmdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFxuICAgICAgXCJ2ZXJhbmRlcl9zYXdhZ1wiLFxuICAgICAgXCJhc3NldHMvaW1nL1BsYXllcl9waG90b3MvdmVyYW5kZXJfc2F3YWcucG5nXCJcbiAgICApO1xuICAgIHRoaXMubG9hZC5pbWFnZShcbiAgICAgIFwiU3RldmUgU21pdGhcIixcbiAgICAgIFwiYXNzZXRzL2ltZy9QbGF5ZXJfcGhvdG9zL2thbmVfd2lsbGlhbXNvbi5wbmdcIlxuICAgICk7XG4gIH1cbiAgY3JlYXRlKCkge1xuICAgIHRoaXMuYXVkaW9NYW5hZ2VyLnBsYXlCYWNrZ3JvdW5kTXVzaWMoKTtcblxuICAgIC8vIFBhc3MgYXVkaW9NYW5hZ2VyIHRvIHRoZSBDYXJkTW9kdWxlXG4gICAgdGhpcy5jYXJkTW9kdWxlID0gbmV3IENhcmRNb2R1bGUodGhpcywgdGhpcy5hdWRpb01hbmFnZXIpO1xuXG4gICAgLy8gQXBwbHkgdGhlIHBvc3QtcHJvY2Vzc2luZyBlZmZlY3QgdG8gdGhlIHNjZW5lXG4gICAgdGhpcy5jYW1lcmFzLm1haW4uc2V0UG9zdFBpcGVsaW5lKFwiR2xvd1wiKTtcbiAgICB0aGlzLnBsYXllckNhcmRzQ291bnQgPSB0aGlzLm51bWJlck9mQ2FyZHNJbkRlY2tzO1xuICAgIHRoaXMuYWlDYXJkc0NvdW50ID0gdGhpcy5udW1iZXJPZkNhcmRzSW5EZWNrcztcblxuICAgIGNvbnN0IGNlbnRlclggPSB0aGlzLnN5cy5nYW1lLmNvbmZpZy53aWR0aCAvIDI7XG4gICAgY29uc3QgY2VudGVyWSA9IHRoaXMuc3lzLmdhbWUuY29uZmlnLmhlaWdodCAvIDI7XG4gICAgY29uc3QgZ2FtZUJnID0gdGhpcy5hZGQuaW1hZ2UoMCwgMCwgXCJnYW1lLWJhY2tncm91bmRcIikuc2V0T3JpZ2luKDApO1xuICAgIC8vIGNvbnN0IGJsdXJGaWx0ZXIgPSB0aGlzLmFkZC5maWx0ZXIoJ0JsdXInKTtcbiAgICAvLyBnYW1lQmcuc2V0UG9zdFBpcGVsaW5lKGJsdXJGaWx0ZXIpO1xuICAgIC8vIGJsdXJGaWx0ZXIuc2V0Qmx1cigxMCk7XG5cbiAgICBjb25zdCByYW5kb21WYWx1ZSA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcImFpXCIgOiBcInBsYXllclwiO1xuXG4gICAgY3JlYXRlQ29pbkZsaXBBbmltYXRpb24odGhpcywgY2VudGVyWCwgY2VudGVyWSwgcmFuZG9tVmFsdWUsIChyZXN1bHQpID0+IHtcbiAgICAgIHRoaXMudGltZS5kZWxheWVkQ2FsbCgxMDAwLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhcnRHYW1lKGAke3Jlc3VsdH1gKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhcnRHYW1lKGluaXRpYWxQbGF5ZXIpIHtcbiAgICB0aGlzLmNhcmRNb2R1bGUuY3VycmVudFBsYXllciA9IGluaXRpYWxQbGF5ZXI7XG5cbiAgICB0aGlzLmNhcmRNb2R1bGUuaW5pdGlhbGl6ZURlY2tzKHRoaXMubnVtYmVyT2ZDYXJkc0luRGVja3MsIGluaXRpYWxQbGF5ZXIpO1xuICAgIHRoaXMuc2hvd0h1ZCgpO1xuICB9XG5cbiAgVXBkYXRlU2NvcmVzKHdpbm5lcikge1xuICAgIGNvbnNvbGUubG9nKFwid2lubmVyIGlzOiBcIiArIHdpbm5lcik7XG4gICAgaWYgKHdpbm5lciA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgdGhpcy5zY29yZXMgKz0gMTAwO1xuICAgICAgdGhpcy50aW1lLmRlbGF5ZWRDYWxsKDEwMCwgKCkgPT4ge1xuICAgICAgICB0aGlzLndpbm5lckltYWdlLnNldFZpc2libGUodHJ1ZSk7IC8vIEhpZGUgdGhlIGltYWdlXG4gICAgICAgIHRoaXMuYXVkaW9NYW5hZ2VyLnBsYXlXaW5Sb3VuZCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnRpbWUuZGVsYXllZENhbGwoMTAwMCwgKCkgPT4ge1xuICAgICAgICB0aGlzLndpbm5lckltYWdlLnNldFZpc2libGUoZmFsc2UpOyAvLyBIaWRlIHRoZSBpbWFnZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2NvcmVzIC09IDEwMDtcbiAgICAgIHRoaXMudGltZS5kZWxheWVkQ2FsbCgxMDAsICgpID0+IHtcbiAgICAgICAgdGhpcy5mYWlsdXJlSW1hZ2Uuc2V0VmlzaWJsZSh0cnVlKTsgLy8gSGlkZSB0aGUgaW1hZ2VcbiAgICAgICAgdGhpcy5hdWRpb01hbmFnZXIucGxheUZhaWx1cmVSb3VuZCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnRpbWUuZGVsYXllZENhbGwoMTAwMCwgKCkgPT4ge1xuICAgICAgICB0aGlzLmZhaWx1cmVJbWFnZS5zZXRWaXNpYmxlKGZhbHNlKTsgLy8gSGlkZSB0aGUgaW1hZ2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRTY29yZSA9IHRoaXMubmV3U2NvcmU7XG4gICAgdGhpcy5uZXdTY29yZSA9IHRoaXMuc2NvcmVzO1xuICAgIHRoaXMuc2NvcmVUZXh0LnNldFRleHQodGhpcy5zY29yZXMpO1xuXG4gICAgdGhpcy5haUNhcmRzQ291bnRUZXh0LnNldFRleHQodGhpcy5jYXJkTW9kdWxlLmFpQ2FyZHMubGVuZ3RoKTtcbiAgICB0aGlzLnBsYXllckNhcmRzQ291bnRUZXh0LnNldFRleHQodGhpcy5jYXJkTW9kdWxlLnBsYXllckNhcmRzLmxlbmd0aCk7XG4gIH1cblxuICBzaG93SHVkKCkge1xuICAgIHRoaXMud2lubmVySW1hZ2UgPSB0aGlzLmFkZFxuICAgICAgLmltYWdlKFxuICAgICAgICB0aGlzLnN5cy5nYW1lLmNvbmZpZy53aWR0aCAvIDIsXG4gICAgICAgIHRoaXMuc3lzLmdhbWUuY29uZmlnLmhlaWdodCAvIDIsXG4gICAgICAgIFwieW91V29uXCJcbiAgICAgIClcbiAgICAgIC5zZXRPcmlnaW4oMC41LCAwLjUpXG4gICAgICAuc2V0VmlzaWJsZShmYWxzZSlcbiAgICAgIC5zZXREZXB0aCgxKTsgLy8gU2V0IHRoZSBzYW1lIGhpZ2ggZGVwdGggdmFsdWUsIGUuZy4sIDE7XG5cbiAgICB0aGlzLmZhaWx1cmVJbWFnZSA9IHRoaXMuYWRkXG4gICAgICAuaW1hZ2UoXG4gICAgICAgIHRoaXMuc3lzLmdhbWUuY29uZmlnLndpZHRoIC8gMixcbiAgICAgICAgdGhpcy5zeXMuZ2FtZS5jb25maWcuaGVpZ2h0IC8gMixcbiAgICAgICAgXCJ5b3VMb3N0XCJcbiAgICAgIClcbiAgICAgIC5zZXRPcmlnaW4oMC41LCAwLjUpXG4gICAgICAuc2V0VmlzaWJsZShmYWxzZSlcbiAgICAgIC5zZXREZXB0aCgxKTsgLy8gU2V0IHRoZSBzYW1lIGhpZ2ggZGVwdGggdmFsdWUsIGUuZy4sIDE7XG4gICAgY29uc3QgcGxheWVyQ2FyZHNDb3VudEJHID0gdGhpcy5hZGRcbiAgICAgIC5pbWFnZSgyMCwgdGhpcy5zeXMuZ2FtZS5jb25maWcuaGVpZ2h0IC0gMjAsIFwieW91ckNhcmRzXCIpXG4gICAgICAuc2V0U2NhbGUoMS4yKVxuICAgICAgLnNldE9yaWdpbigwLCAxKTtcbiAgICB0aGlzLnBsYXllckNhcmRzQ291bnRUZXh0ID0gdGhpcy5hZGQudGV4dChcbiAgICAgIHBsYXllckNhcmRzQ291bnRCRy53aWR0aCAtIDEwLCAvLyBBZGp1c3QgdGhlIHggcG9zaXRpb24gYXMgbmVlZGVkXG4gICAgICBwbGF5ZXJDYXJkc0NvdW50QkcueSAtIDg1LCAvLyBBZGp1c3QgdGhlIHkgcG9zaXRpb24gYXMgbmVlZGVkXG4gICAgICB0aGlzLnBsYXllckNhcmRzQ291bnQsXG4gICAgICB7XG4gICAgICAgIGZvbnRGYW1pbHk6IFwiZ3JvYm9sZFwiLFxuICAgICAgICBmb250U2l6ZTogXCI1MHB4XCIsXG4gICAgICAgIGZvbnRTdHlsZTogXCJib2xkXCIsXG4gICAgICAgIGZpbGw6IFwiI2ZmZmZmZlwiLCAvLyBTZXQgdGhlIHRleHQgY29sb3JcbiAgICAgIH1cbiAgICApO1xuICAgIHRoaXMucGxheWVyQ2FyZHNDb3VudFRleHQuc2V0T3JpZ2luKDAsIDApO1xuICAgIHRoaXMuYWRkLmV4aXN0aW5nKHRoaXMucGxheWVyQ2FyZHNDb3VudFRleHQpO1xuXG4gICAgY29uc3QgYWlDYXJkc0NvdW50QkcgPSB0aGlzLmFkZFxuICAgICAgLmltYWdlKFxuICAgICAgICB0aGlzLnN5cy5nYW1lLmNvbmZpZy53aWR0aCAtIDIwLFxuICAgICAgICB0aGlzLnN5cy5nYW1lLmNvbmZpZy5oZWlnaHQgLSAyMCxcbiAgICAgICAgXCJvcHBvbmVudHNDYXJkc1wiXG4gICAgICApXG4gICAgICAuc2V0U2NhbGUoMS4yKVxuICAgICAgLnNldE9yaWdpbigxLCAxKTtcbiAgICBjb25zdCBhaUF2YXRhciA9IHRoaXMuYWRkLmltYWdlKFxuICAgICAgYWlDYXJkc0NvdW50QkcueCAtIDYwLFxuICAgICAgYWlDYXJkc0NvdW50QkcueSAtIDYwLFxuICAgICAgXCJhaUF2YXRhclwiXG4gICAgKTtcbiAgICBjb25zdCBwbGF5ZXJBdmF0YXIgPSB0aGlzLmFkZC5pbWFnZShcbiAgICAgIHBsYXllckNhcmRzQ291bnRCRy54ICsgNjAsXG4gICAgICBwbGF5ZXJDYXJkc0NvdW50QkcueSAtIDYwLFxuICAgICAgXCJwbGF5ZXJBdmF0YXJcIlxuICAgICk7XG5cbiAgICB0aGlzLmFpQ2FyZHNDb3VudFRleHQgPSB0aGlzLmFkZC50ZXh0KFxuICAgICAgYWlDYXJkc0NvdW50QkcueCAtIDQ5MCwgLy8gQWRqdXN0IHRoZSB4IHBvc2l0aW9uIGFzIG5lZWRlZFxuICAgICAgYWlDYXJkc0NvdW50QkcueSAtIDU1LCAvLyBBZGp1c3QgdGhlIHkgcG9zaXRpb24gYXMgbmVlZGVkXG4gICAgICB0aGlzLmFpQ2FyZHNDb3VudCxcbiAgICAgIHtcbiAgICAgICAgZm9udEZhbWlseTogXCJncm9ib2xkXCIsXG4gICAgICAgIGZvbnRTaXplOiBcIjUwcHhcIixcbiAgICAgICAgZm9udFN0eWxlOiBcImJvbGRcIixcbiAgICAgICAgZmlsbDogXCIjZmZmZmZmXCIsIC8vIFNldCB0aGUgdGV4dCBjb2xvclxuICAgICAgfVxuICAgICk7XG4gICAgdGhpcy5haUNhcmRzQ291bnRUZXh0LnNldE9yaWdpbigwLjUsIDAuNSk7XG4gICAgdGhpcy5hZGQuZXhpc3RpbmcodGhpcy5haUNhcmRzQ291bnRUZXh0KTtcbiAgICB0aGlzLmFkZFxuICAgICAgLmltYWdlKHRoaXMuc3lzLmdhbWUuY29uZmlnLndpZHRoIC0gODAsIDcwLCBcIm11c2ljLW9mZlwiKVxuICAgICAgLnNldFNjYWxlKDAuMTUpXG4gICAgICAuc2V0T3JpZ2luKDAuNSwgMC41KTtcbiAgICBsZXQgdG9nZ2xlID0gZmFsc2U7IC8vIERlY2xhcmUgdG9nZ2xlIGFzIGEgdmFyaWFibGVcblxuICAgIGNvbnN0IE11c2ljVG9nZ2xlID0gdGhpcy5hZGRcbiAgICAgIC5pbWFnZSh0aGlzLnN5cy5nYW1lLmNvbmZpZy53aWR0aCAtIDgwLCA3MCwgXCJtdXNpYy1vblwiKVxuICAgICAgLnNldFNjYWxlKDAuMTUpXG4gICAgICAuc2V0T3JpZ2luKDAuNSwgMC41KTtcblxuICAgIE11c2ljVG9nZ2xlLm9uKFwicG9pbnRlcmRvd25cIiwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJCdXR0b24gY2xpY2tlZCFcIik7IC8vIEFkZCB0aGlzIGxpbmUgZm9yIGRlYnVnZ2luZ1xuICAgICAgdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICAgIGlmICh0b2dnbGUpIHtcbiAgICAgICAgdGhpcy5hdWRpb01hbmFnZXIucGxheUJhY2tncm91bmRNdXNpYygpO1xuICAgICAgICBNdXNpY1RvZ2dsZS5zZXRUZXh0dXJlKFwibXVzaWMtb25cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlci5zdG9wQmFja2dyb3VuZE11c2ljKCk7XG4gICAgICAgIE11c2ljVG9nZ2xlLnNldFRleHR1cmUoXCJtdXNpYy1vZmZcIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNdXNpY1RvZ2dsZS5zZXRJbnRlcmFjdGl2ZSgpO1xuXG4gICAgLy91cGRhdGluZyBzY29yZWJvYXJkXG4gICAgY29uc3Qgc2NvcmVCb2FyZCA9IHRoaXMuYWRkXG4gICAgICAuaW1hZ2UoMjAsIDIwLCBcInNjb3JlQm9hcmRcIilcbiAgICAgIC5zZXRTY2FsZSgwLjEsIDAuMTUpXG4gICAgICAuc2V0T3JpZ2luKDAsIDApO1xuICAgIHRoaXMuc2NvcmVUZXh0ID0gdGhpcy5hZGQudGV4dChcbiAgICAgIHNjb3JlQm9hcmQueCArIDIwMCwgLy8gQWRqdXN0IHRoZSB4IHBvc2l0aW9uIGFzIG5lZWRlZFxuICAgICAgc2NvcmVCb2FyZC55ICsgMTAsIC8vIEFkanVzdCB0aGUgeSBwb3NpdGlvbiBhcyBuZWVkZWRcbiAgICAgIHRoaXMuc2NvcmVzLFxuICAgICAge1xuICAgICAgICBmb250RmFtaWx5OiBcImdyb2JvbGRcIixcbiAgICAgICAgZm9udFNpemU6IFwiNDBweFwiLFxuICAgICAgICBmb250U3R5bGU6IFwiYm9sZFwiLFxuICAgICAgICBmaWxsOiBcIiNmZmZmZmZcIiwgLy8gU2V0IHRoZSB0ZXh0IGNvbG9yXG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMuc2NvcmVUZXh0LnNldE9yaWdpbigwLCAwKTtcbiAgICB0aGlzLmFkZC5leGlzdGluZyh0aGlzLnNjb3JlVGV4dCk7XG4gICAgdGhpcy5VcGRhdGVTY29yZU51bWJlcnModGhpcy5jdXJyZW50U2NvcmUsIHRoaXMubmV3U2NvcmUpO1xuICB9XG4gIFVwZGF0ZVNjb3JlTnVtYmVycyhjdXJyZW50U2NvcmUsIG5ld1Njb3JlKSB7XG4gICAgbGV0IHVwZGF0ZVR3ZWVuID0gdGhpcy50d2VlbnMuYWRkQ291bnRlcih7XG4gICAgICBmcm9tOiBjdXJyZW50U2NvcmUsXG4gICAgICB0bzogbmV3U2NvcmUsXG4gICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgIGVhc2U6IFwibGluZWFyXCIsXG4gICAgICBvblVwZGF0ZTogKHR3ZWVuKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gTWF0aC5yb3VuZCh0d2Vlbi5nZXRWYWx1ZSgpKTtcbiAgICAgICAgdGhpcy5zY29yZVRleHQuc2V0VGV4dChgJHt2YWx1ZX1gKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgaWYgKHVwZGF0ZVR3ZWVuLmlzUGxheWluZygpKSB7XG4gICAgICAvLyAgVGhlIHR3ZWVuIGlzIGFscmVhZHkgcnVubmluZywgc28gd2UnbGwgdXBkYXRlIHRoZSBlbmQgdmFsdWUgd2l0aCByZXNldHRpbmcgaXRcbiAgICAgIHVwZGF0ZVR3ZWVuLnVwZGF0ZVRvKFwidmFsdWVcIiwgbmV3U2NvcmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyAgVGhlIHR3ZWVuIGhhcyBmaW5pc2hlZCwgc28gY3JlYXRlIGEgbmV3IG9uZVxuICAgICAgdXBkYXRlVHdlZW4gPSB0aGlzLnR3ZWVucy5hZGRDb3VudGVyKHtcbiAgICAgICAgZnJvbTogY3VycmVudFNjb3JlLFxuICAgICAgICB0bzogbmV3U2NvcmUsXG4gICAgICAgIGR1cmF0aW9uOiAyMDAwLFxuICAgICAgICBlYXNlOiBcImxpbmVhclwiLFxuICAgICAgICBvblVwZGF0ZTogKHR3ZWVuKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBNYXRoLnJvdW5kKHR3ZWVuLmdldFZhbHVlKCkpO1xuICAgICAgICAgIHRoaXMuc2NvcmVUZXh0LnNldFRleHQoYCR7dmFsdWV9YCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgc2hvd0dhbWVPdmVyU2NyZWVuKCkge1xuICAgIHRoaXMuYXVkaW9NYW5hZ2VyLnBsYXlHYW1lT3ZlcigpO1xuICAgIGNvbnN0IGNlbnRlclggPSB0aGlzLnN5cy5nYW1lLmNvbmZpZy53aWR0aCAvIDI7XG4gICAgY29uc3QgY2VudGVyWSA9IHRoaXMuc3lzLmdhbWUuY29uZmlnLmhlaWdodCAvIDI7XG5cbiAgICAvLyBDcmVhdGUgYSBncm91cCBmb3IgdGhlIGdhbWUgb3ZlciBlbGVtZW50c1xuICAgIGNvbnN0IGdhbWVPdmVyR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBnYW1lIG92ZXIgaW1hZ2VcbiAgICB0aGlzLmdhbWVPdmVySW1hZ2UgPSB0aGlzLmFkZFxuICAgICAgLmltYWdlKGNlbnRlclgsIGNlbnRlclksIFwiZ2FtZU92ZXJJbWFnZVwiKVxuICAgICAgLnNldE9yaWdpbigwLjUpXG4gICAgICAuc2V0U2NhbGUoMS40LCAxLjIpO1xuICAgIGdhbWVPdmVyR3JvdXAuYWRkKHRoaXMuZ2FtZU92ZXJJbWFnZSk7XG5cbiAgICAvLyBEaXNwbGF5IHRoZSBmaW5hbCBzY29yZVxuICAgIGNvbnN0IHNjb3JlVGV4dGdhbWVPdmVyU2NyZWVuID0gdGhpcy5hZGRcbiAgICAgIC50ZXh0KFxuICAgICAgICBjZW50ZXJYLFxuICAgICAgICBjZW50ZXJZICsgODAsIC8vIEFkanVzdCB0aGUgWSBwb3NpdGlvbiBhcyBuZWVkZWRcbiAgICAgICAgYCAke3RoaXMuc2NvcmVzfWAsXG4gICAgICAgIHtcbiAgICAgICAgICBmb250RmFtaWx5OiBcImdyb2JvbGRcIixcbiAgICAgICAgICBmb250U2l6ZTogXCI0MHB4XCIsXG4gICAgICAgICAgZm9udFN0eWxlOiBcImJvbGRcIixcbiAgICAgICAgICBmaWxsOiBcIiNmZmZmZmZcIixcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLnNldE9yaWdpbigwLjUpO1xuICAgIGdhbWVPdmVyR3JvdXAuYWRkKHNjb3JlVGV4dGdhbWVPdmVyU2NyZWVuKTtcbiAgICAvLyBDcmVhdGUgdGhlIG1lbnUgYnV0dG9uXG4gICAgY29uc3QgbWVudUJ1dHRvbiA9IHRoaXMuYWRkXG4gICAgICAuaW1hZ2UoXG4gICAgICAgIGNlbnRlclggLSAxMTAsXG4gICAgICAgIGNlbnRlclkgKyAyMDAsIC8vIEFkanVzdCB0aGUgWSBwb3NpdGlvbiBhcyBuZWVkZWRcbiAgICAgICAgXCJtZW51XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBmb250RmFtaWx5OiBcImdyb2JvbGRcIixcbiAgICAgICAgICBmb250U2l6ZTogXCIzMHB4XCIsXG4gICAgICAgICAgZm9udFN0eWxlOiBcImJvbGRcIixcbiAgICAgICAgICBmaWxsOiBcIiNmZmZmZmZcIixcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLnNldE9yaWdpbigwLjUpXG4gICAgICAuc2V0SW50ZXJhY3RpdmUoKTtcbiAgICBnYW1lT3Zlckdyb3VwLmFkZChtZW51QnV0dG9uKTtcbiAgICAvLyBDcmVhdGUgdGhlIHJldHJ5IGJ1dHRvblxuICAgIGNvbnN0IHJldHJ5QnV0dG9uID0gdGhpcy5hZGRcbiAgICAgIC5pbWFnZShcbiAgICAgICAgY2VudGVyWCArIDExMCxcbiAgICAgICAgY2VudGVyWSArIDIwMCwgLy8gQWRqdXN0IHRoZSBZIHBvc2l0aW9uIGFzIG5lZWRlZFxuICAgICAgICBcInJldHJ5XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBmb250RmFtaWx5OiBcImdyb2JvbGRcIixcbiAgICAgICAgICBmb250U2l6ZTogXCIzMHB4XCIsXG4gICAgICAgICAgZm9udFN0eWxlOiBcImJvbGRcIixcbiAgICAgICAgICBmaWxsOiBcIiNmZmZmZmZcIixcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLnNldE9yaWdpbigwLjUpXG4gICAgICAuc2V0SW50ZXJhY3RpdmUoKTtcbiAgICBnYW1lT3Zlckdyb3VwLmFkZChyZXRyeUJ1dHRvbik7XG5cbiAgICAvLyBBZGQgYSBwb2ludGVyZG93biBldmVudCBmb3IgdGhlIHJldHJ5IGJ1dHRvblxuICAgIHJldHJ5QnV0dG9uLm9uKFwicG9pbnRlcmRvd25cIiwgKCkgPT4ge1xuICAgICAgLy8gSW1wbGVtZW50IGxvZ2ljIHRvIHJlc3RhcnQgdGhlIGdhbWVcbiAgICAgIC8vIEZvciBleGFtcGxlLCB5b3UgY2FuIHJlc2V0IHNjb3JlcyBhbmQgc3RhcnQgYSBuZXcgZ2FtZVxuXG4gICAgICB0aGlzLnNjb3JlcyA9IDA7XG4gICAgICB0aGlzLlVwZGF0ZVNjb3JlTnVtYmVycyh0aGlzLmN1cnJlbnRTY29yZSwgdGhpcy5uZXdTY29yZSk7XG4gICAgICB0aGlzLnNjZW5lLnJlc3RhcnQoKTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCBhIHBvaW50ZXJkb3duIGV2ZW50IGZvciB0aGUgbWVudSBidXR0b25cbiAgICBtZW51QnV0dG9uLm9uKFwicG9pbnRlcmRvd25cIiwgKCkgPT4ge1xuICAgICAgLy8gSW1wbGVtZW50IGxvZ2ljIHRvIHJldHVybiB0byB0aGUgbWFpbiBtZW51XG4gICAgICAvLyBGb3IgZXhhbXBsZSwgeW91IGNhbiBsb2FkIGEgZGlmZmVyZW50IHNjZW5lXG4gICAgICB0aGlzLnNjb3JlcyA9IDA7XG4gICAgICB0aGlzLlVwZGF0ZVNjb3JlTnVtYmVycyh0aGlzLmN1cnJlbnRTY29yZSwgdGhpcy5uZXdTY29yZSk7XG4gICAgICB0aGlzLnNjZW5lLnN0YXJ0KFwiTWFpbk1lbnVTY2VuZVwiKTsgLy8gUmVwbGFjZSAnTWFpbk1lbnVTY2VuZScgd2l0aCB0aGUgYWN0dWFsIHNjZW5lIGtleSBmb3IgeW91ciBtYWluIG1lbnVcbiAgICB9KTtcblxuICAgIC8vIE1ha2UgdGhlIGdhbWUgb3ZlciBlbGVtZW50cyB2aXNpYmxlXG4gICAgZ2FtZU92ZXJHcm91cC5zZXRWaXNpYmxlKHRydWUpO1xuICB9XG59XG4iLCJpbXBvcnQgQXVkaW9NYW5hZ2VyIGZyb20gXCIuL0F1ZGlvTWFuYWdlci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTWVudVNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJNYWluTWVudVNjZW5lXCIpO1xuICAgIHRoaXMuYXVkaW9NYW5hZ2VyID0gbnVsbDtcbiAgfVxuXG4gIHByZWxvYWQoKSB7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwibWVudV9iZ1wiLCBcImFzc2V0cy9pbWcvaHVkL01haW5NZW51X0NyaWNfY2xhc2gucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcInBsYXlfYnV0dG9uXCIsIFwiYXNzZXRzL2ltZy9odWQvcGxheV9idXR0b24ucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcImhlbHBCdG5cIiwgXCJhc3NldHMvaW1nL2h1ZC9oZWxwX2J1dHRvbi5wbmdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwiaW5mb0JnXCIsIFwiYXNzZXRzL2ltZy9odWQvYmctaGVscC5qcGdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwiY2xvc2VCdXR0b25cIiwgXCJhc3NldHMvaW1nL2h1ZC9jbG9zZV9idXR0b24ucG5nXCIpO1xuICAgIHRoaXMuYXVkaW9NYW5hZ2VyID0gbmV3IEF1ZGlvTWFuYWdlcih0aGlzKTtcbiAgICB0aGlzLmF1ZGlvTWFuYWdlci5wcmVsb2FkKCk7XG5cbiAgICAvLyBTZXQgdXAgYSBsb2FkaW5nIHByb2dyZXNzIGJhclxuICAgIGNvbnN0IGxvYWRpbmdUZXh0ID0gdGhpcy5hZGQudGV4dChcbiAgICAgIHRoaXMuc3lzLmdhbWUuY29uZmlnLndpZHRoIC8gMixcbiAgICAgIHRoaXMuc3lzLmdhbWUuY29uZmlnLmhlaWdodCAvIDIsXG4gICAgICBcIkxvYWRpbmcuLi5cIixcbiAgICAgIHtcbiAgICAgICAgZm9udFNpemU6IFwiMzJweFwiLFxuICAgICAgICBmaWxsOiBcIiNmZmZmZmZcIixcbiAgICAgICAgYWxpZ246IFwiY2VudGVyXCIsXG4gICAgICB9XG4gICAgKTtcbiAgICBsb2FkaW5nVGV4dC5zZXRPcmlnaW4oMC41KTtcblxuICAgIHRoaXMubG9hZC5vbihcInByb2dyZXNzXCIsICh2YWx1ZSkgPT4ge1xuICAgICAgLy8gVXBkYXRlIHRoZSBsb2FkaW5nIHByb2dyZXNzIGJhciBhcyBhc3NldHMgYXJlIGxvYWRlZFxuICAgICAgbG9hZGluZ1RleHQuc2V0VGV4dChgTG9hZGluZy4uLiAke01hdGgucm91bmQodmFsdWUgKiAxMDApfSVgKTtcbiAgICB9KTtcblxuICAgIHRoaXMubG9hZC5vbihcImNvbXBsZXRlXCIsICgpID0+IHtcbiAgICAgIC8vIEFsbCBhc3NldHMgYXJlIGxvYWRlZCwgaGlkZSB0aGUgbG9hZGluZyB0ZXh0IGFuZCBjcmVhdGUgeW91ciBzY2VuZVxuICAgICAgbG9hZGluZ1RleHQuc2V0VmlzaWJsZShmYWxzZSk7XG5cbiAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZSgpIHtcbiAgICAvLyBDcmVhdGUgdGhlIGF1ZGlvIG1hbmFnZXJcbiAgICB0aGlzLmF1ZGlvTWFuYWdlci5jcmVhdGUoKTtcbiAgfVxuXG4gIGNyZWF0ZVNjZW5lKCkge1xuICAgIC8vIENyZWF0ZSB0aGUgc2NlbmUgY29udGVudCBub3cgdGhhdCBhbGwgYXNzZXRzIGFyZSBsb2FkZWRcbiAgICBjb25zdCBtZW51X2JnID0gdGhpcy5hZGQuaW1hZ2UoMCwgMCwgXCJtZW51X2JnXCIpO1xuICAgIG1lbnVfYmcuc2V0T3JpZ2luKDAsIDApO1xuICAgIG1lbnVfYmcuc2V0U2NhbGUoXG4gICAgICB0aGlzLnN5cy5nYW1lLmNvbmZpZy53aWR0aCAvIG1lbnVfYmcud2lkdGgsXG4gICAgICB0aGlzLnN5cy5nYW1lLmNvbmZpZy5oZWlnaHQgLyBtZW51X2JnLmhlaWdodFxuICAgICk7XG5cbiAgICAvLyBDcmVhdGUgYW5kIHR1cm4gb24gYSBncm91cCBvZiBidXR0b25zXG4gICAgY29uc3QgYnV0dG9uR3JvdXAgPSB0aGlzLmFkZC5ncm91cCgpO1xuXG4gICAgLy8gQWRkIHlvdXIgYnV0dG9ucyB0byB0aGUgZ3JvdXAgYW5kIHBvc2l0aW9uIHRoZW0gYXMgbmVlZGVkXG4gICAgY29uc3QgcGxheUJ0biA9IHRoaXMuYWRkLmltYWdlKFxuICAgICAgdGhpcy5zeXMuZ2FtZS5jb25maWcud2lkdGggLSAzMDAsXG4gICAgICB0aGlzLnN5cy5nYW1lLmNvbmZpZy5oZWlnaHQgLyAyLFxuICAgICAgXCJwbGF5X2J1dHRvblwiXG4gICAgKTtcbiAgICBwbGF5QnRuLnByZUZYLnNldFBhZGRpbmcoMjIpO1xuXG4gICAgY29uc3QgZnggPSBwbGF5QnRuLnByZUZYLmFkZEdsb3coKTtcblxuICAgIC8vIEFkanVzdCBvdXRlclN0cmVuZ3RoIGFuZCBvdGhlciBwYXJhbWV0ZXJzIGFzIG5lZWRlZCBmb3IgeW91ciBlZmZlY3RcbiAgICBjb25zdCBnbG93VHdlZW4gPSB0aGlzLnR3ZWVucy5hZGQoe1xuICAgICAgdGFyZ2V0czogZngsXG4gICAgICBvdXRlclN0cmVuZ3RoOiAxMCwgLy8gQWRqdXN0IHRoZSB2YWx1ZSBhcyBwZXIgeW91ciBkZXNpcmVkIGdsb3cgaW50ZW5zaXR5XG4gICAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgICB5b3lvOiB0cnVlLFxuICAgICAgbG9vcDogLTEsXG4gICAgICBlYXNlOiBcInNpbmUuaW5vdXRcIixcbiAgICB9KTtcbiAgICBjb25zdCBoZWxwQnRuID0gdGhpcy5hZGQuaW1hZ2UoXG4gICAgICB0aGlzLnN5cy5nYW1lLmNvbmZpZy53aWR0aCAtIDMwMCxcbiAgICAgIHRoaXMuc3lzLmdhbWUuY29uZmlnLmhlaWdodCAvIDIgKyAxNTAsXG4gICAgICBcImhlbHBCdG5cIlxuICAgICk7XG5cbiAgICBidXR0b25Hcm91cC5hZGRNdWx0aXBsZShbcGxheUJ0biwgaGVscEJ0bl0pO1xuXG4gICAgcGxheUJ0bi5zZXRTY2FsZSgwLjIpO1xuICAgIHBsYXlCdG4uc2V0SW50ZXJhY3RpdmUoKTtcbiAgICBwbGF5QnRuLm9uKFwicG9pbnRlcnVwXCIsICgpID0+IHtcbiAgICAgIC8vIEhhbmRsZSBidXR0b24gY2xpY2tcbiAgICAgIHRoaXMuc2NlbmUuc3RhcnQoXCJPcHRpb25TY2VuZVwiKTtcbiAgICB9KTtcblxuICAgIGhlbHBCdG4uc2V0U2NhbGUoMC4xMik7XG4gICAgaGVscEJ0bi5zZXRJbnRlcmFjdGl2ZSgpO1xuICAgIGhlbHBCdG4ub24oXCJwb2ludGVydXBcIiwgKCkgPT4ge1xuICAgICAgLy8gQ3JlYXRlIGFuIG92ZXJsYXkgaW1hZ2UgZm9yIHRoZSBoZWxwIG1lc3NhZ2UgYmFja2dyb3VuZFxuICAgICAgY29uc3QgaGVscE1lc3NhZ2VCZyA9IHRoaXMuYWRkLmltYWdlKDAsIDAsIFwiaW5mb0JnXCIpOyAvLyAnaW5mb0JnJyBpcyB0aGUga2V5IG9mIHlvdXIgaW1hZ2UgYXNzZXRcbiAgICAgIGhlbHBNZXNzYWdlQmcuc2V0T3JpZ2luKDApO1xuICAgICAgaGVscE1lc3NhZ2VCZy5zZXREaXNwbGF5U2l6ZShcbiAgICAgICAgdGhpcy5nYW1lLmNvbmZpZy53aWR0aCxcbiAgICAgICAgdGhpcy5nYW1lLmNvbmZpZy5oZWlnaHRcbiAgICAgICk7XG4gICAgICBoZWxwTWVzc2FnZUJnLnNldERlcHRoKDEpOyAvLyBTZXQgYSBoaWdoZXIgZGVwdGggdG8gZW5zdXJlIGl0J3Mgb24gdG9wIG9mIG90aGVyIGVsZW1lbnRzXG5cbiAgICAgIC8vIENyZWF0ZSBhIGNsb3NlIGJ1dHRvblxuICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSB0aGlzLmFkZC5pbWFnZSg0MCwgNDAsIFwiY2xvc2VCdXR0b25cIik7IC8vICdjbG9zZUJ1dHRvbicgaXMgdGhlIGtleSBvZiB5b3VyIGNsb3NlIGJ1dHRvbiBpbWFnZSBhc3NldFxuICAgICAgY2xvc2VCdXR0b24uc2V0T3JpZ2luKDApO1xuICAgICAgY2xvc2VCdXR0b24uc2V0U2NhbGUoMC4xKTtcbiAgICAgIGNsb3NlQnV0dG9uLnNldEludGVyYWN0aXZlKCk7IC8vIEFsbG93IHRoZSBidXR0b24gdG8gYmUgaW50ZXJhY3RpdmVcbiAgICAgIGNsb3NlQnV0dG9uLnNldERlcHRoKDIpOyAvLyBTZXQgYSBoaWdoZXIgZGVwdGggdGhhbiB0aGUgaGVscCBtZXNzYWdlIGJhY2tncm91bmRcblxuICAgICAgLy8gQ2xvc2UgdGhlIGhlbHAgbWVzc2FnZSBhbmQgcmVtb3ZlIHRoZSBvdmVybGF5IHdoZW4gdGhlIGNsb3NlIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICBjbG9zZUJ1dHRvbi5vbihcInBvaW50ZXJ1cFwiLCAoKSA9PiB7XG4gICAgICAgIGhlbHBNZXNzYWdlQmcuZGVzdHJveSgpOyAvLyBSZW1vdmUgdGhlIGhlbHAgbWVzc2FnZSBiYWNrZ3JvdW5kXG4gICAgICAgIGNsb3NlQnV0dG9uLmRlc3Ryb3koKTsgLy8gUmVtb3ZlIHRoZSBjbG9zZSBidXR0b25cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgUGhhc2VyIGZyb20gXCIuLi9saWIvcGhhc2VyLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvblNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJPcHRpb25TY2VuZVwiKTtcbiAgfVxuICBpbml0KCkge1xuICAgIHRoaXMuYXVkaW9NYW5hZ2VyID0gdGhpcy5zY2VuZS5nZXQoXCJNYWluTWVudVNjZW5lXCIpLmF1ZGlvTWFuYWdlcjtcbiAgfVxuICBwcmVsb2FkKCkge1xuICAgIHRoaXMubG9hZC5pbWFnZShcImJhY2tncm91bmRcIiwgXCJhc3NldHMvaW1nL2h1ZC9iZy1tZW51LmpwZ1wiKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJvcHRpb25fYmFja2luZ1wiLCBcImFzc2V0cy9pbWcvaHVkL29wdGlvbi1CYWNraW5nMi5wbmdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwiZGVja09mU2l4dGVlblwiLCBcImFzc2V0cy9pbWcvaHVkLzE2LnBuZ1wiKTtcbiAgICB0aGlzLmxvYWQuaW1hZ2UoXCJkZWNrT2ZUaGlydHlcIiwgXCJhc3NldHMvaW1nL2h1ZC8zMC5wbmdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwiZGVja09mRmlmdHlUd29cIiwgXCJhc3NldHMvaW1nL2h1ZC81Mi5wbmdcIik7XG4gICAgdGhpcy5sb2FkLmltYWdlKFwiZGVja09mU2l4dGVlbi1ob3ZlclwiLCBcImFzc2V0cy9pbWcvaHVkLzE2LXByZXNzZWQucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcImRlY2tPZlRoaXJ0eS1ob3ZlclwiLCBcImFzc2V0cy9pbWcvaHVkLzMwLXByZXNzZWQucG5nXCIpO1xuICAgIHRoaXMubG9hZC5pbWFnZShcImRlY2tPZkZpZnR5VHdvLWhvdmVyXCIsIFwiYXNzZXRzL2ltZy9odWQvNTItcHJlc3NlZC5wbmdcIik7XG4gIH1cbiAgY3JlYXRlKCkge1xuICAgIGNvbnN0IGNlbnRlclggPSB0aGlzLnN5cy5nYW1lLmNvbmZpZy53aWR0aCAvIDI7XG4gICAgY29uc3QgY2VudGVyWSA9IHRoaXMuc3lzLmdhbWUuY29uZmlnLmhlaWdodCAvIDI7XG4gICAgY29uc3QgYmFja2dyb3VuZCA9IHRoaXMuYWRkLmltYWdlKGNlbnRlclgsIGNlbnRlclksIFwiYmFja2dyb3VuZFwiKTtcbiAgICBiYWNrZ3JvdW5kLnNldE9yaWdpbigwLjUpO1xuICAgIGJhY2tncm91bmQuc2V0U2NhbGUoXG4gICAgICB0aGlzLnN5cy5nYW1lLmNvbmZpZy53aWR0aCxcbiAgICAgIHRoaXMuc3lzLmdhbWUuY29uZmlnLmhlaWdodFxuICAgICk7XG4gICAgLy8gQ3JlYXRlIGJhY2tpbmcgaW1hZ2UgZm9yIGJ1dHRvbnNcbiAgICBjb25zdCBvcHRpb25CYWNraW5nID0gdGhpcy5hZGQuaW1hZ2UoY2VudGVyWCwgY2VudGVyWSwgXCJvcHRpb25fYmFja2luZ1wiKTtcbiAgICBvcHRpb25CYWNraW5nLnNldFNjYWxlKDAuOSwgMC44KTtcbiAgICAvLyBDcmVhdGUgYSBjb250YWluZXIgdG8gaG9sZCB0aGUgYnV0dG9ucyBhbmQgYmFja2dyb3VuZFxuICAgIGNvbnN0IGJ1dHRvbkNvbnRhaW5lciA9IHRoaXMuYWRkLmNvbnRhaW5lcihjZW50ZXJYLCBjZW50ZXJZICsgNTApO1xuICAgIGNvbnN0IHNwYWNpbmcgPSAzMDA7IC8vIEFkanVzdCBhcyBuZWVkZWRcbiAgICAvLyAvLyBDcmVhdGUgZGVjayBzZWxlY3Rpb24gYnV0dG9uc1xuICAgIGNvbnN0IGRlY2tPZlNpeHRlZW4gPSB0aGlzLmNyZWF0ZURlY2tCdXR0b24oXG4gICAgICAtc3BhY2luZyxcbiAgICAgIFwiZGVja09mU2l4dGVlblwiLFxuICAgICAgXCJkZWNrT2ZTaXh0ZWVuLWhvdmVyXCIsXG4gICAgICA0LFxuICAgICAgMVxuICAgICk7XG4gICAgY29uc3QgZGVja09mVGhpcnR5ID0gdGhpcy5jcmVhdGVEZWNrQnV0dG9uKFxuICAgICAgMCxcbiAgICAgIFwiZGVja09mVGhpcnR5XCIsXG4gICAgICBcImRlY2tPZlRoaXJ0eS1ob3ZlclwiLFxuICAgICAgNixcbiAgICAgIDFcbiAgICApO1xuICAgIGNvbnN0IGRlY2tPZkZpZnR5VHdvID0gdGhpcy5jcmVhdGVEZWNrQnV0dG9uKFxuICAgICAgc3BhY2luZyxcbiAgICAgIFwiZGVja09mRmlmdHlUd29cIixcbiAgICAgIFwiZGVja09mRmlmdHlUd28taG92ZXJcIixcbiAgICAgIDgsXG4gICAgICAxXG4gICAgKTtcblxuICAgIC8vIC8vIEFkZCBidXR0b25zIHRvIHRoZSBidXR0b24gY29udGFpbmVyXG4gICAgYnV0dG9uQ29udGFpbmVyLmFkZChkZWNrT2ZTaXh0ZWVuKTtcbiAgICBidXR0b25Db250YWluZXIuYWRkKGRlY2tPZlRoaXJ0eSk7XG4gICAgYnV0dG9uQ29udGFpbmVyLmFkZChkZWNrT2ZGaWZ0eVR3byk7XG4gIH1cbiAgY3JlYXRlRGVja0J1dHRvbih4LCBpbWFnZUtleSwgaG92ZXJJbWFnZUtleSwgY2FyZENvdW50LCBzY2FsZSkge1xuICAgIGNvbnN0IGRlY2tCdXR0b24gPSB0aGlzLmFkZC5pbWFnZSh4LCAwLCBpbWFnZUtleSk7XG4gICAgZGVja0J1dHRvbi5zZXRTY2FsZShzY2FsZSk7XG4gICAgY29uc3QgaW5pdGlhbFkgPSBkZWNrQnV0dG9uLnk7XG5cbiAgICAvLyBTZXQgaG92ZXIgc3RhdGVcbiAgICBkZWNrQnV0dG9uXG4gICAgICAuc2V0SW50ZXJhY3RpdmUoKVxuICAgICAgLm9uKFwicG9pbnRlcm92ZXJcIiwgKCkgPT4ge1xuICAgICAgICAvLyBDaGFuZ2UgdGhlIGltYWdlIHRvIHRoZSBob3ZlciBzdGF0ZSBpbWFnZSB3aGVuIGhvdmVyZWRcbiAgICAgICAgZGVja0J1dHRvbi5zZXRUZXh0dXJlKGhvdmVySW1hZ2VLZXkpO1xuICAgICAgfSlcbiAgICAgIC5vbihcInBvaW50ZXJvdXRcIiwgKCkgPT4ge1xuICAgICAgICAvLyBDaGFuZ2UgdGhlIGltYWdlIGJhY2sgdG8gdGhlIG5vcm1hbCBzdGF0ZSBpbWFnZSB3aGVuIG5vdCBob3ZlcmVkXG4gICAgICAgIC8vIGRlY2tCdXR0b24uc2V0VGV4dHVyZShgZGVja09mJHtjYXJkQ291bnR9YCk7XG4gICAgICAgIGRlY2tCdXR0b24uc2V0VGV4dHVyZShpbWFnZUtleSk7XG4gICAgICB9KVxuICAgICAgLm9uKFwicG9pbnRlcnVwXCIsICgpID0+IHtcbiAgICAgICAgLy8gdGhpcy5zY2VuZS5zdGFydCgnR2FtZVNjZW5lJywgNCk7Ly9oZXJlIHdlIGFyZSBnZXR0aW5nIG51bWJlciBvZiBjYXJkc1xuICAgICAgICB0aGlzLnNjZW5lLnN0YXJ0KFwiR2FtZVNjZW5lXCIsIGNhcmRDb3VudCk7XG4gICAgICAgIHRoaXMuYXVkaW9NYW5hZ2VyLnBsYXlCdXR0b25DbGljaygpO1xuICAgICAgfSk7XG4gICAgdGhpcy50d2VlbnMuYWRkKHtcbiAgICAgIHRhcmdldHM6IGRlY2tCdXR0b24sXG5cbiAgICAgIHk6IGluaXRpYWxZIC0gNDAsIC8vIEFkanVzdCB0aGlzIHZhbHVlIGZvciB0aGUgZGVzaXJlZCBib3VuY2UgaGVpZ2h0XG4gICAgICBkdXJhdGlvbjogNTAwLCAvLyBBZGp1c3QgdGhlIGR1cmF0aW9uIGFzIG5lZWRlZFxuICAgICAgeW95bzogdHJ1ZSwgLy8gQm91bmNlIGJhY2sgdG8gdGhlIGluaXRpYWwgcG9zaXRpb25cbiAgICAgIHJlcGVhdDogMCxcbiAgICAgIGVhc2U6IFwiYm91bmNlLmluXCIsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVja0J1dHRvbjtcblxuICAgIC8vIHRoaXMudHdlZW5zLmFkZCh7XG4gICAgLy8gICAgIHRhcmdldHM6IHVmbzIsXG4gICAgLy8gICAgIHg6IDcwMCxcbiAgICAvLyAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgLy8gICAgIHJlcGVhdDogLTEsXG4gICAgLy8gICAgIGhvbGQ6IDUwMCxcbiAgICAvLyAgICAgcmVwZWF0RGVsYXk6IDUwMCxcbiAgICAvLyAgICAgZWFzZTogJ2JvdW5jZS5vdXQnXG4gICAgLy8gfSk7XG5cbiAgICAvLyB0aGlzLnR3ZWVucy5hZGQoe1xuICAgIC8vICAgICB0YXJnZXRzOiB1Zm8zLFxuICAgIC8vICAgICB4OiA3MDAsXG4gICAgLy8gICAgIGR1cmF0aW9uOiAyMDAwLFxuICAgIC8vICAgICByZXBlYXQ6IC0xLFxuICAgIC8vICAgICBob2xkOiA1MDAsXG4gICAgLy8gICAgIHJlcGVhdERlbGF5OiA1MDAsXG4gICAgLy8gICAgIGVhc2U6ICdib3VuY2UuaW5vdXQnXG4gICAgLy8gfSk7XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvaW5GbGlwQW5pbWF0aW9uKHNjZW5lLCB4LCB5LCByYW5kb21WYWx1ZSwgb25Db21wbGV0ZSkge1xuICAgIC8vIENyZWF0ZSBhIHNwcml0ZSBmb3IgdGhlIGNvaW4gYXQgdGhlIGRlc2lyZWQgcG9zaXRpb25cbiAgICBjb25zdCBjb2luID0gc2NlbmUuYWRkLnNwcml0ZSh4LCB5LCAnY29pbllvdScpOyAvLyBBZGp1c3QgdGhlIHBvc2l0aW9uIGFzIG5lZWRlZFxuXG4gICAgLy8gQ3JlYXRlIGFuIGFuaW1hdGlvbiBmb3IgdGhlIGNvaW4gZmxpcFxuICAgIGNvbnN0IGZsaXBBbmltYXRpb24gPSBzY2VuZS5hbmltcy5jcmVhdGUoe1xuICAgICAgICBrZXk6ICdzcGluJyxcbiAgICAgICAgZnJhbWVzOiBbXG4gICAgICAgICAgICB7IGtleTogJ2NvaW5Zb3UnIH0sXG4gICAgICAgICAgICB7IGtleTogJ2NvaW4yJyB9LFxuICAgICAgICAgICAgeyBrZXk6ICdjb2luMycgfSxcbiAgICAgICAgICAgIHsga2V5OiAnY29pbjQnIH0sXG4gICAgICAgICAgICB7IGtleTogJ2NvaW5BSScgfSxcbiAgICAgICAgICAgIHsga2V5OiAnY29pbjInIH0sXG4gICAgICAgICAgICB7IGtleTogJ2NvaW4zJyB9LFxuICAgICAgICAgICAgeyBrZXk6ICdjb2luNCcgfSxcbiAgICAgICAgICAgIC8vIEFkZCBtb3JlIGZyYW1lcyBhcyBuZWVkZWRcbiAgICAgICAgXSxcbiAgICAgICAgZnJhbWVSYXRlOiAxMCwgLy8gQWRqdXN0IHRoZSBmcmFtZSByYXRlIGFzIG5lZWRlZFxuICAgICAgICByZXBlYXQ6IC0xLCAvLyBTZXQgdG8gLTEgZm9yIGNvbnRpbnVvdXMgbG9vcGluZ1xuICAgIH0pO1xuXG4gICAgLy8gUGxheSB0aGUgY29pbiBmbGlwIGFuaW1hdGlvblxuICAgIGNvaW4ucGxheSgnc3BpbicpO1xuXG4gICAgLy8gU3RvcCB0aGUgYW5pbWF0aW9uIGFmdGVyIGEgY2VydGFpbiB0aW1lIChlLmcuLCAyIHNlY29uZHMpXG4gICAgc2NlbmUudGltZS5kZWxheWVkQ2FsbCgyMDAwLCAoKSA9PiB7XG4gICAgICAgIGNvaW4uYW5pbXMuc3RvcCgnc3BpbicpO1xuICAgICAgICBjb2luLnNldFRleHR1cmUocmFuZG9tVmFsdWUgPT09ICdoZWFkcycgPyAnY29pbllvdScgOiAnY29pbkFJJyk7XG4gICAgICAgIG9uQ29tcGxldGUocmFuZG9tVmFsdWUpO1xuICAgICAgICBzY2VuZS50aW1lLmRlbGF5ZWRDYWxsKDEwMDAsICgpID0+IHtcbiAgICAgICAgICAgIGNvaW4uc2V0VmlzaWJsZShmYWxzZSk7IC8vIEhpZGUgdGhlIGNvaW5cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29pbjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFBoYXNlciBmcm9tIFwiLi9saWIvcGhhc2VyLmpzXCI7XG5cbmltcG9ydCBHYW1lU2NlbmUgZnJvbSBcIi4vc2NlbmVzL0dhbWVTY2VuZS5qc1wiO1xuaW1wb3J0IE9wdGlvblNjZW5lIGZyb20gXCIuL3NjZW5lcy9PcHRpb25TY2VuZS5qc1wiO1xuaW1wb3J0IE1haW5NZW51U2NlbmUgZnJvbSBcIi4vc2NlbmVzL01haW5NZW51U2NlbmUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgbmV3IFBoYXNlci5HYW1lKHtcbiAgdHlwZTogUGhhc2VyLkFVVE8sXG4gIHdpZHRoOiAxOTIwLFxuICBoZWlnaHQ6IDEwODAsXG4gIHNjZW5lOiBbTWFpbk1lbnVTY2VuZSwgT3B0aW9uU2NlbmUsIEdhbWVTY2VuZV0sXG4gIHNjYWxlOiB7XG4gICAgLy8gbW9kZTogUGhhc2VyLlNjYWxlLkFVVE8sXG4gICAgbW9kZTogUGhhc2VyLlNjYWxlLkFVVE8sXG4gICAgYXV0b0NlbnRlcjogUGhhc2VyLlNjYWxlLkNFTlRFUl9CT1RILFxuICB9LFxuICBmeDoge1xuICAgIGdsb3c6IHtcbiAgICAgIGRpc3RhbmNlOiAzMixcbiAgICAgIHF1YWxpdHk6IDAuMSxcbiAgICB9LFxuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBwcmVsb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBJbml0aWFsaXplIEF1ZGlvTWFuYWdlciBpbiBvbmUgb2YgeW91ciBzY2VuZXMgKGUuZy4sIE1haW5NZW51U2NlbmUpXG4gICAgICB0aGlzLnNjZW5lLnNjZW5lc1swXS5hdWRpb01hbmFnZXIgPSBuZXcgQXVkaW9NYW5hZ2VyKFxuICAgICAgICB0aGlzLnNjZW5lLnNjZW5lc1swXVxuICAgICAgKTtcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gU3RhcnQgcGxheWluZyBiYWNrZ3JvdW5kIG11c2ljIG9yIGhhbmRsZSBhdWRpbyBhcyBuZWVkZWRcbiAgICAgIHRoaXMuc2NlbmUuc2NlbmVzWzBdLmF1ZGlvTWFuYWdlci5wbGF5QmFja2dyb3VuZE11c2ljKCk7XG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9