// @ts-nocheck
import { theme } from '../../theme/theme';
import { AdditionalPage } from '../../settings';
import { IdService, StyleService } from '../../services';

class AdditionalTabs extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'closed'});
    }
    
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {
      this.$tabGame = IdService.id('game', this.shadow);
      this.$tabMap = IdService.id('map', this.shadow);
      this.$tabWriterForm = IdService.id('writerForm', this.shadow);
      this.$tabAccount = IdService.id('account', this.shadow);
      this.initButtons();
    }

    initButtons() {
      const { game, mapLink, writer, account } = AdditionalPage.tabLinks;

      this.$btnGame = IdService.idAndClick(game, this.shadow, () => {
        this.openTab('game', this.$tabGame);
      });
      this.$btnMap = IdService.idAndClick(mapLink, this.shadow, () => {
        this.openTab('map', this.$tabMap);
      });
      this.$btnWriter = IdService.idAndClick(writer, this.shadow, () => {
        this.openTab('writerForm', this.$tabWriterForm);
      });
      this.$btnAccount = IdService.idAndClick(account, this.shadow, () => {
        this.openTab('game', this.$tabAccount);
      });
    }

    disconnectedCallback() {
      IdService.removeList([this.$btnGame, this.$btnMap, this.$btnWriter, this.$btnAccount]);
    }

    openTab(evt, selected) {
      const item = evt;
      const tab = IdService.id(item, this.shadow);
      if (tab) {
        StyleService.setDisplayMultiple([this.$tabGame, this.$tabMap, this.$tabWriterForm, this.$tabAccount], false);
      }
      if (selected !== null) {
        StyleService.setDisplay(selected, true);
      }
    }

    render() {
      const { game, mapLink, writer, account } = AdditionalPage.tabLinks;
        this.shadow.innerHTML = `
            <style>
                .tab {
                  overflow: hidden;
                  background-color: ${theme.page.tabs.background};
                  border-radius: 4px;
                }
                
                .tab button {
                  background-color: inherit;
                  float: left;
                  border: none;
                  outline: none;
                  cursor: pointer;
                  padding: 14px 16px;
                  transition: 0.3s;
                  font-size: 17px;
                }
                
                .tab button:hover {
                  background-color: ${theme.page.tabs.hover};
                  color: white;
                  border-radius: 4px;
                }
                
                .tab button.active {
                  background-color: ${theme.page.tabs.background};
                }
                
                .tabcontent {
                  display: none;
                  padding: 6px 12px;
                  background-color: white;
                  border: 1px solid ${theme.page.tabs.border};
                  border-top: none;
                }

                #writerForm {
                  display: block;
                }
            </style>
            <div class="tab">
              <button id="${game}">Game</button>
              <button id="${mapLink}">Map</button>
              <button id="${writer}">Writer content</button>
              <button id="${account}">Account</button>
            </div>
            
            <div id="game" class="tabcontent">
              <game-form></game-form>
            </div>

            <div id="map" class="tabcontent">
              <map-form></map-form>
            </div>   
            
            <div id="writerForm" class="tabcontent">
              <writer-form></writer-form>
            </div> 
            
            <div id="account" class="tabcontent">
              <account-page></account-page>
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('additional-tabs', AdditionalTabs);
}
