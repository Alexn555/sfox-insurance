// @ts-nocheck
import { objectPropertyAmount, sample } from '../../../services/utils';
import { SaveObjects } from '../../../components/common/saves';
import DataStorage from '../../../services/storage';
import { CommonEvents, CustomPageEvents } from '../../../settings';
import EnvService from '../../../services/api/envService';
import { StyleService } from '../../../services';

class AccountIcon extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isAccVisible = false;
      this.icon = '';
      this.loggedUser = {};
      this.iconEvents = {
        init: 'init',
        change: 'change'
      };
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
        this.showUserIcon(this.loggedUser, this.iconEvents.init);
      });

      this.shadow.addEventListener(CommonEvents.click, this.toggleIcon.bind(this));

      document.addEventListener(CustomPageEvents.users.account.hide, () => {
        this.setIcon('');
      });
    }

    showUserIcon(loggedUser, event) {
      if (objectPropertyAmount(loggedUser) < 1) {
        return;
      }
      
      const { username } = loggedUser;
      this.icon = this.setIconImage(event);

      const html = `
        <div class="icon">
          <img src="${this.icon}" alt="icon" />
          <span>${username}</span>
          <div id="change">
            <action-button id="changeIcon" label="Change image" type="highlight"></action-button>
          </div>
        </div>
      `;

      this.setIcon(html);
    }

    toggleIcon() {
      this.showUserIcon(this.loggedUser, this.iconEvents.change);
      
      const el = this.shadow.getElementById('change');
      StyleService.setDisplay(el, false);
      setTimeout(() => { StyleService.setDisplay(el, true) }, 2000);
    }

    setIconImage(event) {
      const saved = this.storage.getItem(SaveObjects.account.icon);
      const variants = ['', '_blue', '_red', '_yellow', '_green',
      '_wh', '_white', '_whred', '_whblue', '_whyellow',
     '_blond', '_wm', '_wmblond'];
      const index = sample(variants);
      let source = variants[index];

      if (saved) {
        source = saved;
      }
      if (event === this.iconEvents.change) {
        source = variants[index];
      }

      this.storage.save(SaveObjects.account.icon, source);
      return `${EnvService.getRoot()}assets/account/profile${source}.png`;
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
  