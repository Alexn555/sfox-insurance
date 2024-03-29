// @ts-nocheck
import { dtPeriods, dtInterests } from '../../data/options';
import { dtAmountSlider } from '../../data/sliders';
import { theme } from '../../theme/theme';
import { CustomEvents } from '../../components/common/settings';
import { SaveForms } from '../../components/common/saves';
import { getOptionFromString } from '../../components/common/utils/arrays';
import DataStorage from '../../services/storage';

class InsuranceCalculatorForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.dataStorage = new DataStorage();

      this.selectIds = {
        loan: 'amount-slider',
        period: 'period',
        interests: 'interests'
      };


      this.currency = '€';
      this.currencyID = 'EUR';
      this.loan = 1;
      this.period = 10;
      this.interests = 10; 
      this.totalPayment = '0.00';
      this.savedForm = { 
        loan: 320,
        period: getOptionFromString(dtPeriods, 0), 
        interests: getOptionFromString(dtInterests, 0) 
      };


      document.addEventListener(`${CustomEvents.interaction.sliderValueChange}-${this.selectIds.loan}`, (evt) => {
        this.loan = evt.detail.value;
        this.save('loan', evt.detail.value);
        const el = this.shadow.querySelector('.loan-current-amount');
        el.innerHTML = `${this.loan} ${this.currency}`;
      });

      const selectEvt = CustomEvents.interaction.selectChange;
      document.addEventListener(`${selectEvt}-${this.selectIds.period}`, (evt) => {
        this.period = evt.detail.value;
        this.save('period', evt.detail.value);
      });
      document.addEventListener(`${selectEvt}-${this.selectIds.interests}`, (evt) => {
        this.interests = evt.detail.value;
        this.save('interests', evt.detail.value);
      });
    }

    save(key, value) {
      this.savedForm[key] = value;
      this.dataStorage.saveObject(SaveForms.calculator.main, this.savedForm);
      this.calculateFormula();
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {
      const saved = this.dataStorage.getObject(SaveForms.calculator.main);
      this.savedForm = saved || this.savedForm;
      const loan = this.shadow.getElementById(this.selectIds.loan);
      const periodId = this.shadow.getElementById(this.selectIds.period);
      const interestsId = this.shadow.getElementById(this.selectIds.interests);

      if (this.savedForm.loan !== 0) {
        loan.setAttribute('value', this.savedForm.loan);
        this.loan = this.savedForm.loan;
      }
      if (this.savedForm.period !== 0) {
        periodId.setAttribute('value', this.savedForm.period);
        this.period = this.savedForm.period;
      }
      if (this.savedForm.interests !== 0) {
        interestsId.setAttribute('value', this.savedForm.interests);
        this.interests = this.savedForm.interests;
      }
      this.calculateFormula();
    }

    calculateFormula() {
      this.totalPayment = this.loan * (this.period / this.interests);
      const el = this.shadow.querySelector('.total-payment');
      el.innerHTML = `${(this.formatTotalValue(this.totalPayment))}`;
    }

    formatTotalValue(val, option = 2) {
      if (option === 1) {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(
          val,
        );
      }
      else {
        const options = { style: 'currency', currency: this.currencyID };
        const result = val.toLocaleString('en-US', options);
        return result;
      }
    }
  
    render() {
      this.shadow.innerHTML = `
            <style>
                .calculator-wrapper {
                  display: grid;
                  grid-template-columns: 70% 30%; 

                  @media (max-width: 768px) {
                      grid-template-columns: 100%;
                  }
                }

                .calculator {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    padding: 6px 12px;
                    background-color: ${theme.page.insurance.calculation.background};
                    border-top: none;
                    border-right: 1px solid ${theme.page.insurance.calculation.border};

                    & div {
                        margin: 10px;
                        text-align: left;
                    }    

                    & .loan-current-amount{
                      color: #ee7023;
                      font-size: 18px;
                      padding-left: 10px;
                    }
                }
                .submit {
                    text-align: right;

                  & div {
                      margin: 6px;
                  }

                  & div:nth-child(2) {
                      float: right;
                      padding-top: 8px;
                  }

                  & .calculation-total {
                      display: flex;
                      align-items: space-between;
                      justify-content: space-between;
                      border-bottom: 1px solid ${theme.page.insurance.calculation.border};                        
          
                      & div:nth-child(2) {
                          color: #ee7023;
                          font-size: 20px;
                          transform: translateY(-4px);
                      }
                  }
                }
                
            </style>
            <form>
              <div class="calculator-wrapper">
                <div class="calculator">
                    <div>
                        <div class="loan-current-amount">3200 ${this.currency}</div>
                        <div class="loan-slider">
                          <amount-slider 
                            id="${this.selectIds.loan}"
                            value=${this.savedForm.loan}
                            min-amount="${dtAmountSlider.min}"
                            max-amount="${dtAmountSlider.max}"
                          /> 
                        </div>
                        <div>
                            <form-select 
                                id="${this.selectIds.period}"
                                label="Period: &nbsp;"
                                symbol="years"
                                value="${this.period}"
                                width="100" 
                                items="${dtPeriods}"
                              />
                        </div>
                        <div>
                            <form-select 
                                id="${this.selectIds.interests}"
                                label="Interest:"
                                symbol="%"
                                value="${this.interests}"
                                width="80" 
                                items="${dtInterests}"
                              />
                        </div>                       
                    </div>     
                </div> 
                <div class="submit">
                  <div class="calculation-total">
                      <div>Monthly payment</div>
                      <div class="total-payment">${this.totalPayment} ${this.currency}</div>
                  </div>
                  <div>
                      <action-button label="Apply" type="action" />
                  </div>
                </div>
          </form>
      `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("insurance-calculator-form", InsuranceCalculatorForm);
  }
  