// @ts-nocheck
import { IdService } from '../../../services';
import { JSONService } from '../../../services/utils';
import { BoolEnums } from '../../../enums';
import { Reviews } from './reviews';

class ReaderReviewer extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.visible = this.getAttribute('visible') || BoolEnums.bTrue;
      this.reviews = JSONService.set(Reviews);
    }
  
    static get observedAttributes() { 
      return ['visible']; 
    }

    connectedCallback() {
      this.render();
    }

    disconnectedCallback() {
      IdService.remove(this.$close);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'visible') {
        this.visible = newValue === BoolEnums.bTrue ? true : false;
      }
    }

    showReviwwer() {
      let html = '';
      if (this.visible) {
        html = `
          <span>Reviewer under development progress</span>
        `;
      }
      return html;
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>
            .reviewer {
              padding: 10px;
            }
          </style>
          <div class="reviewer">
            ${this.showReviwwer()}
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("reader-reviewer-page", ReaderReviewer);
  }
  