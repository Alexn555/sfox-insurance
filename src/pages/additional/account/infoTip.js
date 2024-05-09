// @ts-nocheck
import { transitionAnimate } from '../../../components/common/styles/animations';
import { HTMLService, IdService, StyleService } from '../../../services';

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
      this.$elBtn = IdService.idAndClick('infoBtn', this.shadow, this.toggleInfo.bind(this));
    }

    toggleInfo() {
      const el = IdService.id('info', this.shadow);
      StyleService.setProperty(el, 'height', '80px');
      HTMLService.html(el, '<span>User: <b>player</b> password: <b>ads123</b></span>');
      setTimeout(() => { 
        HTMLService.html(el, ''); 
        StyleService.setProperty(el, 'height', '0px'); 
      }, 3000);
    }

    disconnectedCallback() {
      IdService.remove(this.$elBtn);
    }
  
    render() {
      HTMLService.html(this.shadow, `
          <style>
            #info {
              background-color: #e6e6e6;
              height: 0px;
              ${transitionAnimate('height', 2)}
            }
          </style>
          <action-button id="infoBtn" label="Info" type="highlight"></action-button>  
          <div id="info"></div>    
       `);
    }
  }
  
  if ("customElements" in window) {
    customElements.define("login-info", AccountLoginInfo);
  }
  