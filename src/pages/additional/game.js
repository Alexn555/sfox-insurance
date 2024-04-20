// @ts-nocheck
import { IdService } from '../../services';

class GameForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isGameOpen = false;
    }
  
    connectedCallback() {
      this.render();

      IdService.idAndClick('gameOpen', this.shadow, () => {
        this.toggleGame(true);
      });
      IdService.idAndClick('closeGame', this.shadow, () => {
        this.toggleGame(false);
      });
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
  
    render() {
      this.shadow.innerHTML = `
            <style>
               .game-wrapper {
                  display: grid;
                  grid-template-columns: 50% 50%; 

                  & div {
                    padding: 20px;
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
              }
            </style>
            <form>
                <div class="game-wrapper">
                    <div>
                      <action-button id="gameOpen" label="Open Game" type="action" />
                    </div>
                    <div>
                        <dialog id="gameDialog">
                            <h2>Game board</h2>
                            <iframe 
                              src="http://norwaydict.com/html5games/wordgame/index.html"
                              title="Game"
                              width="550"
                              height="530"
                            ></iframe>
                            <action-button id="closeGame" label="Close" type="action" />
                        </dialog>
                    </div>
                </div>
           </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("game-form", GameForm);
  }
  