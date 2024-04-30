// @ts-nocheck
import { IdService } from '../../services';
import { GameViewerSettings } from '../../settings/sets/gameViewer';
import { Game } from '../../settings';

class GameForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isModal = Game.buttons.dialogOpener;
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
              id="html5Games"
              display-label="${GameViewerSettings.displayLabel}"
              side="${GameViewerSettings.side}"
             >
             </game-viewer>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("game-form", GameForm);
  }
  