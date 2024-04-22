// @ts-nocheck
import { objectPropertyAmount, sample } from '../../../services/utils';
import { SaveObjects } from '../../../components/common/saves';
import DataStorage from '../../../services/storage';
import { CommonEvents, CustomEvents, CustomPageEvents, CustomWindowEvents } from '../../../settings';
import EnvService from '../../../services/api/envService';
import { CustomEventService, IdService, StyleService } from '../../../services';

class AccountIcon extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isAccVisible = false;
      this.isRandomSelect = false;
      this.updateButton = false; 
      this.icon = '';
      this.variants = ['', '_blue', '_red', '_yellow', '_green',
        '_wh', '_white', '_whred', '_whblue', '_whyellow',
        '_blond', '_wm', '_wmblack', '_wmblckblond', '_wmblond'];
      this.loggedUser = {};
      this.iconEvents = {
        init: 'init',
        change: 'change',
        select: 'select'
      };
      this.storage = new DataStorage();
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    disconnectedCallback() {
      CustomEventService.removeList([
        CustomPageEvents.users.account.init, 
        CustomPageEvents.users.account.hide
      ]);
      IdService.removeList([this.$image, this.$change]);
    }

    initForm() {
      CustomEventService.event(CustomPageEvents.users.account.init, (e) => {
        this.loggedUser = e.detail.value;
        this.showUserIcon(this.loggedUser, this.iconEvents.init);
      });

      CustomEventService.event(`${CustomEvents.interaction.selectChange}-iconSelect`, (e) => {
        let selected = e.detail.value;
        selected = selected.substr(5, selected.length - 1);
        this.toggleIcon(this.iconEvents.select, selected);
      });

      CustomEventService.event(CustomWindowEvents.iconSelect.close, () => {
        IdService.remove(this.$change);
      });

      CustomEventService.event(CustomPageEvents.users.account.hide, () => {
        this.setIcon('');
      });
    }

    setIconSelectHandler() {
      this.$image = IdService.idAndClick('image', this.shadow, () => {
        this.toggleIcon(this.iconEvents.change, '');
      });

      this.$change = IdService.id('changeIcon', this.shadow);
      if (this.$change) {
        IdService.event(this.$change, CommonEvents.click, () => {
          CustomEventService.send(CustomWindowEvents.iconSelect.open);
        });
      }
    }

    showUserIcon(loggedUser, event, selected) {
      if (objectPropertyAmount(loggedUser) < 1) {
        return;
      }
      
      const { username } = loggedUser;
      this.icon = this.setIconImage(event, this.variants);
      if (event === this.iconEvents.select) {
        this.icon = this.setIconFromSelect(selected);
      }

      const html = `
        <div class="icon">
          <img id="image" src="${this.icon}" alt="icon" />
          <span>${username}</span>
          <div id="change">
            <action-button id="changeIcon" label="Change image" type="highlight"></action-button>
          </div>
        </div>
      `;

      this.setIcon(html);
      this.setIconSelectHandler();
    }

    toggleIcon(evt = this.iconEvents.change, selected) {
      this.showUserIcon(this.loggedUser, evt, selected);
      if (this.updateButton) {
         const el = IdService.id('change', this.shadow);
        StyleService.setDisplay(el, false);
        setTimeout(() => { StyleService.setDisplay(el, true) }, 2000);
      }
    }

    setIconImage(event, variants) {
      const saved = this.storage.getItem(SaveObjects.account.icon);
  
      const index = sample(variants);
      let source = variants[index];

      if (saved) {
        source = saved;
      }
      if (event === this.iconEvents.change) {
        source = variants[index];
      }

      this.storage.save(SaveObjects.account.icon, source);
      return `${this.getIconSource()}${source}.png`;
    }

    setIconFromSelect(selected) {
      const source = selected;
      this.storage.save(SaveObjects.account.icon, source);
      return `${this.getIconSource()}${source}.png`;
    }

    getIconSource() {
      return `${EnvService.getRoot()}assets/account/profile`;
    }

    setIcon(html) {
      const el = IdService.id('profile', this.shadow);
      el.innerHTML = html;
    }

    render() {
      const varias = JSON.stringify(this.variants);
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
          <icon-select 
            id="iconSelect" 
            source="${this.getIconSource()}" 
            items='${varias}'
            columns-md="1"
            columns-xs="1"
          >
          </icon-select>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("account-icon", AccountIcon);
  }
  