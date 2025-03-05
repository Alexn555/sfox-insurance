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
    }
    
    connectedCallback() {
      this.render();
      this.initForm();
    }

    disconnectedCallback() {
      IdService.removeList([
        this.$btnGame, 
        this.$btnWelcome,
        this.$btnEditor,
        this.$btnFAQ,
        this.$btnGames,
        this.$btnBanner
      ]);
    }

    initForm() {
      this.$tabGame = IdService.id(this.tabs.game, this.shadow);
      this.$tabWelcome = IdService.id(this.tabs.welcome, this.shadow);
      this.$tabTextEditor = IdService.id(this.tabs.editor, this.shadow);
      this.$tabFaq = IdService.id(this.tabs.faq, this.shadow);
      this.$tabGames = IdService.id(this.tabs.games, this.shadow);
      this.$tabBanner = IdService.id(this.tabs.banner, this.shadow);
      this.initButtons();
    }

    initButtons() {
      let { game, welcome, editor, faq, games, banner } = SafePageTabs.tabLinks;

      this.$btnGame = IdService.idAndClick(game, this.shadow, () => {
        this.openTab(this.tabs.game, this.$tabGame);
      });
      this.$btnWelcome = IdService.idAndClick(welcome, this.shadow, () => {
        this.openTab(this.tabs.welcome, this.$tabWelcome);
      });
      this.$btnEditor = IdService.idAndClick(editor, this.shadow, () => {
        this.openTab(this.tabs.editor, this.$tabTextEditor);
      });
      this.$btnFAQ = IdService.idAndClick(faq, this.shadow, () => {
        this.openTab(this.tabs.faq, this.$tabFaq);
      });
      this.$btnGames = IdService.idAndClick(games, this.shadow, () => {
        this.openTab(this.tabs.games, this.$tabGames);
      });
      this.$btnBanner = IdService.idAndClick(banner, this.shadow, () => {
        this.openTab(this.tabs.editor, this.$tabBanner);
      });
    }

    openTab(evt, selected) {
      let item = evt;
      let tab = IdService.id(item, this.shadow);

      if (tab) {
        StyleService.setDisplayMultiple([
          this.$tabGame, 
          this.$tabWelcome, 
          this.$tabTextEditor,
          this.$tabFaq,
          this.$tabGames, 
          this.$tabBanner  
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
