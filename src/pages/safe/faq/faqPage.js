// @ts-nocheck
import { HTMLService, IdService } from '../../../services';
import { FAQSetIds } from '../../../components/ui/faq/sets';
import FAQService from '../../../services/page/faqService';

class FAQPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.basic = [];
      this.advenced = [];
    }

    connectedCallback() {
      this.render();
      this.getContent();
    }

    async getContent() {
      this.basic = await FAQService.getBasic();
      this.advenced = await FAQService.getAdvenced();

      this.setQPack('Basic', this.basic);
      this.setQPack('Advenced', this.advenced);
      let el = IdService.id('loading', this.shadow);
      el?.remove();
    }

    setQPack(name, contents) {
      let el = IdService.id('wrapper', this.shadow);
      let html = `
        <div class="qpack">
          <faq-viewer 
              id="${FAQSetIds.faqPage}"
              headline="${name}"
              items='${contents}'
              list="questions"
            >
            </faq-viewer>
        </div>
      `;
      HTMLService.appendHTML(el, html);
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
          <div id="wrapper" class="wrapper">
            <h3>FAQ page</h3>
            <span id="loading">Loading content</span>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("faq-page", FAQPage);
  }
  