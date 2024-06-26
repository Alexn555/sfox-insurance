// @ts-nocheck
import { HTMLService, IdService } from '../../../services';

class ReaderContactPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
      this.render();
      this.getContent();
    }

    async getContent() {
      this.setContactPack('Basic');
      let el = IdService.id('loading', this.shadow);
      el?.remove();
    }

    setContactPack(name) {
      let el = IdService.id('wrapper', this.shadow);
      let html = `
        <div class="contact">
          <h3>${name}</h3>
          <p> Contact form </p>
          <p> In development progress </p>
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
  