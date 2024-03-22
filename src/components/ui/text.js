// @ts-nocheck
import { theme } from '../../theme/theme';

class TextInput extends HTMLElement { // numeric, usual text
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.id = this.getAttribute('id') || 'text-id';
    this.label = this.getAttribute('label') || '';
    this.min = this.getAttribute('min') || '0';
    this.max = this.getAttribute('max') || '100';
    this.className = this.getAttribute('class-name') || '';
    this.value = this.getAttribute('value') || '';
    this.$textValue = '';
  }

  static get observedAttributes() { 
    return ['value']; 
  }

  connectedCallback() {
    this.render();
    const el = this.shadow.getElementById(this.id);
    el.onchange = (() => {
      document.dispatchEvent(new CustomEvent(`text-input-change-${this.id}`, {
        detail: {value: el.value}, bubbles: true, cancelable: false 
      }));
    }); 
  }

  disconnectedCallback() {
    document.removeEventListener(`text-input-change-${this.id}`, null);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const el = this.shadow.getElementById(this.id);
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
                type="text" 
                id="${this.id}" 
                name="${this.id}"
                type="text"
            >                 
        `;
  }
}

if ("customElements" in window) {
  customElements.define("text-input", TextInput);
}