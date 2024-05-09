import { LockerEvents } from '../../../../pages/safe/events';
import { CustomEventService, IdService, StyleService, HTMLService } from '../../../../services';
import { NumberService } from '../../../../services/utils';
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
        const val = e.detail.value;
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
      for (let i = 0; i < this.keyDigits; i++) {
        this.$keys[i] = IdService.id('key'+i, this.shadow);
      }
      this.resetClasses();
    }

    resetClasses() {
      for (let i = 0; i < this.keyDigits; i++) {
        this.$keys[i].setAttribute('class-name', classes.normal);
      }
    }

    setKeysActive(digitNumber) {
      if (digitNumber < this.codeLen) {
        this.resetClasses();

        const correctDigit = this.theCode.charAt(digitNumber);
        this.$keyCorrect = IdService.id(`key${correctDigit}`, this.shadow);
        this.$keyCorrect.setAttribute('class-name', classes.active);

        const randDigits = [ 
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
      const checkCode = theCode.substr(0, code.length);
      const correct = checkCode === code ? 'blue' : 'red';
      StyleService.setProperty(this.$codeDisplay, 'color', correct);
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            .safe-locker {
              border: 1px solid brown;
            }
            
            #${this.codeDisplay} {
              border: 1px solid black;
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
                <safe-locker-key id="key0" label="0"></safe-locker-key>
                <safe-locker-key id="key1" label="1"></safe-locker-key>
                <safe-locker-key id="key2" label="2"></safe-locker-key>
                <safe-locker-key id="key3" label="3"></safe-locker-key>
              </div>
              <div>
                <safe-locker-key id="key4" label="4"></safe-locker-key>
                <safe-locker-key id="key5" label="5"></safe-locker-key>
                <safe-locker-key id="key6" label="6"></safe-locker-key>
              </div>
              <div>
                <safe-locker-key id="key7" label="7"></safe-locker-key>
                <safe-locker-key id="key8" label="8"></safe-locker-key>
                <safe-locker-key id="key9" label="9"></safe-locker-key>
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
