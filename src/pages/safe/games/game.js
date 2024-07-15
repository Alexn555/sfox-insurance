// @ts-nocheck
import { HTMLService, IdService } from '../../../services';
import { JSONService } from '../../../services/utils';
import { BoolEnums } from '../../../enums';
import { GameViewerSettings, GameViewerSetEnums } from '../../../components/plugins/gameViewer/sets';
import GameService from '../../../services/page/gameService';

class SafeGamePage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.visible = this.getAttribute('visible') || BoolEnums.bTrue;
      this.games = [];
    }
  
    static get observedAttributes() { 
      return ['visible']; 
    }

    connectedCallback() {
      this.render();
      this.getContent();
    }

    disconnectedCallback() {
      IdService.remove(this.$close);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'visible') {
        this.visible = newValue === BoolEnums.bTrue ? true : false;
      }
    }

    async getContent() {
      this.$wrapper = IdService.id('wrapper', this.shadow);
      this.games = await GameService.getSafeGames();
      this.showGames();
    }

    showGames() {
      let html = '';
      if (this.visible) {
        html = `
          <game-viewer 
            id="${GameViewerSettings.safeGamePage.id}"
            games='${this.games}'
            setsId="${GameViewerSetEnums.safeGames}"
          >
          </game-viewer>
        `;
      }
      HTMLService.html(this.$wrapper, html);
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>
            .game-wrapper {
              padding: 10px;
            }
          </style>
          <div id="wrapper" class="game-wrapper">
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("safe-game-page", SafeGamePage);
  }
  