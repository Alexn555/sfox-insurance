// @ts-nocheck
import { IdService } from '../../../services';
import { JSONService } from '../../../services/utils';
import { BoolEnums } from '../../../enums';
import { GameViewerSettings, GameViewerSetEnums } from '../../../components/ui/gameViewer/sets';
import { gmVwGames } from './games';

class GamePage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.visible = this.getAttribute('visible') || BoolEnums.bTrue;
      this.games = JSONService.set(gmVwGames);
    }
  
    static get observedAttributes() { 
      return ['visible']; 
    }

    connectedCallback() {
      this.render();
    }

    disconnectedCallback() {
      IdService.remove(this.$close);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'visible') {
        this.visible = newValue === BoolEnums.bTrue ? true : false;
      }
    }

    showGame() {
      let html = '';
      if (this.visible) {
        html = `
          <game-viewer 
            id="${GameViewerSettings.gamePage.id}"
            games='${this.games}'
            setsId="${GameViewerSetEnums.gamePage}"
          >
          </game-viewer>
        `;
      }
      return html;
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>
            .game-wrapper {
              padding: 10px;
            }
          </style>
          <div class="game-wrapper">
            ${this.showGame()}
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("game-page", GamePage);
  }
  