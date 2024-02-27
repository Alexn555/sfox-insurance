class BankingPaymentForm extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.addEventListener('click', this.setAmount.bind(this));
    this.shadow.addEventListener('onchange', this.setAmount.bind(this));
  }

  connectedCallback() {
    this.render();
  }

  setAmount() {
    const amount = this.shadow.querySelector('#amount');
    if (amount && amount.value !== '') {
        const errorLabel = this.shadow.querySelector('.input-error');
        errorLabel.style.display = 'none';
        const isNumber = /^\d+$/.test(amount.value);
        if (!isNumber) {
            errorLabel.style.display = 'block';
        }
    }
  }

  render() {
    this.shadow.innerHTML = `
            <style>
                .payment-wrapper {
                  display: flex;
                  align-items: center;
                  justify-content: center;    
                }

                .payment {
                    padding: 6px 12px;
                    background-color: white;
                    border-top: none;
                    --error-color: #c8131c;

                    & div {
                        margin: 10px;
                        text-align: right;
                    }
  
                    & input {
                       padding: 10px;
                    }
                    
                    & .input-normal {
                        width: 275px;
                    }

                    & .input-error {
                        display: none;
                        color: var(--error-color);
                    }

                    & .amount {
                        border: default;
                    }

                    & .amount-error {
                        border: 1px solid var(--error-color);
                    }
                }
                .submit {
                    display: flex;
                    align-items: end;
                    justify-content: end;

                    & div {
                        margin: 6px;
                    }
                }
            </style>
            <form>
                <div class="payment-wrapper">
                    <div class="payment">
                        <div>
                             <form-select 
                                    selectbox-id="accounts" 
                                    label="Account:"
                                    symbol=""
                                    width="300" 
                                    items='["accName1", "accName2", "accName3"]'
                                    option-names='["Acccount Name 1", "Acccount Name 2", "Acccount Name 3"]'
                                />
                           </div>
                            <div>
                                <form-select 
                                    selectbox-id="savedPayments" 
                                    label="Saved Payments:"
                                    symbol=""
                                    width="300" 
                                    items='["savedPayment1", "savedPayment2"]'
                                    option-names='["Saved Name 1", "Saved Special Name 3"]'
                                />
                            </div>
                            <div>
                                <label for="amount">Amount:</label>
                                <input class="amount" onchange="this.setAmount()" type="text" id="amount" name="amount">
                                <form-select 
                                    selectbox-id="currencies" 
                                    label=""
                                    symbol=""
                                    width="100" 
                                    items='["eur", "dollar", "canadianDollar"]'
                                    option-names='["EUR", "USD", "CAD"]'
                                />
                            </div>
                            <div class="input-error">Amount accepts only numbers</div> 
                            <div>
                                <label for="description">Description:</label>
                                <input class="input-normal" type="text" id="description" name="description">
                            </div>
                        </div>     
                    </div> 
                    
                    <div class="submit">
                        <div>
                            <action-button label="Save" type="passive" onclick="setAmount()" />
                        </div>
                        <div>
                            <action-button label="Pay" type="action" onclick="setAmount()" />
                        </div>
                    </div>
                </form>
             
        `;
  }
}

if ("customElements" in window) {
  customElements.define("banking-payment-form", BankingPaymentForm);
}
