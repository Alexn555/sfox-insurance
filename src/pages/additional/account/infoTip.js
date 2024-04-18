// @ts-nocheck
import { CommonEvents } from '../../../settings';
import { transitionAnimate } from '../../../components/common/styles/animations';

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
      el.style.height = '80px'; 
      el.innerHTML = '<span>User: <b>player</b> password: <b>ads123</b></span>';
      setTimeout(() => { el.innerHTML = '';  el.style.height = '0px'; }, 3000);
    }

    disconnectedCallback() {
      this.$elBtn.removeEventListener(CommonEvents.click, null);
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>
            #info {
              background-color: #e6e6e6;
              height: 0px;
              ${transitionAnimate('height', 2)}
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
  