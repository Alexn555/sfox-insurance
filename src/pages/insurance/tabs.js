// @ts-nocheck
import { theme } from '../../theme/theme';
import commonTabStyle from '../../pages/common/tabsStyle';
import { IdService, StyleService } from '../../services';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    ${commonTabStyle(theme.page.tabs)}

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
    IdService.removeList([this.$btnPayment, this.$btnCalculator]);
  }

  initForm() {
    this.$btnPayment = IdService.idAndClick('payment-btn', this.shadow, () => {
      this.openTab('payment-btn');
    });
    this.$btnCalculator = IdService.idAndClick('calculator-btn', this.shadow, () => {
      this.openTab('calculator-btn');
    });
  }

  openTab(evt) {
    let item = evt;
    let tab = IdService.id(item, this.shadow);
    let tabPayment = IdService.id('payment', this.shadow);
    let tabCalculator = IdService.id('calculator', this.shadow);

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
