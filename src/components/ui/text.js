// @ts-nocheck
import { CustomEvents } from '../../settings';
import { CustomEventService, IdService } from '../../services';

class TextInput extends HTMLElement { // numeric, usual text
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.id = this.getAttribute('id') || 'text-id';
    this.label = this.getAttribute('label') || '';
    this.min = this.getAttribute('min') || '0';
    this.max = this.getAttribute('max') || '100';
    this.className = this.getAttribute('class-name') || '';
    this.type = this.getAttribute('type') || 'text';
    this.value = this.getAttribute('value') || '';
    this.$textValue = '';
  }

  static get observedAttributes() { 
    return ['value']; 
  }

  connectedCallback() {
    this.render();
    const el = IdService.id(this.id, this.shadow);
    el.onchange = (() => {
      CustomEventService.send(`${CustomEvents.interaction.textInputChange}-${this.id}`, el.value);
    }); 
  }

  disconnectedCallback() {
    document.removeEventListener(`${CustomEvents.interaction.textInputChange}-${this.id}`, null);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const el = IdService.id(this.id, this.shadow);
    if (el !== null) {
      el.value = oldValue !== newValue ? newValue : oldValue;
    }
  }

  render() {
    this.shadow.innerHTML = `
            <style>
                input {
                  padding: 10px;
                }
                
                .input-normal {
                  width: 275px;
                }

                .input-error {
                  display: none;
                  color: var(--error-color);
                }

                .amount {
                  border: default;
                }

                .amount-error {
                  border: 1px solid var(--error-color);
                }
            </style>               
            <label for="${this.id}">${this.label}:</label>
            <input class="${this.className}"    
                min="${this.min}" 
                value="${this.value}"
                max="${this.max}" 
                id="${this.id}" 
                name="${this.id}"
                type="${this.type}"
            >                 
        `;
  }
}

if ("customElements" in window) {
  customElements.define("text-input", TextInput);
}
