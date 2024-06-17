// @ts-nocheck
import { JSONService } from '../../../services/utils';
import { FAQSets } from '../../../components/ui/faq/sets';
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
            .questions-wrapper {
              padding: 10px;
            }
          </style>
          <div class="questions-wrapper">
            <h3>FAQ page</h3>
            <faq-viewer 
              id="${FAQSets.faqPage.id}"
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
  