import Phaser from"../lib/phaser.js";export default class CardModule extends Phaser.Scene{constructor(t,e){super({key:"CardModule"}),this.playerDeckData=t.cache.json.get("playerCardData.json"),this.aiDeckData=t.cache.json.get("aiCardData.json"),this.gameScene=t,this.currentPlayer="",this.audioManager=e,this.playerX=10,this.aiX=t.sys.game.config.width-10,this.playerX2=t.sys.game.config.width/2-300,this.aiX2=t.sys.game.config.width/2+300,this.attributeButtons=[],this.attributestatics=[],this.cardIndex=0,this.playerFeedbackArray=[],this.aiFeedbackArray=[],this.playerCard=null,this.aiCard=null,this.playerCards=[],this.aiCards=[]}async initializeDecks(t){this.createButtonFeedBack(),this.playerCards=[],this.aiCards=[];try{const[e,a]=await Promise.all([fetch("assets/json/playerCardData.json"),fetch("assets/json/aiCardData.json")]),[s,i]=await Promise.all([e.json(),a.json()]);this.playerDeckData=s,this.aiDeckData=i;for(let e=0;e<t;e++){const t={image:this.gameScene.add.image(this.playerX,500,"cardFront"),data:this.playerDeckData[e],type:"Player Card"};this.playerCards.push(t),this.audioManager.playPageFlip()}for(let e=0;e<t;e++){const t={image:this.gameScene.add.image(this.aiX,500,"cardFront"),data:this.aiDeckData[e],type:"AI"};this.aiCards.push(t)}this.drawNextCards()}catch(t){console.error("Error loading card data:",t)}}drawNextCards(){if(this.audioManager.playShuffle(),this.playerCards.length>0&&this.aiCards.length>0){const t=this.playerCards[this.playerCards.length-1].data,e=this.aiCards[this.aiCards.length-1].data;this.playerCard=this.drawCard(this.gameScene,this.playerCards[0],t,this.playerX2),this.aiCard=this.drawCard(this.gameScene,this.aiCards[0],e,this.aiX2),this.playerCard.cardData=t,this.aiCard.cardData=e,this.playerCards.shift(),this.aiCards.shift(),this.gameScene.time.delayedCall(1200,(()=>{"player"===this.currentPlayer?this.revealCard(this.playerCard):this.revealCard(this.aiCard)}))}else this.gameScene.showGameOverScreen()}drawCard(t,e,a,s){if(e)return e.image.y-=32,this.audioManager.playPageFlip(),t.tweens.add({targets:e.image,x:s,scaleX:1.25,scaleY:1.25,duration:500,onComplete:()=>{}}),e.cardData=a,e}async revealCard(t){this.audioManager.playCut(),"cardBack"===t.image.texture.key?this.flipCard(t.image,"cardBack","cardFront"):(this.flipCard(t.image,"cardFront","cardBack"),setTimeout((()=>{this.createAttributeButtons(t)}),500))}async createAttributeButtons(t){const e=t.cardData;for(const[a,s]of Object.keys(e).entries()){const i=e[s],r=t.image.x-8,h=430+40*a;if(0===a){const t=this.gameScene.add.text(r-80,h+10,` ${i}`,{fontFamily:"Arial, sans-serif",fontSize:"30px",color:"#800000",fontStyle:"bold"});this.attributestatics.push(t)}else if(1===a){const t=r,e=h-140,a=this.gameScene.add.image(t,e,s);a.setScale(1.3),a.setOrigin(.5,.5),a.setInteractive(),this.attributestatics.push(a)}else{const t=this.gameScene.add.text(r,h,`${s}: ${i}`,{fontFamily:"Arial, sans-serif",fontSize:"26px",color:"#F08080",fontStyle:"bold"});t.setOrigin(.5,.5),t.on("pointerdown",(()=>{"player"===this.currentPlayer&&(t.setFontSize(26),t.setColor("#229954"),t.setFontStyle("bold"),t.setDepth(3),this.audioManager.playSelect(),setTimeout((()=>{this.handleCardSelection(i,a)}),500))})),"player"===this.currentPlayer&&t.setInteractive(),this.attributeButtons.push(t)}}"player"!==this.currentPlayer&&await this.waitForAttributeButtons().then((()=>{this.gameScene.time.delayedCall(1200,(()=>{this.autoSelectAttribute()}))}))}async waitForAttributeButtons(){for(;0===this.attributeButtons.length;)await new Promise((t=>setTimeout(t,100)))}async autoSelectAttribute(){this.audioManager.playSelect();try{if(this.attributeButtons.length>0){const t=Math.floor(Math.random()*this.attributeButtons.length),e=this.attributeButtons[t];if(!e)throw new Error("Selected text is undefined.");e.setFontSize(30),e.setColor("#229954"),e.setFontStyle("bold"),e.setDepth(2.2);const a=t+2;setTimeout((()=>{this.handleCardSelection(e,a)}),1200)}}catch(t){}}async handleCardSelection(t,e){await this.revealHiddenCard(e).then((()=>{this.evaluateSelection(t,e)}))}async revealHiddenCard(t){"player"===this.currentPlayer?(this.revealCard(this.aiCard),this.toggleFeedback(t)):(this.revealCard(this.playerCard),this.toggleFeedback(t))}toggleFeedback(t){"player"===this.currentPlayer?(this.gameScene.time.delayedCall(500,(()=>{this.aiFeedbackArray[t-2].setVisible(!0)})),setTimeout((()=>{this.aiFeedbackArray[t-2].setVisible(!1),this.flipCard(this.aiCard.image,"cardBack","cardFront"),this.clearAtributesOnCard()}),1e3)):(this.gameScene.time.delayedCall(500,(()=>{this.playerFeedbackArray[t-2].setVisible(!0)})),setTimeout((()=>{this.playerFeedbackArray[t-2].setVisible(!1),this.flipCard(this.playerCard.image,"cardBack","cardFront"),this.clearAtributesOnCard()}),1e3))}async evaluateSelection(t,e){let a,s;this.disableAttributeButtons(),"player"===this.currentPlayer?(a=this.aiDeckData[this.cardIndex][Object.keys(this.aiDeckData[this.cardIndex])[e]],s=t>a?"player":"ai"):(a=this.playerDeckData[this.cardIndex][Object.keys(this.playerDeckData[this.cardIndex])[e]],s=t>a?"ai":"player"),this.winRoundSequence(s)}winRoundSequence(t){if("player"===t){this.aiCards.shift();const t=this.aiDeckData.shift();this.aiDeckData.push(t);const e={image:this.gameScene.add.image(this.playerX,500,"cardFront"),data:t,type:"Player Card"};this.playerCards.push(e)}else{this.playerCards.shift();const t=this.playerDeckData.shift();this.playerDeckData.push(t);const e={image:this.gameScene.add.image(this.aiX,500,"cardFront"),data:t,type:"AI Card"};this.aiCards.push(e)}setTimeout((()=>{this.moveCardsToWinner(t)}),1e3)}async moveCardsToWinner(t){this.playerCard.image.setTexture("cardFront"),this.aiCard.image.setTexture("cardFront"),"player"===t?this.gameScene.tweens.add({targets:[this.playerCard.image,this.aiCard.image],x:-100,scaleX:.5,scaleY:.5,duration:1e3,onComplete:()=>{this.playerCard&&this.aiCard&&(this.playerCard.image.setDepth(-1),this.aiCard.image.setDepth(-1),this.gameScene.UpdateScores(t),this.currentPlayer=t,setTimeout((()=>{this.drawNextCards()}),1200))}}):this.gameScene.tweens.add({targets:[this.playerCard.image,this.aiCard.image],x:this.aiX+200,scaleX:.5,scaleY:.5,duration:1e3,onComplete:()=>{this.playerCard&&this.aiCard&&(this.playerCard.image.setDepth(-1),this.aiCard.image.setDepth(-1),this.gameScene.UpdateScores(t),this.currentPlayer=t,setTimeout((()=>{this.drawNextCards()}),1200))}})}async disableAttributeButtons(){for(const t of this.attributeButtons)t.setInteractive(!1)}createButtonFeedBack(){const t=2267476;for(let e=0;e<5;e+=1){const a=500+40*e,s=this.playerX2-150,i=this.gameScene.add.graphics();i.fillStyle(t),i.fillRect(s,a,300,30),i.alpha=.4,i.setVisible(!1),i.setDepth(1.5),this.playerFeedbackArray.push(i)}for(let e=0;e<5;e+=1){const a=500+40*e,s=this.aiX2-150,i=this.gameScene.add.graphics();i.fillStyle(t),i.fillRect(s,a,300,30),i.alpha=.4,i.setVisible(!1),i.setDepth(1.5),this.aiFeedbackArray.push(i)}}clearAtributesOnCard(){for(const t of this.attributeButtons)t.destroy();for(const t of this.attributestatics)t.destroy();this.attributestatics=[],this.attributeButtons=[]}flipCard(t,e,a){t.scaleX=-1,this.gameScene.tweens.add({targets:t,scaleX:1,duration:250,onComplete:()=>{t.setTexture(a),this.gameScene.tweens.add({targets:t,scaleX:1.25,duration:250,onComplete:()=>{}})}})}}