// @ts-nocheck
import WriterService from '../../../services/page/writerService';
import { CustomPageEvents, Writer } from '../../../settings';
import { ServerService } from '../../../services/helpers';
import { ContentService } from '../../../services/dom/contentService';
import { ClassIdService, CustomEventService } from '../../../services';

class WriterArticle extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.writerService = new WriterService();
    }
  
    connectedCallback() {
      this.render();
      this.$writerContent = ClassIdService.id('writeContent', this.shadow);

      CustomEventService.event(CustomPageEvents.tabs.writer.showArticle, () => {
        this.fetchContent(Writer.fetchOnce);
      }, document);
    }

    fetchContent(loadOnce) {
      this.removeContent();
      if (loadOnce) {
        this.showLoadingArticle();
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
      const el = this.$writerContent;
      el.innerHTML = '';

      let html;
      if (content && content[0]?.body) {
        html += ContentService.createArticle(el, content[0].body);
        html += ContentService.createArticle(el, content[1].body);
        el.appendChild(html);
      }
    }

    async featchContent() {
      const content = await this.writerService.getContent();
      const el = this.$writerContent;

      if (content && content?.body) {
        const html = ContentService.createArticle(el, content.body);
        el.appendChild(html);
      }
    }

    async featchContentQueue(amount = 4, timeout = 1000) { 
      for (let i = 0; i < amount; i++) {
        this.featchContent(i);
        await ServerService.simulateDelay(timeout);
      }
    }

    removeContent() {
      ContentService.removeArticles(this.$writerContent);
    }

    showLoadingArticle() {
      this.$writerContent.innerHTML = 'Loading article...';
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
  