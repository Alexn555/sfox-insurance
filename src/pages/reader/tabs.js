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
        reviewer: 'reviewer',
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
        this.$btnReviewer
      ]);
    }

    initForm() {
      this.$tabContact = IdService.id(this.tabs.contact, this.shadow);
      this.$tabWelcome = IdService.id(this.tabs.welcome, this.shadow);
      this.$tabReviwer = IdService.id(this.tabs.reviewer, this.shadow);
      this.initButtons();
    }

    initButtons() {
      const { contact, welcome, reviewer } = ReaderPageTabs.tabLinks;

      this.$btnContact = IdService.idAndClick(contact, this.shadow, () => {
        this.openTab(this.tabs.contact, this.$tabContact);
      });
      this.$btnWelcome = IdService.idAndClick(welcome, this.shadow, () => {
        this.openTab(this.tabs.welcome, this.$tabWelcome);
      });
      this.$btnReviewer = IdService.idAndClick(reviewer, this.shadow, () => {
        this.openTab(this.tabs.reviewer, this.$tabReviwer);
      });
    }

    openTab(evt, selected) {
      const item = evt;
      const tab = IdService.id(item, this.shadow);

      if (tab) {
        StyleService.setDisplayMultiple([
          this.$tabContact, 
          this.$tabWelcome, 
          this.$tabReviwer
        ], false);
      }
      if (selected !== null) {
        StyleService.setDisplay(selected, true);
      }
    }

    render() {
      const { 
        contact,
        welcome, 
        reviewer, 
       } = ReaderPageTabs.tabLinks;
        this.shadow.innerHTML = `
            <style>
              ${commonTabStyle(this.theme)}

              #${this.tabs.contact} {
                display: block;
              }
            </style>
            <div class="tab">
              <button id="${contact}">Contact</button>
              <button id="${welcome}">Welcome</button>
              <button id="${reviewer}">Reviewer</button>
            </div>

            <div id="${this.tabs.contact}" class="tabcontent">
              <reader-contact-page></reader-contact-page>
            </div> 

            <div id="${this.tabs.welcome}" class="tabcontent">
              <reader-welcome-page></reader-welcome-page>
            </div> 
      
            <div id="${this.tabs.reviewer}" class="tabcontent">
              <reader-reviewer-page></reader-reviewer-page>
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('reader-tabs', ReaderTabs);
}
