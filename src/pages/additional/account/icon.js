// @ts-nocheck
import { objectPropertyAmount, sample } from '../../../services/utils';
import DataStorage from '../../../services/storage';
import { CustomPageEvents } from '../../../settings';
import GlobalsService from '../../../services/globalsService';

class AccountIcon extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isAccVisible = false;
      this.icon = '';
      this.loggedUser = {};
      this.storage = new DataStorage();
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    disconnectedCallback() {
      document.removeEventListener(CustomPageEvents.users.account.init, null);
      document.removeEventListener(CustomPageEvents.users.account.hide, null);
    }

    initForm() {
      document.addEventListener(CustomPageEvents.users.account.init, (evt) => {
        this.loggedUser = evt.detail.value;
        this.showUserIcon(this.loggedUser);
      });

      document.addEventListener(CustomPageEvents.users.account.hide, () => {
        this.setIcon('');
      });
    }

    showUserIcon(loggedUser) {
      if (objectPropertyAmount(loggedUser) < 1) {
        return;
      }
      
      const { username } = loggedUser;
      const variants = ['', '_blue', '_red', '_yellow', '_wh', '_white', '_whred', '_whblue', '_whyellow'];
      const index = sample(variants);
      
      this.icon = `${GlobalsService.getRoot()}assets/account/profile${variants[index]}.png`;

      const html = `
        <div class="icon">
          <img src="${this.icon}" alt="icon" />
          <span>${username}</span>
        </div>
      `;

      this.setIcon(html);
    }

    setIcon(html) {
      const el = this.shadow.getElementById('profile');
      el.innerHTML = html;
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            #profile {
              width: 100px;
              height: 100px;
            }
            .icon {
              text-align: center;
              span {
                font-size: smaller;
                padding-bottom: 4px;
              }
            }
          </style>
          <div id="profile"></div> 
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("account-icon", AccountIcon);
  }
  