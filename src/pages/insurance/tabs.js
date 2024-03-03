// @ts-nocheck
import { theme } from '../../theme/theme';

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
  <button id="calculator-btn" onclick="this.openTab(event)">Calculator</button>
  <button id="payment-btn" onclick="this.openTab(event)">Payment</button>
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
      this.shadow = this.attachShadow({mode: 'open'});
      this.shadow.appendChild(template.content.cloneNode(true));
    }
    
    connectedCallback() {
      this.shadow.addEventListener('click', this.openTab.bind(this));
    }

    openTab(evt) {
      const { target } = evt;
      const item = target.id;
      const tab = this.shadow.querySelector(`#${item}`);
      const tabPayment = this.shadow.querySelector('#payment');
      const tabCalculator = this.shadow.querySelector('#calculator');

      if (tab) {
        tabPayment.style.display = 'none';
        tabCalculator.style.display = 'none';
      }

      if (item === 'payment-btn') {
        tabPayment.style.display = 'block';
      } else {
        tabCalculator.style.display = 'block';
      }
    }
}

if ('customElements' in window) {
	customElements.define('insurance-tabs', InsuranceTabs);
}
