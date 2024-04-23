// @ts-nocheck
import { CustomEvents, CustomPageEvents } from '../../../settings';
import { validateEmail } from '../../../services/utils/strings';
import { styleErrors } from '../../../components/common/styles/errors';
import { IdService, CustomEventService } from '../../../services';
import { successIcon, errorIcon } from '../../../components/common/styles/statusIcons/status';

class AccountPwdReminder extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.container = 'pwdReminder';
      this.email = '';
      this.idEmail = 'email';
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {
      this.$elBtn = IdService.idAndClick('remind', this.shadow, this.toggleInfo.bind(this));
      this.$email = IdService.id(this.idEmail, this.shadow);
      this.$container = IdService.id(this.container, this.shadow);

      CustomEventService.event(CustomPageEvents.users.reminder.open, () => {
        this.$container.showModal();
      });

      CustomEventService.event(`${CustomEvents.interaction.textInputChange}-${this.idEmail}`, (e) => {
        this.email = e.detail.value;
        this.checkEmail(this.email);
      });
    }

    checkEmail(email) {
      if (!validateEmail(email)) {
        const el = IdService.id('error', this.shadow);
        el.innerHTML = `<i class="icon icon-failure">ok </i>
        <span class="message">Email is not correct format</span>`;
         setTimeout(() => { el.innerHTML = ''; }, 2000);
      }
    }

    toggleInfo() {
      const el = IdService.id('status', this.shadow);
      el.innerHTML = `<span>
        <i class="icon icon-success"> ok</i>
        <span class="message"><b>Email</b> is send to us to check if password exists. <br />
          Actually it will not be sent - it is just a demo. :)</span>`;
      setTimeout(() => { 
        el.innerHTML = ''; 
        this.close();
      }, 2000);
    }

    close() {
      this.$container?.close();
    }

    disconnectedCallback() {
      if (this.$elBtn && this.$close) {
        IdService.removeList([this.$elBtn, this.$close]);
      }

      CustomEventService.removeList([
        CustomPageEvents.users.reminder.open, 
        `${CustomEvents.interaction.textInputChange}-${this.idEmail}` 
      ]);
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>
            ${successIcon(22, 22)}
            ${errorIcon(22, 22, false)}

            #${this.container} {
              background-color: #f2f2f2;
              height: 100px;
            }

            .message {
              padding-left: 2px;
            }

            #error {
              padding-top: 10px;
              ${styleErrors.commonText};
            }

            #status {
              padding-top: 10px;
            }
          </style>
          <dialog id="${this.container}">
            <div>
                <text-input
                  id="email" 
                  label="Email"
                  class-name="input-normal"
                  value=""
                  type="text"           
                >
                </text-input>
                <action-button id="remind" label="Send" type="action" />
            </div>
            <div id="error"></div>
            <div id="status"></div>
          </dialog>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("account-pwd-reminder", AccountPwdReminder);
  }
  