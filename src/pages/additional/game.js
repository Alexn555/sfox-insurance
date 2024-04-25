// @ts-nocheck
import { IdService } from '../../services';
import { easeOpacity } from '../../components/common/styles/dialogs/ease';
import { Game } from '../../settings';

class GameForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isGameOpen = false;
      this.isModal = Game.buttons.dialogOpener;
    }
  
    connectedCallback() {
      this.render();

      if (this.isModal) {
        this.$gameOpen = IdService.idAndClick('gameOpen', this.shadow, () => {
          this.toggleGame(true);
        });
      }
  
      this.$close = IdService.idAndClick('closeGame', this.shadow, () => {
        this.toggleGame(false);
      });
    }

    disconnectedCallback() {
      IdService.remove(this.$close);
      if (this.isModal) {
        IdService.remove(this.$gameOpen);
      }
    }

    toggleGame(isOpen) {
      const el = IdService.id('game', this.shadow);
      if (!this.isGameOpen) {
        el.showModal();
      } else {
        el.close();
      }
      this.setGameOpen(isOpen);
    }

    setGameOpen(toggle) {
      this.isGameOpen = toggle;
    }

    showDialogOpen() {
      return this.isModal ? `
        <div>
          <action-button id="gameOpen" label="Open Game" type="action" />
        </div>
      ` : '';
    }

    showGameContent(w = 500, h = 530, title = 'Game board', className = '') {
      return `
        <div class="${className}">
          <h2>${title}</h2>
          <iframe 
            src="http://norwaydict.com/html5games/wordgame/sfox_index.html"
            title="Game"
            width="${w}"
            height="${h}"
          >
          </iframe>
        </div>
      `;
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>
            .game-wrapper {
              padding: 20px 0 20px 0;

              @media (max-width: 768px) {
                grid-template-columns: 100%;
              }

              & dialog#game {
                width: 600px !important;
                padding: 10px;
                border: 1px dotted black;
                ${easeOpacity(0.7)}
              }

              .inline-game {
                border: 1px dashed grey;
                padding: 2px;
                
                & h2 {
                  padding-left: 10px;
                }
              }
            }
          </style>
          <form>
            <div class="game-wrapper">
                ${this.showDialogOpen()}
                ${this.showGameContent(550, 530, 'Game board', 'inline-game')}
              
                <dialog id="game">
                  ${this.showGameContent(550, 530)}
                  <action-button id="closeGame" label="Close" type="action" />
                </dialog>                
            </div>
          </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("game-form", GameForm);
  }
  