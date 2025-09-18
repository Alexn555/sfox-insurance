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
      this.$tab = [];
      this.$btns = [];
    }
    
    connectedCallback() {
      this.render();
      this.initForm();
    }

    disconnectedCallback() {
      IdService.removeList(this.$btns);
    }

    initForm() {
      this.$tab['contact'] = IdService.id(this.tabs.contact, this.shadow);
      this.$tab['welcome'] = IdService.id(this.tabs.welcome, this.shadow);
      this.$tab['posters'] = IdService.id(this.tabs.galleryPosters, this.shadow);
      this.$tab['reviewer'] = IdService.id(this.tabs.reviewer, this.shadow);
      this.$tab['reviewerAdv'] = IdService.id(this.tabs.reviewerAdv, this.shadow);
      this.initButtons();
    }

    initButtons() {
      let { contact, welcome, galleryPosters, reviewer, reviewerAdv } = ReaderPageTabs.tabLinks;

      this.$btns['contact'] = IdService.idAndClick(contact, this.shadow, () => {
        this.openTab(this.tabs.contact, this.$tab['contact']);
      });
      this.$btns['welcome'] = IdService.idAndClick(welcome, this.shadow, () => {
        this.openTab(this.tabs.welcome, this.$tab['welcome'] );
      });
      this.$btns['posters'] = IdService.idAndClick(galleryPosters, this.shadow, () => {
        this.openTab(this.tabs.galleryPosters, this.$tab['posters']);
      });
      this.$btns['reviewer'] = IdService.idAndClick(reviewer, this.shadow, () => {
        this.openTab(this.tabs.reviewer, this.$tab['reviewer']);
      });
      this.$btns['reviewerAdv'] = IdService.idAndClick(reviewerAdv, this.shadow, () => {
        this.openTab(this.tabs.reviewerAdv, this.$tab['reviewerAdv']);
      });
    }

    openTab(item, selected) {
      let tab = IdService.id(item, this.shadow);

      if (tab) {
        StyleService.setDisplayMultiple([
          this.$tab['contact'], 
          this.$tab['welcome'] , 
          this.$tab['posters'],
          this.$tab['reviewer'],
          this.$tab['reviewerAdv']
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
