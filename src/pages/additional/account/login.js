// @ts-nocheck
import { CommonEvents } from '../../../settings';

class AccountLogin extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isGameOpen = false;
    }
  
    connectedCallback() {
      this.render();
      this.$accessBtn = this.shadow.getElementById('accessAccount');

      this.$accessBtn.addEventListener(CommonEvents.click, () => {
          this.toggleLogin(true);
      });
    }

    disconnectedCallback() {
        this.$accessBtn.removeEventListener(CommonEvents.click, null);
    }

    toggleLogin(isOpen) {   

      this.setGameOpen(isOpen);
    }

    setGameOpen(toggle) {
      this.isGameOpen = toggle;
    }
  
    render() {
      this.shadow.innerHTML = `
            <style>
               .login {
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
            </style>
            <form>
                <div class="login">
                    <div>
                        <text-input
                            id="username" 
                            label="&nbsp; Name"
                            class-name="input-normal"
                            value=""
                            type="text"           
                        >
                        </text-input>
                    </div>
                    <div>
                        <text-input
                            id="password" 
                            label="Password"
                            class-name="input-normal"
                            value=""
                            type="password"        
                        >
                        </text-input>
                    </div>
                    <div>
                        <action-button id="accessAccount" label="Login" type="action" />
                    </div>
                </div>
           </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("account-login", AccountLogin);
  }
  