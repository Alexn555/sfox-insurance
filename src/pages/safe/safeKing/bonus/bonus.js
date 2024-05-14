// @ts-nocheck
import ThemeHelper from '../../../../theme/themeHelper';
import { PackIds } from '../../../../theme/enums';
import { CustomEventService, IdService } from '../../../../services';
import { NumberService } from '../../../../services/utils';
import { LockerEvents } from '../../../../pages/safe/events';
import BonusDrawer from './drawer';
import { textures } from '../enums';
import { SafeKingSets } from '../sets';

class SafeGame extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.theme = ThemeHelper.get(PackIds.safePage).game.bonus;
      this.background = this.theme.background;
      this.score = 0;
      this.bonus = 0;
      this.ctx = null;
      this.$animationTimer = null;
      this.stgs = SafeKingSets.bonus;
      this.duration = this.stgs.useInterval ? this.stgs.durationInterval : this.stgs.durationFrame;

      this.mainAnimation = {
        clear: false,
        scale: 1.5
      };
      this.drawer = new BonusDrawer();
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
      this.drawer.setContext(this.ctx, this.$canvas);
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
        this.drawer.drawScore(this.score);
        this.animate(this.drawWin.bind(this));
      });
    }    

    setPrizeImage() {
        if (this.stgs.randomPrize) {
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

    animate(onComplete = () => {}) {
        let duration = 0;
        let rotate = this.stgs.rotate;
        let w = this.$canvas.width;
        let h = this.$canvas.height;

        const play = () => {
            if (rotate) {
                let props = {
                    axisX: 0, 
                    axisY: 90, 
                    rotate: duration / 10, 
                    centerX: w * 0.5, 
                    centerY: h * 0.5, 
                    scale: this.mainAnimation.scale, 
                    backCol: ''
                };        
                this.drawer.rotateImage(this.$prize, props, this.mainAnimation.clear);
            } else {
                // lay dollars stack
                let stack = {
                    axisX: 20 * duration, 
                    axisY: 300, 
                    rotate: duration * 10, 
                    centerX: duration * 2, 
                    centerY: 100, 
                    scale: 1, 
                    backCol: ''
                };
                this.drawer.rotateImage(this.$prize, stack, false);
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
                if (!this.stgs.useInterval) {
                    window.requestAnimationFrame(play);
                }
            }

           duration += 1;
        };
        
        if (this.stgs.useInterval) {
            this.$animationTimer = setInterval(() => { play(); }, 60); 
        } else {
            window.requestAnimationFrame(play);
        }
    }

    drawWin(props) {
        this.drawer.drawScore(this.score);
        this.drawer.drawBonusWinnings(this.bonus);
        this.animateGlow();

        this.drawer.rotateImage(this.$winner, props, false);
      
        setTimeout(() => {
            this.drawer.clear();
            this.drawer.clearGlow();
            CustomEventService.send(LockerEvents.bonusClose);
        }, this.stgs.shuffleTime * 1000);
    }

    resetAnimation() {
        clearInterval(this.$animationTimer);
        this.$animationTimer = null;
        this.drawer.clear();
    }

    animateGlow() {
        if (!this.stgs.animateGlow) {
            this.drawer.drawGlow();
            return;
        }

        let d = 0;
        let colors = ['blue', 'red', 'orange'];
        this.drawer.drawGlow(colors[NumberService.randomInteger(0, colors.length)]);
        const play = () => {
            this.drawer.drawLine(d * 2);
        
            if (d % 3 === 0) {
               this.drawer.clearGlow();
            }
            if (d < 100) {
                window.requestAnimationFrame(play.bind(this));  
            }
            d += 1;
        };
        window.requestAnimationFrame(play.bind(this));
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            .bonus-game {
                background-color: ${this.background};
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
