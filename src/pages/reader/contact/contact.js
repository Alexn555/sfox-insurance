// @ts-nocheck
import { BoolEnums } from '../../../enums';
import { HTMLService, IdService } from '../../../services';
import { ContactIds } from '../../../components/plugins/contact/sets';

class ReaderContactPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
      this.render();
      const setContactPack = (name) => {
        let el = IdService.id('wrapper', this.shadow);
        let html = `
          <div class="contact">
            <contact-form
              id="${ContactIds.readerContactPage}"
              headline="${name}"
              name-required="${BoolEnums.bTrue}"
              btn-label="Send"
            >
            </contact-form>
          </div>
        `;
        HTMLService.appendHTML(el, html);
      };

      setContactPack('Contact');
      let el = IdService.id('loading', this.shadow);
      el?.remove();
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>
            .wrapper {
              padding: 10px;
            }
            .contact {
              margin-bottom: 10px;
            }
          </style>
          <div id="wrapper" class="wrapper">
            <h3>Contact page</h3>
            <span id="loading">Loading content</span>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("reader-contact-page", ReaderContactPage);
  }
  