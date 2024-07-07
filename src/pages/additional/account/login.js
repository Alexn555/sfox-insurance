// @ts-nocheck
import { theme } from '../../../theme/theme';
import ScreenQuery from '../../../styles/query';
import { CommonEvents, CustomEvents, CustomPageEvents, LoginSets } from '../../../settings';
import { ClassIdService, CustomEventService, IdService, StyleService, HTMLService } from '../../../services';
import { LinkTypes, LinkVariants } from '../../../components/common/ui';
import { KeyboardKeys } from '../../../enums';
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
      this.$loginSection = ClassIdService.id('login', this.shadow);
      this.$remindLink = IdService.id('remind', this.shadow);
      this.$username = IdService.id(this.textIds.username, this.shadow);
      this.$password = IdService.id(this.textIds.password, this.shadow);
      this.$accessBtn = IdService.id('accessAccount', this.shadow);
      this.initForm();
    }

    disconnectedCallback() {
      IdService.removeList([this.$accessBtn, this.$remindLink]);
      CustomEventService.removeList([
        `${CustomEvents.interaction.textInputChange}-${this.textIds.username}`,
        `${CustomEvents.interaction.textInputChange}-${this.textIds.password}`
      ]);
    }

    initForm() {
      CustomEventService.event(`${CustomEvents.interaction.textInputChange}-${this.textIds.username}`, (e) => {
        this.setUsername(e?.detail.value);
      });
      CustomEventService.event(`${CustomEvents.interaction.textInputChange}-${this.textIds.password}`, (e) => {
        this.setPassword(e?.detail.value);
      });

      CustomEventService.event(CommonEvents.keypress, (e) => {
        if (e.key === KeyboardKeys.enter) {
          e.preventDefault();
          this.activateLogin();
        }
      }, this.shadow);
      IdService.event(this.$accessBtn, CommonEvents.click, this.activateLogin.bind(this));

      IdService.event(this.$remindLink, CommonEvents.click, () => {
        CustomEventService.send(CustomPageEvents.users.reminder.open);
      });
    }

    activateLogin() {
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
    }

    setUsername(value) {
      this.$username.setAttribute('value', value);
    }

    setPassword(value) {
      this.$password.setAttribute('value', value);
    }
    
    setAccount(user) {   
      // send to account that user is found and send user data
      CustomEventService.send(CustomPageEvents.users.login, user);
    }

    showError(error, visible = true) {
      const el = IdService.id('error', this.shadow);
      HTMLService.toggleMsg(el, error, 2);
      StyleService.setDisplay(el, visible);
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
                
                ${ScreenQuery.mobile('grid-template-columns: 100%;')}
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
  