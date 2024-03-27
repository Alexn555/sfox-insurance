// @ts-nocheck
import { theme } from '../../theme/theme';
import { CustomEvents } from '../../components/common/settings';
import { CustomEventService } from '../../services';

class Selectbox extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.id = this.getAttribute('id') || 'select-id';
      this.label = this.getAttribute('label') || '';
      this.symbol = this.getAttribute('symbol') || '';
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
        CustomEventService.send(`${CustomEvents.interaction.selectChange}-${this.id}`, el.value);
      }); 
    }

    disconnectedCallback() {
      document.removeEventListener(`${CustomEvents.interaction.selectChange}-${this.id}`, null);
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
  