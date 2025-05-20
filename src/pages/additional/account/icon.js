// @ts-nocheck
import { NumberService, ObjectService } from '../../../services/utils';
import { SaveObjects } from '../../../components/common/saves';
import { CommonEvents, CustomEvents, CustomPageEvents, CustomWindowEvents } from '../../../settings';
import EnvService from '../../../services/api/envService';
import { CustomEventService, IdService, HTMLService } from '../../../services';
import { JSONService } from '../../../services/utils';
import { Account } from '../../../settings';

class AccountIcon extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
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
      if (this.$image && this.$change) {
        IdService.removeList([this.$image, this.$change]);
      }
    }

    initForm() {
      CustomEventService.event(CustomPageEvents.users.account.init, (e) => {
        this.loggedUser = e.detail.value;
        this.showUserIcon(this.loggedUser, this.iconEvents.init);
      });

      CustomEventService.event(`${CustomEvents.interaction.selectChange}-iconSelect`, (e) => {
        let selected = e.detail.value;
        selected = selected.substr(5, selected.length - 1);
        this.showUserIcon(this.loggedUser, this.iconEvents.select, selected);
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
        if (Account.details.randomIcon) {
          this.showUserIcon(this.loggedUser, this.iconEvents.change, '');
        }
      });

      this.$change = IdService.id('changeIcon', this.shadow);
      if (this.$change) {
        IdService.event(this.$change, CommonEvents.click, () => {
          CustomEventService.send(CustomWindowEvents.iconSelect.open);
        });
      }
    }

    showUserIcon(loggedUser, event, selected) {
      if (ObjectService.objectPropertyAmount(loggedUser) < 1) {
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

    setIconImage(event, variants) {
      const saved = window.DataStorage.getItem(SaveObjects.account.icon);
  
      const index = NumberService.sample(variants);
      let source = variants[index];

      if (saved) {
        source = saved;
      }
      if (event === this.iconEvents.change) {
        source = variants[index];
      }

      window.DataStorage.save(SaveObjects.account.icon, source);
      return `${this.getIconSource()}${source}.png`;
    }

    setIconFromSelect(selected) {
      const source = selected;
      window.DataStorage.save(SaveObjects.account.icon, source);
      return `${this.getIconSource()}${source}.png`;
    }

    getIconSource() {
      return `${EnvService.getRoot()}assets/account/profile`;
    }

    setIcon(html) {
      const el = IdService.id('profile', this.shadow);
      HTMLService.html(el, html);
    }

    render() {
      const varias = JSONService.set(this.variants);
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
  