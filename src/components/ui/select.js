// @ts-nocheck
import { theme } from '../../theme/theme';

class Selectbox extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.label = this.getAttribute('label') || '';
      this.symbol = this.getAttribute('symbol') || '';
      this.id = this.getAttribute('id') || 'select-id';
      this.value = this.getAttribute('value') || '';
      this.width = this.getAttribute('width') || '100';
      this.items = this.getAttribute('items') || '[]';
      this.optionNames = this.getAttribute('option-names') || '';
    }
  
    static get observedAttributes() { 
      return ['value']; 
    }

    connectedCallback() {
      this.setOptions();
      this.render();
      const el = this.shadow.getElementById(this.id);
      el.onchange = (() => {
        document.dispatchEvent(new CustomEvent(`select-change-${this.id}`, {
          detail: {value: el.value}, bubbles: true, cancelable: false 
        }));
      }); 
    }

    disconnectedCallback() {
      document.removeEventListener(`select-change-${this.id}`, null);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const el = this.shadow.getElementById(this.id);
      if (el !== null) {
        el.value = oldValue !== newValue ? newValue : oldValue;
      }
    }

   setOptions() {
      let html = '';
      const hmtlItems = JSON.parse(this.items);
      let optNames = '';
      if (this.optionNames !== '') {
        optNames = JSON.parse(this.optionNames);
      }

      for (let i = 0; i < hmtlItems.length; i++) {
          let optionName = optNames === '' ? `${hmtlItems[i]} ${this.symbol}` : `${optNames[i]}`;
          html += `<option value="${hmtlItems[i]}">
              ${optionName}
          </option>`;
      }
      return html;
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>         
              select {
                background-color: ${theme.ui.select.background};
                color: ${theme.ui.select.text};
                width: ${this.width}px;
                padding: 10px;
              }      
          </style>
          <label for="${this.id}">${this.label}</label>
          <select 
            name="${this.id}" 
            id="${this.id}"   
          >
            ${this.setOptions()}
          </select>                
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("form-select", Selectbox);
  }
  