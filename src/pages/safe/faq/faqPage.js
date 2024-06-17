// @ts-nocheck
import { JSONService } from '../../../services/utils';
import { FAQSetIds } from '../../../components/ui/faq/sets';
import { Questions } from './questions';

class FAQPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.items = JSONService.set(Questions);
    }

    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>
            .wrapper {
              padding: 10px;
            }
          </style>
          <div class="wrapper">
            <h3>FAQ page</h3>
            <faq-viewer 
              id="${FAQSetIds.faqPage}"
              items='${this.items}'
              list="questions"
            >
            </faq-viewer>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("faq-page", FAQPage);
  }
  