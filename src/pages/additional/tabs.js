// @ts-nocheck
import { theme } from '../../theme/theme';
import { CommonEvents, AdditionalPage } from '../../settings';
import { StyleService } from '../../services';

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
      this.$tabGame = this.shadow.getElementById('game');
      this.$tabMap = this.shadow.getElementById('map');
      this.$tabWriterForm = this.shadow.getElementById('writerForm');
      this.$tabAccount = this.shadow.getElementById('account');
      this.initButtons();
    }

    initButtons() {
      const { game, mapLink, writer, account } = AdditionalPage.tabLinks;
      this.$btnGame = this.shadow.getElementById(game);
      this.$btnMap = this.shadow.getElementById(mapLink);
      this.$btnWriter = this.shadow.getElementById(writer);
      this.$btnAccount = this.shadow.getElementById(account);

      this.$btnGame.addEventListener(CommonEvents.click, () => {
        this.openTab('game', this.$tabGame);
      });
      this.$btnMap.addEventListener(CommonEvents.click, () => {
        this.openTab('map', this.$tabMap);
      });
      this.$btnWriter.addEventListener(CommonEvents.click, () => {
        this.openTab('writerForm', this.$tabWriterForm);
      });
      this.$btnAccount.addEventListener(CommonEvents.click, () => {
        this.openTab('account', this.$tabAccount);
      });
    }

    disconnectedCallback() {
      this.$btnGame.removeEventListener(CommonEvents.click, null);
      this.$btnMap.removeEventListener(CommonEvents.click, null);
      this.$btnWriter.removeEventListener(CommonEvents.click, null);
      this.$btnAccount.removeEventListener(CommonEvents.click, null);
    }

    openTab(evt, selected) {
      const item = evt;
      const tab = this.shadow.getElementById(item);
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
