import { LockerEvents } from '../../../../pages/safe/events';
import { CustomEventService, IdService } from '../../../../services';

class SafeLockerKey extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.id = this.getAttribute('key') || '';
      this.label = this.getAttribute('label') || '';
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    disconnectedCallback() {
        IdService.remove(this.$key);
    }

    initForm() {    
       this.$key = IdService.idAndClick(`key-${this.id}`, this.shadow, () => {
          CustomEventService.send(LockerEvents.keyPress, this.label);
       });
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            .safe-key {
              width: 40px;
              height: 40px;
              margin: 6px;
              border: 1px solid grey;
              user-select: none;

              &:hover {
                border: 1px solid orange;
                background-color: #636162;
                color: #050801;
                box-shadow:
                  0 0 5px #636162,
                  0 0 25px #636162,
                  0 0 50px #636162,
                  0 0 200px #636162;
              }

              & button {
                width: 40px;
                height: 40px;
              }
            }
          </style>
          <div class="safe-key">
            <button id="key-${this.id}"> 
                ${this.label}
            </button>
          </div>    
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("safe-locker-key", SafeLockerKey);
  }
