// @ts-nocheck
import { theme } from '../../theme/theme';
import ScreenQuery from '../../styles/query';
import { dtPeriods, dtInterests } from '../../data/options';
import { dtAmountSlider } from '../../data/sliders';
import { CustomEvents } from '../../settings';
import { SaveForms } from '../../components/common/saves';
import { ArrayService } from '../../services/utils';
import { ClassIdService, CustomEventService, IdService, HTMLService } from '../../services';

class InsuranceCalculatorForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });

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
        period: ArrayService.getOptionFromString(dtPeriods, 0), 
        interests: ArrayService.getOptionFromString(dtInterests, 0) 
      };

      CustomEventService.event(`${CustomEvents.interaction.sliderValueChange}-${this.selectIds.loan}`, (e) => {
        this.loan = e.detail.value;
        this.save('loan', e.detail.value);
        let el = ClassIdService.id('loan-current-amount', this.shadow);
        HTMLService.html(el, `${this.loan} ${this.currency}`);
      });

      let selectEvt = CustomEvents.interaction.selectChange;
      CustomEventService.event(`${selectEvt}-${this.selectIds.period}`, (e) => {
        this.period = e.detail.value;
        this.save('period', e.detail.value);
      });
      CustomEventService.event(`${selectEvt}-${this.selectIds.interests}`, (e) => {
        this.interests = e.detail.value;
        this.save('interests', e.detail.value);
      });
    }

    save(key, value) {
      this.savedForm[key] = value;
      window.DataStorage.saveObject(SaveForms.calculator.main, this.savedForm);
      this.calculateFormula();
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {
      let saved = window.DataStorage.getObject(SaveForms.calculator.main);
      this.savedForm = saved || this.savedForm;
      let loan = IdService.id(this.selectIds.loan, this.shadow);
      let periodId = IdService.id(this.selectIds.period, this.shadow);
      let interestsId = IdService.id(this.selectIds.interests, this.shadow);

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
      HTMLService.html(ClassIdService.id('total-payment', this.shadow), `${(this.formatTotalValue(this.totalPayment))}`);
    }

    formatTotalValue(val, option = 2) {
      if (option === 1) {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(
          val,
        );
      }
      else {
        return val.toLocaleString('en-US', { style: 'currency', currency: this.currencyID });
      }
    }
  
    render() {
      	this.shadow.innerHTML = `
            <style>
              .calculator-wrapper {
                display: grid;
                grid-template-columns: 70% 30%; 
                
                ${ScreenQuery.mobile('grid-template-columns: 100%;')}
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
  