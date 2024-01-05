import Phaser from "../lib/phaser.js";
import { createCoinFlipAnimation } from "./coinFlipAnimation.js";
import CardModule from "./CardModule.js";

export default class GameScene extends Phaser.Scene {
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
    this.cardModule = new CardModule(this, this.audioManager);

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

    createCoinFlipAnimation(this, centerX, centerY, randomValue, (result) => {
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
