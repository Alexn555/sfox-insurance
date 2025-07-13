// @ts-nocheck
import { CustomEvents } from '../../settings';
import { CustomEventService, IdService } from '../../services';

class RadioInput extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.id = this.getAttribute('id') || 'text-id';
    this.name = this.getAttribute('name') || this.id;
    this.label = this.getAttribute('label') || '';
    this.value = this.getAttribute('value') || '';
  }

  static get observedAttributes() { 
    return ['value']; 
  }

  connectedCallback() {
    this.render();
    let el = IdService.id(this.id, this.shadow);
    el.onchange = (() => {
      CustomEventService.send(`${CustomEvents.interaction.radioChange}-${this.id}`, el.value);
    }); 
  }

  disconnectedCallback() {
    CustomEventService.removeListener(`${CustomEvents.interaction.radioChange}-${this.id}`);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    let el = IdService.id(this.id, this.shadow);
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
      <input type="radio" id="${this.id}" name="${this.name}" value="${this.value}" />
      <label for="${this.id}">${this.label}</label>
    `;
  }
}

if ("customElements" in window) {
  customElements.define("radio-input", RadioInput);
}
