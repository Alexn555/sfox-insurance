// @ts-nocheck
import { theme } from '../../theme/theme';

class AdditionalTabs extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'open'});
      this.shadow.addEventListener('click', this.openTab.bind(this));
    }
    
    connectedCallback() {
      this.render();
    }

    openTab(evt) {
      const { target } = evt;
      const item = target.id;
      const tab = this.shadow.querySelector(`#${item}`);
      const tabGame = this.shadow.querySelector('#game');
      const tabWriterForm = this.shadow.querySelector('#writerForm');

      if (tab) {
        tabGame.style.display = 'none';
        tabWriterForm.style.display = 'none';
      }

      if (item === 'game-btn') {
        tabGame.style.display = 'block';
      } else {
        tabWriterForm.style.display = 'block';
      }
    }

    render() {
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
              <button id="game-btn" onclick="this.openTab(event)">Game</button>
              <button id="writer-btn" onclick="this.openTab(event)">Writer content</button>
            </div>
            
            <div id="game" class="tabcontent">
              <game-form></game-form>
            </div>
            
            <div id="writerForm" class="tabcontent">
              <writer-form></writer-form>
            </div>   
        `;
    }
}


if ('customElements' in window) {
	customElements.define('additional-tabs', AdditionalTabs);
}
