// @ts-nocheck
import { theme } from '../../theme/theme';
import commonTabStyle from '../../pages/common/tabsStyle';
import { HomePageTabs } from './sets';
import { IdService, StyleService } from '../../services';

class HomeTabs extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'closed'});
      this.theme = theme.page.tabs;
      this.tabs = {
        start: 'start',
        welcome: 'welcome',
        accounts: 'accounts'
      };
    }
    
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {
      this.$tabStart = IdService.id(this.tabs.start, this.shadow);
      this.$tabWelcome = IdService.id(this.tabs.welcome, this.shadow);
      this.$tabAccount = IdService.id(this.tabs.accounts, this.shadow);
      this.initButtons();
    }

    initButtons() {
      const { start, welcome, accounts } = HomePageTabs.tabLinks;

      this.$btnStart = IdService.idAndClick(start, this.shadow, () => {
        this.openTab(this.tabs.start, this.$tabStart);
      });
      this.$btnWelcome = IdService.idAndClick(welcome, this.shadow, () => {
        this.openTab(this.tabs.welcome, this.$tabWelcome);
      });
      this.$btnAccount = IdService.idAndClick(accounts, this.shadow, () => {
        this.openTab(this.tabs.accounts, this.$tabAccount);
      });
    }

    disconnectedCallback() {
      IdService.removeList([this.$btnStart, this.$btnWelcome, this.$btnAccount]);
    }

    openTab(evt, selected) {
      const item = evt;
      const tab = IdService.id(item, this.shadow);

      if (tab) {
        StyleService.setDisplayMultiple([this.$tabStart, this.$tabWelcome, this.$tabAccount], false);
      }
      if (selected !== null) {
        StyleService.setDisplay(selected, true);
      }
    }

    render() {
      const { start, welcome, accounts } = HomePageTabs.tabLinks;
        this.shadow.innerHTML = `
            <style>
                ${commonTabStyle(this.theme)}

                #${this.tabs.accounts} {
                  display: block;
                }
            </style>
            <div class="tab">
              <button id="${start}">Start</button>
              <button id="${welcome}">Welcome</button>
              <button id="${accounts}">Accounts</button>
            </div>

            <div id="${this.tabs.start}" class="tabcontent">
              <start-page></start-page>
            </div> 

            <div id="${this.tabs.welcome}" class="tabcontent">
                <welcome-page></welcome-page>
            </div> 
            
            <div id="${this.tabs.accounts}" class="tabcontent">
              <home-accounts-page></home-accounts-page>
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('home-tabs', HomeTabs);
}
