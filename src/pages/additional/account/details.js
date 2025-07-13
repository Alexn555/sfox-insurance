// @ts-nocheck
import { ObjectService } from '../../../services/utils';
import { DateService }  from '../../../services/helpers';
import { CustomPageEvents, Account } from '../../../settings';
import { CustomEventService, IdService, HTMLService } from '../../../services';

class AccountDetails extends HTMLElement {
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

    disconnectedCallback() {
      CustomEventService.removeListener(CustomPageEvents.users.account.init);
      CustomEventService.removeListener(CustomPageEvents.users.account.hide);
    }

    initForm() {
      CustomEventService.event(CustomPageEvents.users.account.init, (e) => {
        this.loggedUser = e.detail.value;
        this.showUserDetails(this.loggedUser);
      });
      CustomEventService.event(CustomPageEvents.users.account.hide, (e) => {
        this.setDetails('');
      });
    }

    showVisited(visited) {
      return Account.details.showVisited ? `<p> visited <b>${DateService.formatDate(visited)}</b> </p>` : '';
    }

    showUserDetails(loggedUser) {
      if (ObjectService.objectPropertyAmount(loggedUser) < 1) {
        return;
      }

      let { username, email, name, surname, visited } = loggedUser;

      let html = `
        <div class="details">
          <div>
            <account-logout></account-logout>
          </div>

          <h3>Account details</h3>
          <p> username: <b>${username}</b> </p>
          <p> email: <b>${email}</b> </p>
          <p> name: <b>${name}</b> <p>
          <p> surname <b>${surname}</b> </p>
          ${this.showVisited(visited)}
        </div>
      `;

      this.setDetails(html);
    }

    setDetails(html) {
      let el = IdService.id('userDetails', this.shadow);
      HTMLService.html(el, html);
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
  