// @ts-nocheck
import { IdService } from '../../../services';
import { GameViewerSettings } from '../../../components/ui/gameViewer/sets';
import { gmVwGames } from './games';
import { Game } from '../../../settings';

class GamePage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isModal = Game.buttons.dialogOpener;
      this.games = JSON.stringify(gmVwGames);
    }
  
    connectedCallback() {
      this.render();
    }

    disconnectedCallback() {
      IdService.remove(this.$close);
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>
            .game-wrapper {
              padding: 10px;
            }
          </style>
          <div class="game-wrapper">
             <game-viewer 
              id="${GameViewerSettings.gamePage.id}"
              games='${this.games}'
              display-label="${GameViewerSettings.gamePage.displayLabel}"
              side="${GameViewerSettings.gamePage.side}"
             >
             </game-viewer>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("game-page", GamePage);
  }
  