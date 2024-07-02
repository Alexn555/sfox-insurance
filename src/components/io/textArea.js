// @ts-nocheck
import { CustomEvents } from '../../settings';
import { CustomEventService, IdService } from '../../services';

class TextAreaInput extends HTMLElement { // numeric, usual text
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.id = this.getAttribute('id') || 'text-area-id';
    this.name = this.getAttribute('name') || '';
    this.label = this.getAttribute('label') || '';
    this.rows = this.getAttribute('rows') || '50';
    this.cols = this.getAttribute('cols') || '10';
    this.value = this.getAttribute('value') || '';
  }

  static get observedAttributes() { 
    return ['value']; 
  }

  connectedCallback() {
    this.render();
    const el = IdService.id(this.id, this.shadow);
    el.onchange = (() => {
      CustomEventService.send(`${CustomEvents.interaction.textAreaChange}-${this.id}`, el.value);
    }); 
  }

  disconnectedCallback() {
    CustomEventService.removeListener(`${CustomEvents.interaction.textAreaChange}-${this.id}`);
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
        </style>               
        <label for="${this.id}">${this.label}:</label>
        <textarea id="${this.id}" 
          name="${this.name}"
          rows="${this.rows}" 
          cols="${this.cols}"
        >
          ${this.value}
        </textarea>            
    `;
  }
}

if ("customElements" in window) {
  customElements.define("text-area-input", TextAreaInput);
}
