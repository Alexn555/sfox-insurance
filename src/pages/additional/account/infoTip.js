// @ts-nocheck
import { CommonEvents } from '../../../settings';

class AccountLoginInfo extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {
      this.$elBtn = this.shadow.getElementById('infoBtn');
      this.$elBtn.addEventListener(CommonEvents.click, this.toggleInfo.bind(this));
    }

    toggleInfo() {
      const el = this.shadow.getElementById('info');
      el.innerHTML = '<span>User: <b>player</b> password: <b>ads123</b></span>';
      setTimeout(() => { el.innerHTML = ''}, 2000);
    }

    disconnectedCallback() {
      this.$elBtn.removeEventListener(CommonEvents.click, null);
    }
  
    render() {
      this.shadow.innerHTML = `
            <style>
             #info {
                  background-color: white;
                }
             }
            </style>
            <action-button id="infoBtn" label="Info" type="highlight"></action-button>  
            <div id="info"></div>    
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("login-info", AccountLoginInfo);
  }
  