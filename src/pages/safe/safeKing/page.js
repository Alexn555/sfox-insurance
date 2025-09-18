import { IdService } from '../../../services';

class SafeKingPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.viewer = 'safe-game-page';
    }
  
    connectedCallback() {
       this.shadow.innerHTML = `
          <style>
            .safe-wrapper {
              padding: 2px 0 20px 0;
              border: 1px dashed #dcdcdc;

              & h3 {
                padding-left: 8px;
              }
            }
          </style>
          <div class="safe-wrapper">
            <h3>Safe Game</h3>
            <safe-game></safe-game>
          </div>
       `;
       this.$viewer = IdService.id(this.viewer, this.shadow);
    }
  }
  
  if ("customElements" in window) {
    customElements.define("safe-king-page", SafeKingPage);
  }
