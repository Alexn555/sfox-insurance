// @ts-nocheck
import { theme } from '../../theme/theme';
import { CustomEvents } from '../../settings';
import { CustomEventService, IdService } from '../../services';
import { JSONService } from '../../services/utils';

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
      const el = IdService.id(this.id, this.shadow);
      el.onchange = (() => {
        CustomEventService.send(`${CustomEvents.interaction.selectChange}-${this.id}`, el.value);
      }); 
    }

    disconnectedCallback() {
      CustomEventService.removeListener(`${CustomEvents.interaction.selectChange}-${this.id}`);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      const el = IdService.id(this.id, this.shadow);
      if (el !== null) {
        el.value = oldValue !== newValue ? newValue : oldValue;
      }
    }

   setOptions() {
      let html = '';
      const hmtlItems = JSONService.getArray(this.items);
      let optNames = '';
      if (this.optionNames !== '') {
        optNames = JSONService.getArray(this.optionNames);
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
  