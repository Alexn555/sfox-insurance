// @ts-nocheck
import { dtCurrencies, dtCurrencyNames } from '../../data/money';
import { dtAccNames, dtAccNameValues, dtSaves, dtSaveValues } from '../../data/payments';
import { theme } from '../../theme/theme';
import { SaveForms } from '../../components/common/saves';
import DataStorage from '../../services/storage';

class InsurancePaymentForm extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.addEventListener('click', this.setAmount.bind(this));
    this.shadow.addEventListener('onchange', this.setAmount.bind(this));
    this.$amount = '';
    this.$description = '';
    this.$accounts = '';
    this.$savedPayments = '';

    this.accounts = '';
    this.savedPayments = '';
    this.dataStorage = new DataStorage();

    this.selectIds = {
        accounts: 'accounts',
        savedPayments: 'savedPayments'
    };

    document.addEventListener(`select-change-${this.selectIds.accounts}`, (evt) => {
        this.accounts = evt.detail.value;
        this.save('accounts', evt.detail.value);
    });
    document.addEventListener(`select-change-${this.selectIds.savedPayments}`, (evt) => {
        this.savedPayments = evt.detail.value;
        this.save('payments', evt.detail.value);
    });
  }

  save(key, value) {
    this.savedForm[key] = value;
    this.dataStorage.saveObject(SaveForms.performance.payment, this.savedForm);
  }

  connectedCallback() {
    this.render();
    this.initForm();
  }

  initForm() {
    const saved = this.dataStorage.getObject(SaveForms.performance.payment);
    this.savedForm = saved || { 
        accounts: '',
        payments: '',
        amount: 0, 
        description: ''
    };

    this.$amount = this.shadow.getElementById('amount');
    this.$description = this.shadow.getElementById('description');
    this.$accounts = this.shadow.getElementById('accounts');
    this.$savedPayments = this.shadow.getElementById('savedPayments');
    this.$amount.value = this.savedForm.amount;
    this.$description.value = this.savedForm.description;
    this.$accounts.setAttribute('value', this.savedForm.accounts);
    this.$savedPayments.setAttribute('value', this.savedForm.payments);
  }

  setAmount() {
    if (this.$amount && this.$amount.value !== '') {
        const errorLabel = this.shadow.querySelector('.input-error');
        errorLabel.style.display = 'none';
        const isNumber = /^\d+$/.test(this.$amount.value);
        if (!isNumber) {
            errorLabel.style.display = 'block';
        } else {
            this.savedForm.amount = this.$amount.value;
        }

    }
    if (this.$description && this.$description.value !== '') {
        this.savedForm.description = this.$description.value;
    }
    this.dataStorage.saveObject(SaveForms.performance.payment, this.savedForm);
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
                    background-color: ${theme.page.insurance.payment.background};
                    border-top: none;
                    --error-color: ${theme.page.insurance.payment.error};

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
                                id="accounts"
                                selectbox-id="accounts" 
                                label="Account:"
                                symbol=""
                                value="${this.accounts}"
                                width="300" 
                                items='${dtAccNameValues}'
                                option-names='${dtAccNames}'
                            />
                        </div>
                        <div>
                            <form-select 
                                id="savedPayments"
                                selectbox-id="savedPayments" 
                                label="Saved Payments:"
                                symbol=""
                                value="${this.savedPayments}"
                                width="300" 
                                items='${dtSaveValues}'
                                option-names='${dtSaves}'
                            />
                        </div>
                        <div>
                            <label for="amount">Amount:</label>
                            <input class="amount"    
                                onchange="this.setAmount()" 
                                min="1" 
                                value="0"
                                max="15000" 
                                type="text" 
                                id="amount" 
                                name="amount"
                            >
                            <form-select 
                                selectbox-id="currencies" 
                                label=""
                                symbol=""
                                width="100" 
                                items='${dtCurrencyNames}'
                                option-names='${dtCurrencies}'
                            />
                        </div>
                        <div class="input-error">Amount accepts only numbers</div> 
                        <div>
                            <label for="description">Description:</label>
                            <input class="input-normal" type="text" onchange="this.setAmount()" id="description" name="description">
                        </div>
                    </div>     
                </div> 
                
                <div class="submit">
                    <div>
                        <action-button label="Save" type="passive" onclick="this.setAmount()" />
                    </div>
                    <div>
                        <action-button label="Pay" type="action" onclick="this.setAmount()" />
                    </div>
                </div>
            </form>
        `;
  }
}

if ("customElements" in window) {
  customElements.define("insurance-payment-form", InsurancePaymentForm);
}
