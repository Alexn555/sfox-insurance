// @ts-nocheck
class Selectbox extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.label = this.getAttribute('label') || '';
      this.symbol = this.getAttribute('symbol') || '';
      this.id = this.getAttribute('selectbox-id') || 'select-id';
      this.width = this.getAttribute('width') || '100';
      this.items = this.getAttribute('items') || '[]';
      this.optionNames = this.getAttribute('option-names') || '';
    }
  
    connectedCallback() {
      this.setOptions();
      this.render();
      const el = this.shadow.querySelector(`#${this.id}`);
      el.onchange = (() => {
        document.dispatchEvent(new CustomEvent(`select-change-${this.id}`, {
          detail: {value: el.value}, bubbles: true, cancelable: false 
        }));
      }); 
    }

    
    disconnectedCallback() {
      document.removeEventListener(`select-change-${this.id}`);
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
                background-color: #ebf8f2;
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
  