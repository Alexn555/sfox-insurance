// @ts-nocheck
import { theme } from '../../theme/theme';
import commonTabStyle from '../../pages/common/tabsStyle';
import { SafePageTabs } from './sets';
import { IdService, StyleService } from '../../services';

class SafeTabs extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'closed'});
      this.theme = theme.page.tabs;
      this.tabs = {
        game: 'game',
        welcome: 'welcome',
        editor: 'editor'
      };
    }
    
    connectedCallback() {
      this.render();
      this.initForm();
    }

    disconnectedCallback() {
      IdService.removeList([this.$btnGame, this.$btnWelcome]);
    }

    initForm() {
      this.$tabGame = IdService.id(this.tabs.game, this.shadow);
      this.$tabWelcome = IdService.id(this.tabs.welcome, this.shadow);
      this.$tabTextEditor = IdService.id(this.tabs.editor, this.shadow);
      this.initButtons();
    }

    initButtons() {
      const { game, welcome, editor } = SafePageTabs.tabLinks;

      this.$btnGame = IdService.idAndClick(game, this.shadow, () => {
        this.openTab(this.tabs.game, this.$tabGame);
      });
      this.$btnWelcome = IdService.idAndClick(welcome, this.shadow, () => {
        this.openTab(this.tabs.welcome, this.$tabWelcome);
      });
      this.$btnEditor = IdService.idAndClick(editor, this.shadow, () => {
        this.openTab(this.tabs.editor, this.$tabTextEditor);
      });
    }

    openTab(evt, selected) {
      const item = evt;
      const tab = IdService.id(item, this.shadow);

      if (tab) {
        StyleService.setDisplayMultiple([this.$tabGame, this.$tabWelcome, this.$tabTextEditor], false);
      }
      if (selected !== null) {
        StyleService.setDisplay(selected, true);
      }
    }

    render() {
      const { game, welcome, editor } = SafePageTabs.tabLinks;
        this.shadow.innerHTML = `
            <style>
                ${commonTabStyle(this.theme)}

                #${this.tabs.game} {
                  display: block;
                }
            </style>
            <div class="tab">
              <button id="${game}">SafeKing</button>
              <button id="${welcome}">Welcome</button>
              <button id="${editor}">Editor</button>
            </div>

            <div id="${this.tabs.game}" class="tabcontent">
              <safe-king-page></safe-king-page>
            </div> 

            <div id="${this.tabs.welcome}" class="tabcontent">
              <safe-welcome-page></safe-welcome-page>
            </div> 
      
            <div id="${this.tabs.editor}" class="tabcontent">
              <text-editor-page></text-editor-page>
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('safe-tabs', SafeTabs);
}
