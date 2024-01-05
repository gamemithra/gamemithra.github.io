import AudioManager from "./AudioManager.js";

export default class MainMenuScene extends Phaser.Scene {
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
    this.audioManager = new AudioManager(this);
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
