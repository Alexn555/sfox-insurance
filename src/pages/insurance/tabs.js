// @ts-nocheck
import { theme } from '../../theme/theme';
import { CommonEvents } from '../../settings';
import { StyleService } from '../../services';

const template = document.createElement('template');
template.innerHTML = `
  <style>
      .tab {
        overflow: hidden;
        background-color: ${theme.page.tabs.background};
        border-radius: 4px;
      }
      
      .tab button {
        background-color: inherit;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 14px 16px;
        transition: 0.3s;
        font-size: 17px;
      }
      
      .tab button:hover {
        background-color: ${theme.page.tabs.hover};
        color: white;
        border-radius: 4px;
      }
      
      .tab button.active {
        background-color: ${theme.page.tabs.background};
      }
      
      .tabcontent {
        display: none;
        padding: 6px 12px;
        background-color: white;
        border: 1px solid ${theme.page.tabs.border};
        border-top: none;
      }

      #calculator {
        display: block;
      }
  </style>
  <div class="tab">
    <button id="calculator-btn">Calculator</button>
    <button id="payment-btn">Payment</button>
    </div>

  <div id="payment" class="tabcontent">
    <insurance-payment-form></insurance-payment-form>
  </div>

  <div id="calculator" class="tabcontent">
    <insurance-calculator-form></insurance-calculator-form>
  </div>   
`;

class InsuranceTabs extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'closed'});
    this.shadow.appendChild(template.content.cloneNode(true));
  }
  
  connectedCallback() {
    this.initForm();
  }

  disconnectedCallback() {
    this.$btnPayment.removeEventListener(CommonEvents.click, null);
    this.$btnCalculator.removeEventListener(CommonEvents.click, null);
  }

  initForm() {
    this.$btnPayment = this.shadow.getElementById('payment-btn');
    this.$btnCalculator = this.shadow.getElementById('calculator-btn');

    this.$btnPayment.addEventListener(CommonEvents.click, () => {
      this.openTab('payment-btn');
    });
    this.$btnCalculator.addEventListener(CommonEvents.click, () => {
      this.openTab('calculator-btn');
    });
  }

  openTab(evt) {
    const item = evt;
    const tab = this.shadow.getElementById(item);
    const tabPayment = this.shadow.getElementById('payment');
    const tabCalculator = this.shadow.getElementById('calculator');

    if (tab) {
      StyleService.setDisplayMultiple([tabPayment, tabCalculator], false);
    }

    let selected = null;
    if (item === 'payment-btn') {
      selected = tabPayment;
    } else if (item === 'calculator-btn') {
      selected = tabCalculator;
    }

    StyleService.setDisplay(selected, true);
  }
}

if ('customElements' in window) {
	customElements.define('insurance-tabs', InsuranceTabs);
}
