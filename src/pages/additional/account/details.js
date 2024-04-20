// @ts-nocheck
import { objectPropertyAmount } from '../../../services/utils';
import { formatDate } from '../../../services/utils/dates';
import DataStorage from '../../../services/storage';
import { CustomPageEvents, Account } from '../../../settings';
import { IdService } from '../../../services';

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
      document.removeEventListener(CustomPageEvents.users.account.init, null);
      document.removeEventListener(CustomPageEvents.users.account.hide, null);
    }

    initForm() {
      document.addEventListener(CustomPageEvents.users.account.init, (evt) => {
        this.loggedUser = evt.detail.value;
        this.showUserDetails(this.loggedUser);
      });

      document.addEventListener(CustomPageEvents.users.account.hide, () => {
        this.setDetails('');
      })
    }

    showLastVisited(visited) {
      return Account.details.showVisited ? `<p> last visited <b>${formatDate(visited)}</b> </p>` : '';
    }

    showUserDetails(loggedUser) {
      if (objectPropertyAmount(loggedUser) < 1) {
        return;
      }

      const { username, email, name, surname, last_visited } = loggedUser;

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
          ${this.showLastVisited(last_visited)}
        </div>
      `;

      this.setDetails(html);
    }

    setDetails(html) {
      const el = IdService.id('userDetails', this.shadow);
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
  