// @ts-nocheck
import { ButtonTypes } from '../../components/common/ui';

class MapForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
    }
  
    connectedCallback() {
      this.render();
    }

    showContent() {
      return `
        <div id="map" class="map">
          <h2>Map board</h2>
          <iframe
              id="mapOpenStreet"
              title="Map"
              width="600"
              height="400"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik">
          </iframe>
        </div>
      `;
    }
  
    render() {
      this.shadow.innerHTML = `
            <style>
               .map-wrapper {
                  padding: 20px 0 20px 0;
                  .map {
                    width: fit-content;
                    padding: 0 10px 0 10px;
                    border: 1px dotted grey;
                  }
              }
            </style>
            <form>
                <div class="map-wrapper">
                  ${this.showContent()}
                </div>
           </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("map-form", MapForm);
  }
  