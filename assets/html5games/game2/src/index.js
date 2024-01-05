import Phaser from "./lib/phaser.js";

import GameScene from "./scenes/GameScene.js";
import OptionScene from "./scenes/OptionScene.js";
import MainMenuScene from "./scenes/MainMenuScene.js";

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scene: [MainMenuScene, OptionScene, GameScene],
  scale: {
    // mode: Phaser.Scale.AUTO,
    mode: Phaser.Scale.AUTO,
    autoCenter: Phaser.Scale.CENTER_BOTH,
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
});
