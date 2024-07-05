// @ts-nocheck
import { IdService, HTMLService } from '../../../services';
import { ReviewerSetIds } from '../../../components/plugins/reviewer/sets';

class ReaderReviewerAdvanced extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
      this.render();
      this.getContent();
    }

    getContent() {
      this.setReviewPack();
      let el = IdService.id('loading', this.shadow);
      el?.remove();
    }

    setReviewPack() {
      let el = IdService.id('reviewer', this.shadow);
      let html = `
        <div class="qpack">
          <reviewer-step-handler
            id="${ReviewerSetIds.reviewPageAdvanced}"
            content="reviews"
          > 
          </reviewer-step-handler>
        </div>
      `;
      HTMLService.appendHTML(el, html);
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            #reviewer {
              padding: 10px;
            }
            .qpack {
              margin-bottom: 10px;
            }
          </style>
          <div id="reviewer">
            <h3>Reviewer Advanced page</h3>
            <span id="loading">Loading content</span>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("reader-reveiwer-advanced-page", ReaderReviewerAdvanced);
  }
  