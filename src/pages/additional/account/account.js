// @ts-nocheck
import { SaveObjects } from '../../../components/common/saves';
import { CustomEventService, IdService, LoggerService, StyleService } from '../../../services';
import { objectPropertyAmount } from '../../../services/utils';
import DataStorage from '../../../services/storage';
import { CustomPageEvents } from '../../../settings';

class AccountPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isAccVisible = false;
      this.loggedUser = {};
      this.statuses = {
        offline: 'offline',
        loggedIn: 'logged-in'
      };
      this.status = this.statuses.offline;
      this.events = {
        init: 'init',
        login: 'login'
      };
      this.storage = new DataStorage();
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {
      this.getSaveAccount();
      const statusEvt = this.loggedUser ? this.events.login : this.events.init;
      CustomEventService.send(CustomPageEvents.users.account.init, this.loggedUser);
      this.setSaveStatus(statusEvt);
 
      CustomEventService.event(CustomPageEvents.users.login, (e) => {
        if (!e.detail || !e.detail.value) {
          LoggerService.warn('Login data missing!');
          return;
        }
        this.loggedUser = e.detail.value;
        this.setAvailable(true, this.events.login);
      }, document);

      CustomEventService.event(CustomPageEvents.users.logout.button, this.logout.bind(this), document);
    }

    disconnectedCallback() {
      document.removeEventListener(CustomPageEvents.users.login, null);
    }

    getSaveAccount() {
      const saved = this.storage.getObject(SaveObjects.account.user);
      if (saved && saved.status === this.statuses.loggedIn) {
        this.loggedUser = saved;
        this.setStatus(this.statuses.loggedIn);
        this.toggleLogin(false);
      }
    }

    setAvailable(accessible, evt) {
      this.isAccVisible = accessible;
      if (accessible) {
        this.toggleLogin(false);
        this.setSaveStatus(evt);
        this.setStatus(this.statuses.loggedIn);
        CustomEventService.send(CustomPageEvents.users.account.init, this.loggedUser);
      }
    }

    setStatus(toggle) {
      this.status = toggle;
    }

    logout() {
      this.setStatus(this.statuses.offline);
      this.setDetails();
      this.toggleLogin(true);
      this.saveObjectAndStatus(this.statuses.offline);
    }
    
    setSaveStatus(event = this.events.init) {
      if (objectPropertyAmount(this.loggedUser) > 1 && event === this.events.login) {
        this.saveObjectAndStatus(this.statuses.loggedIn);
      }
    }

    setDetails() {
      CustomEventService.send(CustomPageEvents.users.account.hide);
    }

    toggleLogin(visible) {
      const $login = IdService.id('login', this.shadow);
      StyleService.setDisplay($login, visible);
    }
  
    saveObjectAndStatus(status) {
      this.loggedUser['status'] = status;
      this.storage.saveObject(SaveObjects.account.user, this.loggedUser);
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            .account {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }

            .details {
              position: relative;

              & div:nth-child(1) {
                position: absolute;
                left: 0;
                top: 50px;
                transform: translateX(-120px);
              }
            }
          </style>
          <form>
            <div class="account">
              <section id="login">
                <account-login></account-login>
              </section>
              <section class="details">
                <div>
                  <account-icon></account-icon>
                </div>
                <account-details></account-details>
              </section>  
            </div>
          </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("account-page", AccountPage);
  }
  