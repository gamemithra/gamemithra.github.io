import Phaser from "../lib/phaser.js";

export default class OptionScene extends Phaser.Scene {
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
