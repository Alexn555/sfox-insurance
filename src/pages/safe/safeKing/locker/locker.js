import { LockerEvents } from '../../../../pages/safe/events';
import { CustomEventService, IdService, StyleService } from '../../../../services';

class SafeLocker extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.codeDisplay = 'code-display';
      this.codeLen = 4;
      this.theCode = '';
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
    }

    setCode(code) {
      if (code) {
        this.setGuessHighlight(code, this.theCode);
        this.$codeDisplay.innerText = code;
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
