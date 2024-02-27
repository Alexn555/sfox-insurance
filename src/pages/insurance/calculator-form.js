// @ts-nocheck
class BankingCalculatorForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });

      this.selectIds = {
        loan: 'amount-slider',
        period: 'period',
        interests: 'interests'
      };

      this.currency = '€';
      this.currencyID = 'EUR';
      this.loan = 1;
      this.period = 1;
      this.interests = 1; 
      this.totalPayment = '0.00';

      document.addEventListener(`slider-value-change-${this.selectIds.loan}`, (evt) => {
        this.loan = evt.detail.value;
        this.calculateFormula();
      });
      document.addEventListener(`select-change-${this.selectIds.period}`, (evt) => {
        this.period = evt.detail.value;;
        this.calculateFormula();
      });
      document.addEventListener(`select-change-${this.selectIds.interests}`, (evt) => {
        this.interests = evt.detail.value;;
        this.calculateFormula();
      });
    }
  
    connectedCallback() {
      this.render();
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
                    background-color: white;
                    border-top: none;
                    --error-color: #c8131c;
                    border-right: 1px solid #e3e3e3;

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
                      border-bottom: 1px solid #e3e3e3;                        
          
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
                            slider-id=${this.selectIds.loan}
                            min-amount="320"
                            max-amount="3000"
                          /> 
                        </div>
                        <div>
                            <form-select 
                                selectbox-id=${this.selectIds.period}
                                label="Period: &nbsp;"
                                symbol="years"
                                width="100" 
                                items="[10, 20, 30]"
                              />
                        </div>
                        <div>
                            <form-select 
                                selectbox-id=${this.selectIds.interests}
                                label="Interest:"
                                symbol="%"
                                width="80" 
                                items="[4.5, 10, 20]"
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
    customElements.define("banking-calculator-form", BankingCalculatorForm);
  }
  