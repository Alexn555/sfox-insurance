// @ts-nocheck
import ThemeHelper from '../../../../theme/themeHelper';
import { PackIds } from '../../../../theme/enums';
import { CustomEventService, IdService } from '../../../../services';
import { NumberService } from '../../../../services/utils';
import { LockerEvents } from '../../../../pages/safe/events';
import { textures } from '../enums';
import { SafeKingSets } from '../sets';

class SafeGame extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.score = 0;
      this.bonus = 0;
      this.theme = ThemeHelper.get(PackIds.safePage).game.bonus;
      this.sets = SafeKingSets.bonus;
      this.ctx = null;
      this.$animationTimer = null;
      const stgsAnm = this.sets.animation;
      this.duration = stgsAnm.useInterval ? stgsAnm.durationInterval : stgsAnm.durationFrame;

      this.mainAnimation = {
        clear: false,
        scale: 1.5
      };
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {    
      this.$score = IdService.id('score', this.shadow);
      this.$canvas = IdService.id('bonusCanvas', this.shadow);
      this.ctx = this.$canvas.getContext('2d');
      this.$prize = IdService.id('prize', this.shadow);
      this.$card = IdService.id('card', this.shadow);
      this.$winner = IdService.id('winner', this.shadow);
      this.setTextures();
      this.setHandlers();
    }

    setTextures() {
        if (this.$prize) {
            this.$prize.setAttribute('src', this.setPrizeImage());
        }
        this.setBonusCard();
    }

    setHandlers() {
      CustomEventService.event(LockerEvents.doorOpen, (e) => {
        this.setTextures();
        this.resetAnimation();

        const curWin = e.detail.value;
        const bonus = this.getBonus();
        this.toggleScore(curWin + bonus);
        this.drawScore();
        this.animate(this.drawWin.bind(this));
      });
    }    

    setPrizeImage() {
        if (this.sets.animation.randomPrize) {
            const prizes = [textures.dollar, textures.coin, textures.card];
            const selectedIndex = NumberService.randomInteger(0, prizes.length - 1);
            this.mainAnimation.scale = selectedIndex === 1 ? 1 : 1.5;
            return prizes[selectedIndex];
        }
        return textures.dollar;
    }

    setBonusCard() {
        const cardNumber = NumberService.randomInteger(11, 14);
        this.$winner.setAttribute('src', `${textures.winner}/${cardNumber}d.gif`);
    }

    getBonus() {
        this.bonus = NumberService.randomInteger(10, 500);
        return this.bonus;
    }

    toggleScore(val) {
        if (val) {
            this.score = val; 
        }
    }

    rotateImage(img, props, clear = true) {
        const iw = img.naturalWidth * props.scale;
        const ih = img.naturalHeight * props.scale;
        const axisLen = Math.hypot(props.axisX, props.axisY);
        const nAx = props.axisX / axisLen;
        const nAy = props.axisY / axisLen;
        const wScale = Math.cos(props.rotate);
        const ctx = this.ctx;

        const w = this.$canvas.width;
        const h = this.$canvas.height;
        if (clear) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, w, h);
        }
      
        ctx.setTransform(nAy * wScale, -nAx * wScale, nAx, nAy, props.centerX, props.centerY);
        ctx.globalAlpha = 1;
        ctx.drawImage(img, -iw * 0.5, -ih * 0.5, iw, ih);
        if (props.backCol) {
            ctx.globalAlpha = wScale < 0 ? 1 : 1 - wScale;
            ctx.fillStyle = props.backCol;
            ctx.fillRect(-iw * 0.5, -ih * 0.5, iw, ih);
        }
    }

    animate(onComplete = () => {}) {
        let duration = 0;
        let rotate = this.sets.animation.rotate;
        const w = this.$canvas.width;
        const h = this.$canvas.height;

        const play = () => {
            if (rotate) {
                const props = {
                    axisX: 0, 
                    axisY: 90, 
                    rotate: duration / 10, 
                    centerX: w * 0.5, 
                    centerY: h * 0.5, 
                    scale: this.mainAnimation.scale, 
                    backCol: ''
                };        
                this.rotateImage(this.$prize, props, this.mainAnimation.clear);
            } else {
                // lay dollars stack
                const stack = {
                    axisX: 20 * duration, 
                    axisY: 300, 
                    rotate: duration * 10, 
                    centerX: duration * 2, 
                    centerY: 100, 
                    scale: 1, 
                    backCol: ''
                };
                this.rotateImage(this.$prize, stack, false);
            }

            if (duration > this.duration) {
                duration = 0;
                const props = {
                    axisX: 0, 
                    axisY: 90, 
                    rotate: duration / 10, 
                    centerX: w * 0.5, 
                    centerY: h * 0.5, 
                    scale: 1.5, 
                    backCol: ''
                };        
                this.resetAnimation();
                onComplete(props);
                return;
            } else {
                if (!this.sets.animation.useInterval) {
                    window.requestAnimationFrame(play);
                }
            }

           duration += 1;
        };
        
        if (this.sets.animation.useInterval) {
            this.$animationTimer = setInterval(() => { play(); }, 60); 
        } else {
            window.requestAnimationFrame(play);
        }
    }

    drawWin(props) {
        this.drawScore();
        this.rotateImage(this.$winner, props, false);
        setTimeout(() => {
            CustomEventService.send(LockerEvents.bonusClose);
        }, 2000);
    }

    resetAnimation() {
        clearInterval(this.$animationTimer);
        this.$animationTimer = null;
        this.clear();
    }

    drawScore() {
        const ctx = this.ctx;
        ctx.font = "bold 18px Courier";
        ctx.fontWeight = 'bold';
        ctx.fillText(`Your score ${this.score}`, 70, 250);
    }

    clear() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            .bonus-game {
                background-color: ${this.theme.background};
            }
            .image {
                display: none;
            }
          </style>
          <div class="bonus-game">
            <div class="image">
                <img id="prize" width="160" height="80" />
                <img id="card" width="160" height="80" />
                <img id="winner" width="160" height="80" />
            </div>
            <canvas id="bonusCanvas" width="300" height="300"></canvas>
          </div>    
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("safe-bonus", SafeGame);
  }
