// @ts-nocheck
import { IdService, HTMLService } from '../../../services';
import { ReviewerSetIds } from '../../../components/plugins/reviewer/sets';
import ReviewerService from '../../../services/page/reviewerService';

class ReaderReviewer extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.useSingle = false;
    }

    connectedCallback() {
      this.render();
      this.getContent();
    }

    async getContent() {
      this.$reviewer = IdService.id('reviewer', this.shadow);
      this.basic = await ReviewerService.getBasic();

      if (this.useSingle) {
        this.setReviewPack(ReviewerSetIds.reviewPage, 'Engine reviewer', this.basic);
      } else {
        this.setReviewPack(ReviewerSetIds.reviewPageMultiple, 'Multiple answers reviewer', this.basic);
      }
      let el = IdService.id('loading', this.shadow);
      el?.remove();
    }

    setReviewPack(id, name, contents) {
      let html = `
        <div class="qpack">
          <reader-reviewer
            id="${id}"
            setsId="${id}"
            headline="${name}"
            items='${contents}'
            list="answers"
          > 
          </reader-reviewer>
        </div>
      `;
      HTMLService.appendHTML(this.$reviewer, html);
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
            <h3>Reviewer page</h3>
            <span id="loading">Loading content</span>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("reader-reviewer-page", ReaderReviewer);
  }
  