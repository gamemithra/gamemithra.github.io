import AudioManager from"./AudioManager.js";export default class MainMenuScene extends Phaser.Scene{constructor(){super("MainMenuScene"),this.audioManager=null}preload(){this.load.image("mainMenu_bg","assets/img/hud/MainMenu_Cric_clash.png"),this.load.image("play_button","assets/img/hud/play_button.png"),this.load.image("helpBtn","assets/img/hud/help_button.png"),this.load.image("helpMessage","assets/img/hud/bg-help.jpg"),this.audioManager=new AudioManager(this),this.audioManager.preload()}create(){this.audioManager.create();const e=this.add.image(1,1,"mainMenu_bg");e.setOrigin(0,0),e.setScale(this.sys.game.config.width/e.width,this.sys.game.config.height/e.height);const i=this.add.text(screen.width/2,screen.height/2,"Loading..",{fontSize:"32px",fill:"#ffffff",align:"center"});i.setOrigin(.5),this.time.delayedCall(100,(()=>{i.setVisible(!1);const e=this.add.group(),t=this.add.image(this.sys.game.config.width-300,this.sys.game.config.height/2,"play_button"),s=this.add.image(this.sys.game.config.width-300,this.sys.game.config.height/2+120,"helpBtn");e.addMultiple([t,s]),t.setScale(.2),t.setInteractive(),t.on("pointerup",(()=>{this.scene.start("OptionScene")})),s.setScale(.12),s.setInteractive(),s.on("pointerup",(()=>{const e=this.add.image(this.sys.game.config.width-300,this.sys.game.config.height/2,"helpMessage");e.setOrigin(1,.5),e.setInteractive(),e.on("pointerup",(()=>{e.setVisible(!1)}))}))}))}}