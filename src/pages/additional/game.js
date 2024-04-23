// @ts-nocheck
import { IdService } from '../../services';
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
      const el = IdService.id('gameDialog', this.shadow);
      if (!this.isGameOpen) {
        el.showModal();
      } else {
        el.close();
      }
      this.setGameOpen(isOpen)
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

    showGameContent(w = 550, h = 530, title = 'Game board', className = '') {
      return `
        <div class="${className}">
          <h2>${title}</h2>
          <iframe 
            src="http://norwaydict.com/html5games/wordgame/index.html"
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
                  & div {
                    padding: 2px;
                  }

                  &:nth-child(1) {
                    padding-top: 20px;
                  }

                  @media (max-width: 768px) {
                    grid-template-columns: 100%;
                  }

                  & dialog#gameDialog {
                    width: 600px !important;
                    padding: 10px;
                    border: 1px dotted black;
                    opacity 0.7s ease-out,
                    transform 0.7s ease-out,
                    overlay 0.7s ease-out allow-discrete,
                    display 0.7s ease-out allow-discrete;
                  }

                  .inline-game {
                    border: 1px dashed grey;
                    & h2 {
                      padding-left: 8px;
                    }
                  }
              }
            </style>
            <form>
                <div class="game-wrapper">
                    ${this.showDialogOpen()}
                    ${this.showGameContent(550, 530, 'Game board', 'inline-game')}
                  
                    <dialog id="gameDialog">
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
  