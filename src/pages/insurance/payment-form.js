// @ts-nocheck
import { dtCurrencies, dtCurrencyNames } from '../../data/money';
import { dtAccNames, dtAccNameValues, dtSaves, dtSaveValues } from '../../data/payments';
import { ClassIdService, CustomEventService, IdService, StyleService } from '../../services';
import { isValidNumber } from '../../services/utils/number';
import { theme } from '../../theme/theme';
import { CustomEvents } from '../../settings';
import { getOptionFromString } from '../../services/utils/arrays';
import { SaveForms } from '../../components/common/saves';
import DataStorage from '../../services/storage';

class InsurancePaymentForm extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.$amount = '';
    this.$description = '';
    this.$accounts = '';
    this.$savedPayments = '';
    this.accounts = '';
    this.savedPayments = '';

    this.savedForm = { 
        amount: 320,
        accounts: getOptionFromString(dtAccNameValues, 0), 
        payments: getOptionFromString(dtSaveValues, 0),
        description: ''
    };

    this.dataStorage = new DataStorage();

    this.selectIds = {
        accounts: 'accounts',
        savedPayments: 'savedPayments'
    };

    this.selectChangeEvt = CustomEvents.interaction.selectChange;
    this.textInputChangeEvt = CustomEvents.interaction.textInputChange;

    CustomEventService.event(`${this.selectChangeEvt}-${this.selectIds.accounts}`, (e) => {
        this.accounts = e.detail.value;
        this.save('accounts', e.detail.value);
    });

    CustomEventService.event(`${this.selectChangeEvt}-${this.selectIds.savedPayments}`, (e) => {
        this.savedPayments = e.detail.value;
        this.save('payments', e.detail.value);
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

  disconnectedCallback() {
    CustomEventService.removeList([
        `${this.textInputChangeEvt}-amount`,
        `${this.textInputChangeEvt}-description`,
        `${this.selectChangeEvt}-${this.selectIds.accounts}`,
        `${this.selectChangeEvt}-${this.selectIds.savedPayments}`
    ]);
  }

  initForm() {
    const saved = this.dataStorage.getObject(SaveForms.performance.payment);
    this.savedForm = saved || this.savedForm;

    this.$amount = IdService.id('amount', this.shadow);
    this.$description = IdService.id('description', this.shadow);
    this.$accounts = IdService.id('accounts', this.shadow);
    this.$savedPayments = IdService.id('savedPayments', this.shadow);

    this.$amount.setAttribute('value', this.savedForm.amount);
    this.$description.setAttribute('value', this.savedForm.description);
    this.$accounts.setAttribute('value', this.savedForm.accounts);
    this.$savedPayments.setAttribute('value', this.savedForm.payments);

    CustomEventService.event(`${this.textInputChangeEvt}-amount`, (e) => {
        this.setAmount(e?.detail.value);
    });
    CustomEventService.event(`${this.textInputChangeEvt}-description`, (e) => {
        this.setAmount(e?.detail.value);
    });
  }

  setAmount(amountVal) {
    if (amountVal && amountVal !== '') {
        const errorLabel = ClassIdService.id('input-error', this.shadow);
        StyleService.setDisplay(errorLabel, false);        
        if (!isValidNumber(amountVal)) {
            StyleService.setDisplay(errorLabel, true);
        } else {
            this.savedForm.amount = amountVal;
        }
    }
    this.dataStorage.saveObject(SaveForms.performance.payment, this.savedForm);
  }

  setDescription(descVal) {
    if (descVal && descVal !== '') {
        this.savedForm.description = descVal;
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
 
                    & .input-error {
                        display: none;
                        color: var(--error-color);
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
                                label="Saved Payments:"
                                symbol=""
                                value="${this.savedPayments}"
                                width="300" 
                                items='${dtSaveValues}'
                                option-names='${dtSaves}'
                            />
                        </div>
                        <div>
                            <text-input
                                id="amount" 
                                label="Amount"
                                class-name="amount"
                                min="1" 
                                value="0"
                                max="15000"                
                            >
                            </text-input>
                            <form-select 
                                id="currencies" 
                                label=""
                                symbol=""
                                width="100" 
                                items='${dtCurrencyNames}'
                                option-names='${dtCurrencies}'
                            />
                        </div>
                        <div class="input-error">Amount accepts only numbers</div> 
                        <div>  
                            <text-input
                                id="description" 
                                label="Description"
                                class-name="input-normal"
                                min="1" 
                                value=""
                                max="100"                 
                            >
                            </text-input>  
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
