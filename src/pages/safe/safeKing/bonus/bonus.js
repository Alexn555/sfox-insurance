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
        this.animate();
      });
    }    

    setPrizeImage() {
        if (this.sets.animation.randomPrize) {
            const prizes = [textures.dollar, textures.card];
            return prizes[NumberService.randomInteger(0, prizes.length - 1)];
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

    rotateImage(img, axisX, axisY, rotate, centerX, centerY, scale = 1, backCol = '') {
        const iw = img.naturalWidth * scale;
        const ih = img.naturalHeight * scale;
        const axisLen = Math.hypot(axisX, axisY);
        const nAx = axisX / axisLen;
        const nAy = axisY / axisLen;
        const wScale = Math.cos(rotate);
        const ctx = this.ctx;
        ctx.setTransform(nAy * wScale, -nAx * wScale, nAx, nAy, centerX, centerY);
        ctx.globalAlpha = 1;
        ctx.drawImage(img, -iw * 0.5, -ih * 0.5, iw, ih);
        if (backCol) {
            ctx.globalAlpha = wScale < 0 ? 1 : 1 - wScale;
            ctx.fillStyle = backCol;
            ctx.fillRect(-iw * 0.5, -ih * 0.5, iw, ih);
        }
    }

    animate() {
        let duration = 0;
        let rotate = this.sets.animation.rotate;
        const w = this.$canvas.width;
        const h = this.$canvas.height;

        const play = () => {
            if (rotate) {
                this.rotateImage(this.$prize, 0, 90, duration / 10, w * 0.5, h * 0.5, 1.5, '');
            } else {
                // lay dollars stack
                this.rotateImage(this.$prize, 20 * duration, 300, duration * 10, duration * 2, 100, 1, '');
            }

            if (duration > this.duration) {
                duration = 0;
                this.resetAnimation();
                this.drawScore();
                this.rotateImage(this.$winner, 0, 90, duration / 10, w * 0.5, h * 0.5, 1.5, '');
           
                setTimeout(() => {
                    CustomEventService.send(LockerEvents.bonusClose);
                }, 2000);
                return
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

    resetAnimation() {
        clearInterval(this.$animationTimer);
        this.$animationTimer = null;
        this.clear();
    }

    renderLoop(time) { // @todo to improve
        if (!this.ctx || !this.$canvas) { return; }
        const ctx = this.ctx;
        const w = this.$canvas.width;
        const h = this.$canvas.height;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, w, h);
        
        this.rotateImage(this.$prize, Math.cos(time / 4200), Math.sin(time / 4200), time / 500, w * 0.5, h * 0.5, "#268C");
        window.requestAnimationFrame(this.renderLoop);
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
