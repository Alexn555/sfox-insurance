// @ts-nocheck
import { theme } from '../../theme/theme';
import commonTabStyle from '../../pages/common/tabsStyle';
import { ReaderPageTabs } from './sets';
import { IdService, StyleService } from '../../services';

class ReaderTabs extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'closed'});
      this.theme = theme.page.tabs;
      this.tabs = {
        contact: 'contact',
        welcome: 'welcome',
        galleryPosters: 'galleryPosters',
        reviewer: 'reviewer',
        reviewerAdv: 'reviewerAdv'
      };
    }
    
    connectedCallback() {
      this.render();
      this.initForm();
    }

    disconnectedCallback() {
      IdService.removeList([
        this.$btnContact, 
        this.$btnWelcome,
        this.$btnPosters,
        this.$btnReviewer,
        this.$btnReviewerAdv
      ]);
    }

    initForm() {
      this.$tabContact = IdService.id(this.tabs.contact, this.shadow);
      this.$tabWelcome = IdService.id(this.tabs.welcome, this.shadow);
      this.$tabPosters = IdService.id(this.tabs.galleryPosters, this.shadow);
      this.$tabReviwer = IdService.id(this.tabs.reviewer, this.shadow);
      this.$tabReviwerAdv = IdService.id(this.tabs.reviewerAdv, this.shadow);
      this.initButtons();
    }

    initButtons() {
      let { contact, welcome, galleryPosters, reviewer, reviewerAdv } = ReaderPageTabs.tabLinks;

      this.$btnContact = IdService.idAndClick(contact, this.shadow, () => {
        this.openTab(this.tabs.contact, this.$tabContact);
      });
      this.$btnWelcome = IdService.idAndClick(welcome, this.shadow, () => {
        this.openTab(this.tabs.welcome, this.$tabWelcome);
      });
      this.$btnPosters = IdService.idAndClick(galleryPosters, this.shadow, () => {
        this.openTab(this.tabs.galleryPosters, this.$tabPosters);
      });
      this.$btnReviewer = IdService.idAndClick(reviewer, this.shadow, () => {
        this.openTab(this.tabs.reviewer, this.$tabReviwer);
      });
      this.$btnReviewerAdv = IdService.idAndClick(reviewerAdv, this.shadow, () => {
        this.openTab(this.tabs.reviewerAdv, this.$tabReviwerAdv);
      });
    }

    openTab(evt, selected) {
      let item = evt;
      let tab = IdService.id(item, this.shadow);

      if (tab) {
        StyleService.setDisplayMultiple([
          this.$tabContact, 
          this.$tabWelcome, 
          this.$tabPosters,
          this.$tabReviwer,
          this.$tabReviwerAdv
        ], false);
      }
      if (selected !== null) {
        StyleService.setDisplay(selected, true);
      }
    }

    render() {
      let { 
        contact,
        welcome, 
        reviewer,
        reviewerAdv,
        galleryPosters
       } = ReaderPageTabs.tabLinks;
        this.shadow.innerHTML = `
            <style>
              ${commonTabStyle(this.theme)}

              #${this.tabs.reviewerAdv} {
                display: block;
              }
            </style>
            <div class="tab">
              <button id="${contact}">Contact</button>
              <button id="${welcome}">Welcome</button>
              <button id="${galleryPosters}">Gallery Posters</button>
              <button id="${reviewer}">Reviewer</button>
              <button id="${reviewerAdv}">Reviewer Advanced</button>
            </div>

            <div id="${this.tabs.contact}" class="tabcontent">
              <reader-contact-page></reader-contact-page>
            </div> 

            <div id="${this.tabs.galleryPosters}" class="tabcontent">
              <gallery-posters-page></gallery-posters-page>
            </div> 

            <div id="${this.tabs.welcome}" class="tabcontent">
              <reader-welcome-page></reader-welcome-page>
            </div> 
      
            <div id="${this.tabs.reviewer}" class="tabcontent">
              <reader-reviewer-page></reader-reviewer-page>
            </div> 

            <div id="${this.tabs.reviewerAdv}" class="tabcontent">
              <reader-reveiwer-advanced-page></reader-reveiwer-advanced-page>
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('reader-tabs', ReaderTabs);
}
