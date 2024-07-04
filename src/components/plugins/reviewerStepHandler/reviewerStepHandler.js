// @ts-nocheck
import { ThemeHelper } from '../../../theme/theme';
import { PackIds } from '../../../theme/enums';
import { IdService, StyleService, HTMLService, CustomEventService, LoggerService } from '../../../services';
import { SettingsChecker } from '../../../services/helpers/settingsChecker';
import ReviewerService from '../../../services/page/reviewerService';
import { ReviewSets, ReviewerSetIds } from '../reviewer/sets';
import { ReviewerStepHandlerSets } from './sets';
import { ReviewEvents } from '../reviewer/events';

class ReviewerStepHandler extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.id = this.getAttribute('id') || 'common';
    this.content = this.getAttribute('content') || 'answers';
    this.theme = ThemeHelper.get([PackIds.reviewer]);
    this.sets = SettingsChecker.getId(this.id, ReviewerSetIds, ReviewSets);
    this.currentPage = 0;
    this.pages = ReviewerStepHandlerSets.pages;
    this.totalSaveObj = {};

    this.headlines = [
      'Engine reviewer',
      'Advanced'
    ];

    CustomEventService.event(ReviewEvents.submit, (e) => {
      let submitObj = e.detail.value;
      let el = IdService.id(submitObj.id, this.shadow);
      StyleService.setDisplay(el, false);
      this.totalSaveObj[submitObj.id] = submitObj.saveObj;
      this.addMoreContent();
    });
  }

  connectedCallback() {
    this.render();
    this.initForm();
    this.getContent();
  }

  disconnectedCallback() {
    IdService.removeList([this.$submit]);
    this.currentPage = 0;
  }

  initForm() {
    this.$wrapper = IdService.id('wrapper', this.shadow);
    this.$content = IdService.id(this.content, this.shadow);
    this.$notice = IdService.id('notice', this.shadow);
  }

  async getContent(page = 0) {
    this.content = '';
    switch (page) {
      case 0:
      default:
        this.content += await ReviewerService.getBasic();
        this.togglePage(1, false);
      break;
      case 1: 
        this.content += await ReviewerService.getAdv();
        this.togglePage(2, false);
      break;
    }

    this.setReviewPack(this.headlines[page], page, this.content);
    let el = IdService.id('loading', this.shadow);
    el?.remove();
  }

  addMoreContent() {
    if (this.currentPage === -1) { return; }
    if (this.currentPage < this.pages) {
      this.getContent(this.currentPage);
      this.currentPage = this.currentPage + 1;
      this.togglePage(1, true);
    } else {
      this.getSubmitButton();
      this.currentPage = -1;
    }
  }

  togglePage(toggle, isAdd = false) {
    this.currentPage = isAdd ? this.currentPage + toggle : toggle;
  }

  setReviewPack(name, page, contents) {
    let submitLabel = page < this.pages - 1 ? 'More questions' : 'Complete';
    let html = `
      <div class="qpack">
        <reader-reviewer
          id="${ReviewerSetIds.reviewPage}-${page}"
          setsId="${ReviewerSetIds.reviewPage}"
          headline="${name}"
          items='${contents}'
          list="answers"
          submit="${submitLabel}"
        > 
        </reader-reviewer>
      </div>
    `;
    HTMLService.appendHTML(this.$content, html);
    this.getMoreButton();
  }

  submitForm() {
    let msg = `All ok,
        demo message not send width save obj ${JSON.stringify(this.totalSaveObj)}! :) `;
    LoggerService.log('Reviewer step handler total save obj ', this.totalSaveObj);
    if (this.$notice) {
      HTMLService.html(this.$notice, msg);
      setTimeout(() => {
      HTMLService.html(this.$notice, ''); 
      }, this.sets.message.timeout * 1000);
    }
  }

  getMoreButton() {
    if (this.sets.showMoreBtn) {
      let html = `
        <div class="more">
          <action-button id="reviewer-more" label="More Content"></action-button>
        </div>
      `;
      HTMLService.appendHTML(this.$content, html);
      if (!this.$more && this.currentPage < this.pages) {
        this.$more = IdService.idAndClick('reviewer-more', this.shadow, this.addMoreContent.bind(this));
      }
    }
  }

  getSubmitButton() {
    let html = `
      <p> Total save obj: ${JSON.stringify(this.totalSaveObj)} </p>
      <div class="submit">
        <action-button id="reviewer-submit" label="Submit"></action-button>
      </div>
      <div id="notice"></div>
    `;
    HTMLService.appendHTML(this.$wrapper, html);
    if (!this.$submit) {
      this.$submit = IdService.idAndClick('reviewer-submit', this.shadow, this.submitForm.bind(this));
    }
  }

  render() {
    let pads = this.sets.pads;
    let fonts = this.sets.fonts;
    this.shadow.innerHTML = this.sets.enabled ? `
      <style>
        #wrapper {
          background-color: ${this.theme.wrapper.background};
          padding: 2px;
          font-size: ${fonts.wrapper};
        }
        .content {
          display: ${this.sets.contentHideOnStart ? 'none': 'block'};
          padding: ${pads.content};
        }
        .more {
          padding: 10px;
        }
        #notice {
          padding: ${pads.item};
          color: blue;
          font-weight: bold;
        }
      </style>
      <div id="wrapper">
        <span id="loading">Loading advanced content</span>
        <div id="${this.content}" class="content"></div>
      </div>
     ` : '';
  }
}

if ("customElements" in window) {
  customElements.define("reviewer-step-handler", ReviewerStepHandler);
}
