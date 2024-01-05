export default class AudioManager {
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
