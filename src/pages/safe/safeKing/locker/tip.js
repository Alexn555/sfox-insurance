import { LockerEvents } from '../../../../pages/safe/events';
import { CustomEventService, IdService, LoggerService, HTMLService } from '../../../../services';
import { StringService } from '../../../../services/utils';

class SafeLocker extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.codeDisplay = 'tip-code-display';
      this.code = '';
      this.penalty = 0;
      this.penaltyLimit = 200;
      this.tries = 0;
      this.tipTime = 1;
      this.theCode = '';
      this.helpDigits = ['Digit 1', 'Digit 2', 'Digit 3', 'Digit 4'];
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {    
      this.$codeDisplay = IdService.id(this.codeDisplay, this.shadow);
      this.setHandlers();
    }

    setHandlers() {
      CustomEventService.event(LockerEvents.codeStart, (e) => {
        const val = e.detail.value;
        this.theCode = val.toString();
      });

      CustomEventService.event(LockerEvents.keyPress, (e) => {
        const value = e.detail.value;
        if (value) {
          this.code += value;
          if (this.code && this.isHelpDigits(value)) {
            const { key, pos } = this.getTip(value, this.theCode);
            this.setCode(key, pos);
          }
        }
      });
    }

    getTip(val, theCode) {
      const helpKey = val.substr(6, 1);
      const foundKey = theCode.charAt(helpKey - 1);
      return { key: foundKey, pos: helpKey };
    }

    isHelpDigits(val) {
      const found = this.helpDigits.indexOf(val);
      return found !== -1;
    }

    setPenaltyFactor(tries) {
      let factor = 10;
      if (tries <= 1) {
          factor = 10;
      }
      if(tries > 1 && tries <= 4) {
          factor = 20;
      }
      if (tries > 4) {
          factor = 50;
      }
      return factor > this.penaltyLimit ? this.penaltyLimit : factor;
    }

    setPenalty() {
      this.tries += 1;
      this.penalty = this.tries * this.setPenaltyFactor(this.tries);
      LoggerService.log(`Code penalty ${this.penalty}`);
      CustomEventService.send(LockerEvents.deductPenalty, this.penalty);
    }

    setCode(code, pos) {
      if (code) {
        HTMLService.text(this.$codeDisplay, StringService.getMaskSymbol(code, pos, '*', 4));
        setTimeout(() => {
          HTMLService.text(this.$codeDisplay, ' ');
          this.setPenalty();
        }, this.tipTime * 1000);
      }
    }

    render() {
      HTMLService.html(this.shadow, `
          <style>
            .safe-tip {
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
              display: flex;
              flex-direction: row;
              width: 300px;
            }
          </style>
          <div class="safe-tip">
            <h3>Help with code guess</h3>
            <div id="${this.codeDisplay}"></div>
            <div id="keyboard">
                <safe-locker-key id="key20" label="Digit 1"></safe-locker-key>
                <safe-locker-key id="key21" label="Digit 2"></safe-locker-key>
                <safe-locker-key id="key22" label="Digit 3"></safe-locker-key>
                <safe-locker-key id="key23" label="Digit 4"></safe-locker-key>            
            </div>
          </div>    
       `);
    }
  }
  
  if ("customElements" in window) {
    customElements.define("safe-locker-tip", SafeLocker);
  }
