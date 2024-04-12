// @ts-nocheck
import { LoggerService } from '../../../services';
import { CustomEvents } from '../../../settings';

class AccountPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isAccVisible = false;
      this.loggedUser = {};
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {
      this.showUserDetails();
      document.addEventListener(CustomEvents.users.login, (evt) => {
        if (!evt.detail || !evt.detail.value) {
          LoggerService.warn('Login data missing!');
          return;
        }
        this.loggedUser = evt.detail.value;
        this.setAvailable(true);
      });
    }

    setAvailable(accessible) {
      this.isAccVisible = accessible;
      if (accessible) {
        this.showUserDetails();
      }
    }

    showUserDetails() {
      if (Object.keys(this.loggedUser).length < 1) {
        return;
      }

      const { username, email, name, surname } = this.loggedUser;
      const html = `
        <div>
          <p> username: <b>${username}</b> </p>
          <p> email: <b>${email}</b> </p>
          <p> name: <b>${name}</b> <p>
          <p> surname <b>${surname}</b> </p>
        </div>
      `;

      const el = this.shadow.getElementById('userDetails');
      el.innerHTML = html;
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
          </style>
          <form>
            <div class="account">
              <section>
                <account-login></account-login>
              </section>
              <section>
                <h3>Account details</h3>
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
  