// @ts-nocheck
import { objectPropertyAmount } from '../../../services/utils';
import DataStorage from '../../../services/storage';
import { CustomEvents } from '../../../settings';

class AccountDetails extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isAccVisible = false;
      this.loggedUser = {};
      this.storage = new DataStorage();
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    disconnectedCallback() {
        document.removeEventListener(CustomEvents.users.account.init, null);
        document.removeEventListener(CustomEvents.users.account.hide, null);
    }

    initForm() {
      document.addEventListener(CustomEvents.users.account.init, (evt) => {
        this.loggedUser = evt.detail.value;
        this.showUserDetails(this.loggedUser);
      });

      document.addEventListener(CustomEvents.users.account.hide, () => {
        this.setDetails('');
      })
    }

    showUserDetails(loggedUser) {
      if (objectPropertyAmount(loggedUser) < 1) {
        return;
      }

      const { username, email, name, surname } = loggedUser;

      const html = `
        <div class="details">
          <div>
            <account-logout></account-logout>
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

    render() {
      this.shadow.innerHTML = `
          <style>
            .details {
              & div:nth-child(1) {
                padding-left: 100px;
              }
            }
          </style>
          <div id="userDetails"></div> 
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("account-details", AccountDetails);
  }
  