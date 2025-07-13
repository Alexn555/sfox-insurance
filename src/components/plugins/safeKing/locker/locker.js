import { LockerEvents } from '../../../../pages/safe/events';
import { CustomEventService, IdService, StyleService, HTMLService } from '../../../../services';
import { ArrayService, NumberService } from '../../../../services/utils';
import { SafeKingSets } from '../sets';
import { classes } from '../enums';

class SafeLocker extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.codeDisplay = 'code-display';
      this.codeLen = 4;
      this.keyDigits = 10;
      this.theCode = '';
      this.curCodeDigit = 0;
      this.$keys = [];
      this.code = '';
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {    
      this.$codeDisplay = IdService.id(this.codeDisplay, this.shadow);
      this.setHandlers();
      this.setReset();
      this.toggleCurCodeDigit(0);
      this.setupKeys();
    }

    setHandlers() {
      CustomEventService.event(LockerEvents.codeStart, (e) => {
        this.theCode = e.detail.value;
        this.resetVal();
      });

      CustomEventService.event(LockerEvents.keyPress, (e) => {
        let val = e.detail.value;
        if (val && !this.isHelpDigit(val)) {
          this.code += val;
          this.curCodeDigit += 1;
          this.setKeysActive(this.curCodeDigit);
          if (this.code && this.code.length <= this.codeLen) {
            this.setCode(this.code);
            this.guessCode(this.code);
          }
        }
      });
    }

    isHelpDigit(key) {
      return key.indexOf('Digit') !== -1;
    }

    setupKeys() {
      if (!SafeKingSets.enableHintKeys) { return; }
      for (let i = 0; i < this.keyDigits; i++) {
        this.$keys[i] = IdService.id('key'+i, this.shadow);
      }
      this.resetClasses();
    }

    resetClasses() {
      if (!SafeKingSets.enableHintKeys) { return; }
      for (let i = 0; i < this.keyDigits; i++) {
        this.$keys[i].setAttribute('class-name', classes.normal);
      }
    }

    setKeysActive(digitNumber) {
      if (digitNumber < this.codeLen && SafeKingSets.enableHintKeys) {
        this.resetClasses();

        let correctDigit = this.theCode.charAt(digitNumber);
        this.$keyCorrect = IdService.id(`key${correctDigit}`, this.shadow);
        this.$keyCorrect.setAttribute('class-name', classes.active);

        let randDigits = [ 
          NumberService.randomInteger(0, this.keyDigits - 1),
          NumberService.randomInteger(0, this.keyDigits - 1)
        ];

        randDigits.forEach((randDigit) => {
          let keyFriend = IdService.id(`key${randDigit}`, this.shadow);
          keyFriend.setAttribute('class-name', classes.active);
        });
      }
    }

    toggleCurCodeDigit(toggle) {
      this.curCodeDigit = toggle;
    }

    guessCode(code) {
      if (code.length === this.codeLen) {
        CustomEventService.send(LockerEvents.codeGuess, code);
      }
    }

    setReset() {
      this.$reset = IdService.idAndClick('reset-btn', this.shadow, () => {
        this.resetVal();
      });
    }

    resetVal() {
      this.code = '';
      this.setCode(' ');
      this.toggleCurCodeDigit(0);
      this.resetClasses();
    }

    setCode(code) {
      if (code) {
        this.setGuessHighlight(code, this.theCode);
        HTMLService.text(this.$codeDisplay, code);
      }
    }

    setGuessHighlight(code, theCode) {
      let checkCode = theCode.substr(0, code.length);
      let correct = checkCode === code ? 'blue' : 'red';
      StyleService.setProperty(this.$codeDisplay, 'color', correct);
    }

    showDigits(keys = []) {
      let html = '';
      if (ArrayService.minLength(keys)) {
        for (let i = 0, l = keys.length; i < l; i++) {
          html += `<safe-locker-key id="key${keys[i]}" label="${keys[i]}"></safe-locker-key>`;
        }
      }
      return html;
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            .safe-locker {
              width: 300px;
              background-color: #dcdcdc;
              border: 4px solid brown;
            }
            
            #${this.codeDisplay} {
              border: 1px solid black;
              background-color: #ededed;
              padding: 10px;
              width: 120px;
              height: 10px;
              margin: 10px;
              color: blue;
              font-weight: bold;
              line-height: 10px;
            }
            
            #keyboard {
              display: grid;
              grid-template-columns: 30% 30% 30%;
              width: 300px;
            }

            #reset {
              padding-top: 8px;
              & button {
                width: 100px;
                height: 30px;
              }
            }
          </style>
          <div class="safe-locker">
            <div id="${this.codeDisplay}"></div>
            <div id="keyboard">
              <div>
                ${this.showDigits([0, 1, 2, 3])}
              </div>
              <div>
                ${this.showDigits([4, 5, 6])}
              </div>
              <div>
                ${this.showDigits([7, 8, 9])}
              </div>
              <div id="reset">
                <button id="reset-btn"> 
                  Reset
                </button>
              </div>
            </div>
            <div>
              <safe-locker-tip></safe-locker-tip>
            </div>
          </div>    
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("safe-locker", SafeLocker);
  }
