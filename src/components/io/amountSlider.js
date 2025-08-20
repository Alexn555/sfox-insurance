// @ts-nocheck
import { theme } from '../../theme/theme';
import { CustomEvents } from '../../settings';
import { CustomEventService, IdService } from '../../services';

class AmountSlider extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.currency = '€';
      this.id = this.getAttribute('id') || 'amount-slider';
      this.value = this.getAttribute('value') || '';
      this.minAmount = this.getAttribute('min-amount') || '100';
      this.maxAmount = this.getAttribute('max-amount') || '3200';
      this.changeEvt = CustomEvents.interaction.sliderValueChange;
    }
  
    static get observedAttributes() { 
      return ['value']; 
    }

    connectedCallback() {
      this.render();
      let el = IdService.id(this.id, this.shadow);
      el.onchange = (() => {
        CustomEventService.send(`${this.changeEvt}-${this.id}`, el.value);
      }); 
    }

    disconnectedCallback() {
      CustomEventService.removeListener(`${this.changeEvt}-${this.id}`);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      let el = IdService.id(this.id, this.shadow);
      if (el !== null) {
        el.value = oldValue !== newValue ? newValue : oldValue;
      }
    }
  
    render() {
      this.shadow.innerHTML = `
          <style>
            main {
              display: flex;
              flex-direction: row;
              gap: 2.2em;
              padding: 1em 0;
            }
            
            /* === range theme and appearance === */
            input[type="range"] {
              font-size: 1.5rem;
              width: 12.5em;
            }
            
            input[type="range"] {
              color: ${theme.ui.slider.range};
              --thumb-height: 1.125em;
              --track-height: 0.125em;
              --track-color: rgba(0, 0, 0, 0.2);
              --brightness-hover: 180%;
              --brightness-down: 80%;
              --clip-edges: 0.125em;
            }
            
            input[type="range"].win10-thumb {
              color: ${theme.ui.slider.thumb};
            
              --thumb-height: 1em;
              --thumb-width: 1em;
              --clip-edges: 0.0125em;
            }

            /* === range commons === */
            input[type="range"] {
              position: relative;
              background: #fff0;
              overflow: hidden;
            }
            
            input[type="range"]:active {
              cursor: grabbing;
            }
            
            input[type="range"]:disabled {
              filter: grayscale(1);
              opacity: 0.3;
              cursor: not-allowed;
            }
            
            /* === WebKit specific styles === */
            input[type="range"],
            input[type="range"]::-webkit-slider-runnable-track,
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              transition: all ease 100ms;
              height: var(--thumb-height);
            }
            
            input[type="range"]::-webkit-slider-runnable-track,
            input[type="range"]::-webkit-slider-thumb {
              position: relative;
            }
            
            input[type="range"]::-webkit-slider-thumb {
              --thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
              --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
              --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
              --clip-further: calc(100% + 1px);
              --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0
                100vmax currentColor;
            
              width: var(--thumb-width, var(--thumb-height));
              background: linear-gradient(currentColor 0 0) scroll no-repeat left center /
                50% calc(var(--track-height) + 1px);
              background-color: currentColor;
              box-shadow: var(--box-fill);
              border-radius: var(--thumb-width, var(--thumb-height));
            
              filter: brightness(100%);
              clip-path: polygon(
                100% -1px,
                var(--clip-edges) -1px,
                0 var(--clip-top),
                -100vmax var(--clip-top),
                -100vmax var(--clip-bottom),
                0 var(--clip-bottom),
                var(--clip-edges) 100%,
                var(--clip-further) var(--clip-further)
              );
            }
            
            input[type="range"]:hover::-webkit-slider-thumb {
              filter: brightness(var(--brightness-hover));
              cursor: grab;
            }
            
            input[type="range"]:active::-webkit-slider-thumb {
              filter: brightness(var(--brightness-down));
              cursor: grabbing;
            }
            
            input[type="range"]::-webkit-slider-runnable-track {
              background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center /
                100% calc(var(--track-height) + 1px);
            }
            
            input[type="range"]:disabled::-webkit-slider-thumb {
              cursor: not-allowed;
            }
            
            /* === Firefox specific styles === */
            input[type="range"],
            input[type="range"]::-moz-range-track,
            input[type="range"]::-moz-range-thumb {
              appearance: none;
              transition: all ease 100ms;
              height: var(--thumb-height);
            }
            
            input[type="range"]::-moz-range-track,
            input[type="range"]::-moz-range-thumb,
            input[type="range"]::-moz-range-progress {
              background: #fff0;
            }
            
            input[type="range"]::-moz-range-thumb {
              background: currentColor;
              border: 0;
              width: var(--thumb-width, var(--thumb-height));
              border-radius: var(--thumb-width, var(--thumb-height));
              cursor: grab;
            }
            
            input[type="range"]:active::-moz-range-thumb {
              cursor: grabbing;
            }
            
            input[type="range"]::-moz-range-track {
              width: 100%;
              background: var(--track-color);
            }
            
            input[type="range"]::-moz-range-progress {
              appearance: none;
              background: currentColor;
              transition-delay: 30ms;
            }
            
            input[type="range"]::-moz-range-track,
            input[type="range"]::-moz-range-progress {
              height: calc(var(--track-height) + 1px);
              border-radius: var(--track-height);
            }
            
            input[type="range"]::-moz-range-thumb,
            input[type="range"]::-moz-range-progress {
              filter: brightness(100%);
            }
            
            input[type="range"]:hover::-moz-range-thumb,
            input[type="range"]:hover::-moz-range-progress {
              filter: brightness(var(--brightness-hover));
            }
            
            input[type="range"]:active::-moz-range-thumb,
            input[type="range"]:active::-moz-range-progress {
              filter: brightness(var(--brightness-down));
            }
            
            input[type="range"]:disabled::-moz-range-thumb {
              cursor: not-allowed;
            }

            .range-limits {
              display: flex;
              padding-left: 100px;
              align-items: space-between;
              justify-content: space-between;

              & div:nth-child(1) {
                justify-self: start;
              }
            
            }
            
          </style>
          <div>
            <main>
              <span>Loan size:</span>
              <input type="range"
                id="${this.id}"
                class="win10-thumb" 
                value=${this.value}
                min="${this.minAmount}"
                max="${this.maxAmount}"
                value="25" 
                step="5" 
              />
            </main>
            <div class="range-limits">
              <div>
                ${this.minAmount} ${this.currency}
              </div>
              <div>
                ${this.maxAmount} ${this.currency}
              </div>
            </div>
          </div>  
        `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("amount-slider", AmountSlider);
  }
  