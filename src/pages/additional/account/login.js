// @ts-nocheck
import { theme } from '../../../theme/theme';
import { CommonEvents, CustomEvents, CustomPageEvents, LoginSets } from '../../../settings';
import { CustomEventService, StyleService } from '../../../services';
import { LinkTypes, LinkVariants } from '../../../components/common/ui';
import { UserService } from '../../../services/page/usersService';

class AccountLogin extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.userFound = false;
      this.textIds = {
        username: 'username',
        password: 'password'
      };
    }
  
    connectedCallback() {
      this.render();
      this.$loginSection = this.shadow.querySelector('.login');
      this.$remindLink = this.shadow.getElementById('remind');
      this.$username = this.shadow.getElementById(this.textIds.username);
      this.$password = this.shadow.getElementById(this.textIds.password);
      this.$accessBtn = this.shadow.getElementById('accessAccount');
      this.initForm();
    }

    initForm() {
      document.addEventListener(`${CustomEvents.interaction.textInputChange}-${this.textIds.username}`, (evt) => {
        this.setUsername(evt?.detail.value);
      });
      document.addEventListener(`${CustomEvents.interaction.textInputChange}-${this.textIds.password}`, (evt) => {
        this.setPassword(evt?.detail.value);
      });

      this.$accessBtn.addEventListener(CommonEvents.click, () => {
        const user = {
          username: this.$username.getAttribute('value'),
          password: this.$password.getAttribute('value')
        };
        if (user.username.length > 0 && user.password.length > 0) {
          const logged = UserService.getLoginData(user);
          if (logged) {
            this.setAccount(logged);
            this.showError('', false);
          } else {
            this.showError('User with those credentials is not found');
          }
        } else {
          this.showError('Please type username and password');
        }
      });

      this.$remindLink.addEventListener(CommonEvents.click, () => {
        CustomEventService.send(CustomPageEvents.users.reminder.open);
      })
    }

    setUsername(value) {
      this.$username.setAttribute('value', value);
    }

    setPassword(value) {
      this.$password.setAttribute('value', value);
    }

    disconnectedCallback() {
      document.removeEventListener(`${CustomEvents.interaction.textInputChange}-${this.textIds.username}`, null);
      document.removeEventListener(`${CustomEvents.interaction.textInputChange}-${this.textIds.password}`, null);
      this.$accessBtn.removeEventListener(CommonEvents.click, null);
      this.$remindLink.removeEventListener(CommonEvents.click, null);
    }

    setAccount(user) {   
      // send to account that user is found and send user data
      CustomEventService.send(CustomPageEvents.users.login, user);
    }

    showError(error, visible = true) {
      const el = this.shadow.getElementById('error');
      el.innerHTML = error;
      StyleService.setDisplay(el, visible);
      this.removeError(el);
    }

    removeError(el, timeout = 2000) {
      setTimeout(() => el.innerHTML = '', timeout);
    }

    showInfoTip() {
      return LoginSets.info.enabled ? `
        <div class="info">
          <login-info></login-info>
        </div>` : '';
    }
  
    render() {
      this.shadow.innerHTML = `
            <style>
               .login {
                  position: relative;
                  display: grid;
                  grid-template-columns: 100%; 
                  border: 1px solid grey;

                  & div {
                    padding: 20px;
                  }

                  @media (max-width: 768px) {
                    grid-template-columns: 100%;
                  }
              }

              #error {
                display: none;
                color: ${theme.account.login.error.text};
                font-weight: bold;
              }

              .info {
                position: absolute;
                background-color: white;
                right: 0;
                width: 80px;
              }

              .reminder {
                padding-left: 10px;  
              }
            </style>
            <form>
                <div class="login">
                    <div>
                        <text-input
                            id="${this.textIds.username}" 
                            label="&nbsp; Name"
                            class-name="input-normal"
                            value=""
                            type="text"           
                        >
                        </text-input>
                    </div>
                    <div>
                        <text-input
                            id="${this.textIds.password}" 
                            label="Password"
                            class-name="input-normal"
                            value=""
                            type="password"        
                        >
                        </text-input>
                    </div>
                    <div>
                      <action-button id="accessAccount" label="Login" type="action"> </action-button>
                      <span class="reminder"> 
                        <action-link 
                          id="remind" 
                          label="Password Reminder" 
                          variant="${LinkVariants.thinText}"
                          type="${LinkTypes.transparentButton}"> 
                        </action-link>
                      </span>
                    </div>
                    <div id="error"> </div>
                    ${this.showInfoTip()}
                </div>

                <account-pwd-reminder> </account-pwd-reminder>
           </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("account-login", AccountLogin);
  }
  