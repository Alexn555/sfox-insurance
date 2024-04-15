// @ts-nocheck
import { SaveObjects } from '../../../components/common/saves';
import { LoggerService, StyleService } from '../../../services';
import { objectPropertyAmount } from '../../../services/utils';
import DataStorage from '../../../services/storage';
import { CommonEvents, CustomEvents } from '../../../settings';

class AccountPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isAccVisible = false;
      this.loggedUser = {};
      this.logoutSet = false;
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
      this.showUserDetails(statusEvt);
      this.setSaveStatus(statusEvt);
      this.$logout = this.shadow.getElementById('logout');
      this.setLogoutHandler();
      document.addEventListener(CustomEvents.users.login, (evt) => {
        if (!evt.detail || !evt.detail.value) {
          LoggerService.warn('Login data missing!');
          return;
        }
        this.loggedUser = evt.detail.value;
        this.setAvailable(true, this.events.login);
      });
    }

    disconnectedCallback() {
      this.$logout.removeEventListener(CommonEvents.click, null);
      document.removeEventListener(CustomEvents.users.login, null);
    }

    setLogoutHandler() {
      this.$logout = this.shadow.getElementById('logout');
      if (!this.logoutSet && this.$logout) {
        this.$logout.addEventListener(CommonEvents.click, () => {
          this.logout();
        });
        this.toggleLogout(true);
      }
    }

    getSaveAccount() {
      const saved = this.storage.getObject(SaveObjects.account);
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
        this.showUserDetails(evt);
        this.setStatus(this.statuses.loggedIn);
        this.setLogoutHandler();
      }
    }

    setStatus(toggle) {
      this.status = toggle;
    }

    toggleLogout(toggle){ 
      this.logoutSet = toggle;
    }

    logout() {
      this.setStatus(this.statuses.offline);
      this.setDetails('');
      this.toggleLogin(true);
      this.toggleLogout(false);
      this.saveObjectAndStatus(this.statuses.offline);
      this.$logout.removeEventListener(CommonEvents.click, null);
    }
    
    setSaveStatus(event = this.events.init) {
      if (objectPropertyAmount(this.loggedUser) > 1 && event === this.events.login) {
        this.saveObjectAndStatus(this.statuses.loggedIn);
      }
    }

    showUserDetails() {
      if (objectPropertyAmount(this.loggedUser) < 1) {
        return;
      }

      const { username, email, name, surname } = this.loggedUser;

      const html = `
        <div class="details">
          <div>
            <action-button id="logout" label="Logout" type="action"></action-button>
          </div>

          <h3>Account details</h3>
          <p> username: <b>${username}</b> </p>
          <p> email: <b>${email}</b> </p>
          <p> name: <b>${name}</b> <p>
          <p> surname <b>${surname}</b> </p>
        </div>
      `;

      this.setDetails(html);
    }

    setDetails(html) {
      const el = this.shadow.getElementById('userDetails');
      el.innerHTML = html;
    }

    toggleLogin(visible) {
      const $login = this.shadow.getElementById('login');
      StyleService.setDisplay($login, visible);
    }
  
    saveObjectAndStatus(status) {
      this.loggedUser['status'] = status;
      this.storage.saveObject(SaveObjects.account, this.loggedUser);
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
              & div:nth-child(1) {
                padding-left: 100px;
              }
            }
          </style>
          <form>
            <div class="account">
              <section id="login">
                <account-login></account-login>
              </section>
              <section>
                <div id="userDetails"></div>
              </section>
            </div>
          </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("account-page", AccountPage);
  }
  