// @ts-nocheck
class AccountPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isAccVisible = false;
    }
  
    connectedCallback() {
      this.render();
    }

    toggleAccount(isAuthorized) {
      if (!this.isAccVisible) {
       
      } else {
      
      }
      this.setAvailable(isAuthorized);
    }

    setAvailable(toggle) {
      this.isAccVisible = toggle;
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>
              .account {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 20px;

                @media (max-width: 768px) {
                
                }
            }
          </style>
          <form>
            <div class="account">
              <section>
                <account-login></account-login>
              </section>

              <section>
                <h3>Account details</h3>
                <div> 
                  User details
                </div>
              </section>
            </div>
          </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("account-page", AccountPage);
  }
  