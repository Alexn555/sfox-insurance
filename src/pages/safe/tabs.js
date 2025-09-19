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
        editor: 'editor',
        faq: 'faq',
        games: 'games',
        banner: 'banner'
      };
      this.$c = {};
      this.$btns = {};
    }
    
    connectedCallback() {
      this.render();
      this.$c['game'] = IdService.id(this.tabs.game, this.shadow);
      this.$c['welcome'] = IdService.id(this.tabs.welcome, this.shadow);
      this.$c['texteditor'] = IdService.id(this.tabs.editor, this.shadow);
      this.$c['faq'] = IdService.id(this.tabs.faq, this.shadow);
      this.$c['games'] = IdService.id(this.tabs.games, this.shadow);
      this.$c['banner'] = IdService.id(this.tabs.banner, this.shadow);
      this.initButtons();
    }

    disconnectedCallback() {
      IdService.removeList(this.$btns);
    }

    initButtons() {
      let { game, welcome, editor, faq, games, banner } = SafePageTabs.tabLinks;

      this.$btns['game'] = IdService.idAndClick(game, this.shadow, () => {
        this.openTab(this.tabs.game, this.$c['game']);
      });
      this.$btns['welcome'] = IdService.idAndClick(welcome, this.shadow, () => {
        this.openTab(this.tabs.welcome, this.$c['welcome']);
      });
      this.$btns['texteditor'] = IdService.idAndClick(editor, this.shadow, () => {
        this.openTab(this.tabs.editor, this.$c['texteditor']);
      });
      this.$btns['faq'] = IdService.idAndClick(faq, this.shadow, () => {
        this.openTab(this.tabs.faq, this.$c['faq']);
      });
      this.$btns['games'] = IdService.idAndClick(games, this.shadow, () => {
        this.openTab(this.tabs.games, this.$c['games']);
      });
      this.$btns['banner'] = IdService.idAndClick(banner, this.shadow, () => {
        this.openTab(this.tabs.editor, this.$c['banner']);
      });
    }

    openTab(item, selected) {
      let tab = IdService.id(item, this.shadow);

      if (tab) {
        StyleService.setDisplayMultiple([
          this.$c['game'],
          this.$c['welcome'], 
          this.$c['texteditor'],
          this.$c['faq'],
          this.$c['games'],
          this.$c['banner']
        ], false);
      }
      if (selected !== null) {
        StyleService.setDisplay(selected, true);
      }
    }

    render() {
      let { game, welcome, 
        editor, 
        faq,
        games, banner
       } = SafePageTabs.tabLinks;
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
              <button id="${faq}">FAQ</button>
              <button id="${games}">Games2</button>
              <button id="${banner}">Banner</button>
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

            <div id="${this.tabs.faq}" class="tabcontent">
              <faq-page></faq-page>
            </div> 

            <div id="${this.tabs.games}" class="tabcontent">
              <safe-game-page></safe-game-page>
            </div> 

            <div id="${this.tabs.banner}" class="tabcontent">
              <banner-page></banner-page>
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('safe-tabs', SafeTabs);
}
