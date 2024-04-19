// @ts-nocheck
import { CommonEvents, CustomEvents, CustomPageEvents } from '../../../settings';
import { validateEmail } from '../../../services/utils/strings';
import { styleErrors } from '../../../components/common/styles/errors';

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
      this.$elBtn = this.shadow.getElementById('remind');
      this.$elBtn.addEventListener(CommonEvents.click, this.toggleInfo.bind(this));

      this.$email = this.shadow.getElementById(this.idEmail);
      this.$container = this.shadow.getElementById(this.container);
      document.addEventListener(CustomPageEvents.users.reminder.open, () => {
        this.$container.showModal();
      });
    
      document.addEventListener(`${CustomEvents.interaction.textInputChange}-${this.idEmail}`, (e) => {
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
      this.$elBtn.removeEventListener(CommonEvents.click, null);
      this.$close.removeEventListener(CommonEvents.click, null);
      document.removeEventListener(CustomPageEvents.users.reminder.open, null);
      document.removeEventListener(`${CustomEvents.interaction.textInputChange}-${this.idEmail}`, null);
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
  