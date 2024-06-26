import { LockerEvents } from '../../../../pages/safe/events';
import { CustomEventService, IdService, StyleService } from '../../../../services';
import { classes } from '../enums';

class SafeLockerKey extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.id = this.getAttribute('id') || '';
      this.label = this.getAttribute('label') || '';
      this.className = this.getAttribute('class-name') || '';
    }
  
    static get observedAttributes() { 
      return ['class-name']; 
    }

    connectedCallback() {
      this.render();
      this.initForm();
      this.setActiveCl(this.className);
    }

    disconnectedCallback() {
      IdService.remove(this.$key);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (this.$key && name === 'class-name') {
        this.className = oldValue !== newValue ? newValue : oldValue;
        this.setActiveCl(this.className);
      }
    }

    initForm() {    
      this.$key = IdService.idAndClick(this.id, this.shadow, () => {
        CustomEventService.send(LockerEvents.keyPress, this.label);
      });
    }

    setActiveCl(actCl) {
      if (actCl !== '') {
        StyleService.removeAndAddClass(this.$key, [classes.active, classes.normal], actCl);
      }
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
            .${classes.active} {
              background-color: #dcdcdc;
              border: 2px solid black;
            }
            .${classes.normal} {
              border: none;
            }
          </style>
          <div class="safe-key">
            <button id="${this.id}"> 
              ${this.label}
            </button>
          </div>    
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("safe-locker-key", SafeLockerKey);
  }
