// @ts-nocheck
import { theme } from '../../theme/theme';
import { CommonEvents, AdditionalPage } from '../../settings';
import { StyleService } from '../../services';

class AdditionalTabs extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'closed'});
      this.shadow.addEventListener(CommonEvents.click, this.openTab.bind(this));
    }
    
    connectedCallback() {
      this.render();
    }

    openTab(evt) {
      const { target } = evt;
      const item = target.id;
      const tab = this.shadow.getElementById(item);
      const tabGame = this.shadow.getElementById('game');
      const tabMap = this.shadow.getElementById('map');
      const tabWriterForm = this.shadow.getElementById('writerForm');
      const tabAccount = this.shadow.getElementById('account');

      if (tab) {
        StyleService.setDisplayMultiple([tabGame, tabMap, tabWriterForm, tabAccount], false);
      }

      const { game, mapLink, writer, account } = AdditionalPage.tabLinks;
      let selected = null;
      switch (item) {
        case game:
          selected = tabGame;
          break;
        case mapLink:
          selected = tabMap;
          break;
        case writer:
          selected = tabWriterForm;
          break;
        case account:
          selected = tabAccount;
          break; 
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
              <button id="${game}" onclick="this.openTab(event)">Game</button>
              <button id="${mapLink}" onclick="this.openTab(event)">Map</button>
              <button id="${writer}" onclick="this.openTab(event)">Writer content</button>
              <button id="${account}" onclick="this.openTab(event)">Account</button>
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
