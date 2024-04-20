// @ts-nocheck
import { CustomEvents, CustomPageEvents } from '../../../settings';
import { validateEmail } from '../../../services/utils/strings';
import { styleErrors } from '../../../components/common/styles/errors';
import { IdService } from '../../../services';

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
      this.$elBtn = IdService.idAndEvent('remind', this.shadow, this.toggleInfo.bind(this));
      this.$email = IdService.id(this.idEmail, this.shadow);
      this.$container = IdService.id(this.container, this.shadow);

      IdService.customEvent(CustomPageEvents.users.reminder.open, () => {
        this.$container.showModal();
      });

      IdService.customEvent(`${CustomEvents.interaction.textInputChange}-${this.idEmail}`, (e) => {
        this.email = e.detail.value;
        this.checkEmail(this.email);
      });
    }

    checkEmail(email) {
      if (!validateEmail(email)) {
        const el = this.shadow.getElementById('error');
        el.innerText = 'Email is not correct format';
         setTimeout(() => { el.innerText = ''; }, 2000);
      }
    }

    toggleInfo() {
      const el = this.shadow.getElementById('status');
      el.innerHTML = `<span><b>Email</b> is send to us to check if password exists. <br />
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
      IdService.removeList([this.$elBtn, this.$close]);
      IdService.removeEvents([
        CustomPageEvents.users.reminder.open, 
        `${CustomEvents.interaction.textInputChange}-${this.idEmail}` 
      ]);
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>
            #${this.container} {
              background-color: #f2f2f2;
              height: 100px;
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
  