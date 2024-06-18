// @ts-nocheck
import { JSONService } from '../../../services/utils';
import { FAQSetIds } from '../../../components/ui/faq/sets';
import { QuestionsBasic } from './basic';
import { QuestionsAdvenced } from './advenced';

class FAQPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.basic = JSONService.set(QuestionsBasic);
      this.advenced = JSONService.set(QuestionsAdvenced);
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
            .qpack {
              margin-bottom: 10px;
            }
          </style>
          <div class="wrapper">
            <h3>FAQ page</h3>
            <div class="qpack">
              <faq-viewer 
                id="${FAQSetIds.faqPage}"
                headline="Basic"
                items='${this.basic}'
                list="questions"
              >
              </faq-viewer>
            </div>
            <div class="qpack">
              <faq-viewer 
                id="${FAQSetIds.faqPage}"
                headline="Advenced"
                items='${this.advenced}'
                list="questions"
              >
              </faq-viewer>
            </div>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("faq-page", FAQPage);
  }
  