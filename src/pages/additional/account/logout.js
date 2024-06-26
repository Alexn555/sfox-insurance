// @ts-nocheck
import { CustomEventService, IdService } from '../../../services';
import { CommonEvents, CustomPageEvents } from '../../../settings';

class AccountLogout extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.logoutSet = false;
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {
      this.$logout = IdService.id('logout', this.shadow);
      if (!this.logoutSet && this.$logout) {
        IdService.event(this.$logout, CommonEvents.click, () => {
          this.logout();
        });
        this.toggleLogout(true);
      }
    }

    disconnectedCallback() {
      this.$logout.removeEventListener(CommonEvents.click, null);
    }

    toggleLogout(toggle){ 
      this.logoutSet = toggle;
    }

    logout() {
      CustomEventService.send(CustomPageEvents.users.logout.button);  
      this.$logout.removeEventListener(CommonEvents.click, null);  
      this.toggleLogout(false);
    }

    render() {
      this.shadow.innerHTML = `
        <div>
            <action-button id="logout" label="Logout" type="action"></action-button>
        </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("account-logout", AccountLogout);
  }
  