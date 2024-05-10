import ThemeHelper from '../../../theme/themeHelper';
import { PackIds } from '../../../theme/enums';
import { CustomEventService, IdService, LoggerService, HTMLService } from '../../../services';
import { NumberService } from '../../../services/utils';
import { LockerEvents } from '../../../pages/safe/events';
import { SafeKingSets } from './sets';

class SafeGame extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.score = 0;
      this.tries = 0;
      this.theCode = '';
      this.theme = ThemeHelper.get(PackIds.safePage);
      this.awardCl = {
        guess: 'guess',
        notGuess: 'notGuess'
      };
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {    
      this.$score = IdService.id('score', this.shadow);
      this.$note = IdService.id('note', this.shadow);
      this.$codeGenerator = IdService.idAndClick('generator', this.shadow, this.generateTheCode.bind(this));
      this.setGameHandlers();
      this.generateTheCode();
    }

    generateTheCode() {
      this.theCode = NumberService.randomInteger(1000, 9999).toString();
      LoggerService.warn(`Safe game code ${this.theCode}`);
      CustomEventService.send(LockerEvents.codeStart, this.theCode);
      this.resetScore();
      this.setNote(' ', this.awardCl.guess);
    }

    setGameHandlers() {
      CustomEventService.event(LockerEvents.codeGuess, (e) => {
        const guessCode = e.detail.value;
        const curScore = this.getScore();
        const prize = this.checkCodeAward(guessCode, this.theCode, this.tries);
        if (prize > 0) {
          this.setScore(curScore + prize);
          this.setNote('You guessed the code!', this.awardCl.guess);
        } else {
          this.setNote('Your guess not correct', this.awardCl.notGuess);
          setTimeout(() => { this.setNote(' ', this.awardCl.notGuess) }, 1000);
        }
      });

      CustomEventService.event(LockerEvents.deductPenalty, (e) => {
        if (SafeKingSets.deductPenalty) {
          const penalty = e.detail.value;
          const curScore = this.getScore();
          this.tries += 1;
          this.setScore(curScore - penalty);
        }
      });
    }

    checkCodeAward(guessCode, realCode, tries) {
      let prize = 0;
      if (guessCode === realCode) {
        if (tries === 0) {
          prize = 500;
        } else if(tries > 0 && tries <= 3) {
          prize = 200;
        } else if (tries > 3 && tries < 10) {
          prize = 100;
        } else {
          prize = 50;
        }
      }
      return prize;
    }

    getScore() {
      return this.score;
    }

    setScore(val) {
      if (val) {
        this.score = val;
        HTMLService.html(this.$score, `Score: <b>${val}</b>`);
      }
    }

    resetScore() {
      if (this.$score) {
        HTMLService.html(this.$score, `Score: <b>0</b>`);
      }
    }
    
    setNote(val, cl) {
      if (this.$note && val) {
        HTMLService.html(this.$note, `<span class="${cl}">${val}</span>`);
      }
    }

    render() {
      HTMLService.html(this.shadow, `
          <style>
            .safe-game {
              padding: 2px 0 20px 0;
              border: 1px dashed ${this.theme.game.border};

              .board {
                display: grid;
                grid-template-columns: 30% 30% 30%;
              }

              #genCode {
                button {
                  width: 200px;
                  height: 20px;
                }
              }

              #score {
                padding: 20px;
                width: 100px;
                heigth: 30px;
              }

              #note {
                padding: 20px;
                width: 100px;
                heigth: 20px;
                color: blue;
                font-weight: bold;
                border: 1px solid ${this.theme.game.noteBorder};

                & span.guess {
                  color: blue;
                }
                & span.notGuess {
                  color: black;
                }
              }
            }
          </style>
          <div class="safe-game">
            <div class="board">
              <div id="score">Score: 0</div>
              <div id="genCode"> 
                <button id="generator">
                  Start code
                </button>
                </div>
              <div id="note"></div>
            </div> 
            <safe-locker id="locker"></safe-locker>
          </div>    
       `);
    }
  }
  
  if ("customElements" in window) {
    customElements.define("safe-game", SafeGame);
  }
