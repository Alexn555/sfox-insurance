// @ts-nocheck
import WriterService from '../../../services/writerService';
import { CustomEvents, Writer } from '../../../settings';
import { simulateDelay } from '../../../services/utils';
import { ContentService } from '../../../services/contentService';

class WriterArticle extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.writerService = new WriterService();
    }
  
    connectedCallback() {
      this.render();
      document.addEventListener(CustomEvents.tabs.writer.showArticle, () => {
        this.fetchContent(Writer.fetchOnce);
      });
    }

    fetchContent(loadOnce) {
      this.removeContent();
      if (loadOnce) {
        this.featchContentAtOnce();
      } else {
        const { amount, eachTime } = Writer.queue;
        this.featchContentQueue(amount, eachTime);
      }
    }

    async featchContentAtOnce() {
      let content = ['', ''];
      content[0] = await this.writerService.getContent();
      content[1] = await this.writerService.getContent();
      const el = this.shadow.querySelector('.writeContent');

      let html;
      if (content && content[0]?.body) {
        html += ContentService.createArticle(el, content[0].body);
        html += ContentService.createArticle(el, content[1].body);
        el.appendChild(html);
      }
    }

    async featchContent() {
      const content = await this.writerService.getContent();
      const el = this.shadow.querySelector('.writeContent');

      if (content && content?.body) {
        const html = ContentService.createArticle(el, content.body);
        el.appendChild(html);
      }
    }

    async featchContentQueue(amount = 4, timeout = 1000) { 
      for (let i = 0; i < amount; i++) {
        this.featchContent(i);
        await simulateDelay(timeout);
      }
    }

    removeContent() {
      const el = this.shadow.querySelector('.writeContent');
      ContentService.removeArticles(el);
    }

    render() {
      this.shadow.innerHTML = `
        <style>
            .writeContent {
              &:first-letter {
                text-transform: uppercase;
              }

              & p:first-letter {
                text-transform: uppercase;
              }
            }
        </style>
        <div class="writeContent"> </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("writer-article", WriterArticle);
  }
  