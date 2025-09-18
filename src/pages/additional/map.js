class MapPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
    }
  
    connectedCallback() {
      const showContent = (w = 600, h = 400, title = 'Map board') => {
        return `
          <div id="map" class="map">
            <h2>${title}</h2>
            <iframe
              id="mapOpenStreet"
              title="Map"
              width="${w}"
              height="${h}"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik">
            </iframe>
          </div>
        `;
      };

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
        <div class="map-wrapper">
          ${showContent(600, 400)}
        </div>
     `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("map-page", MapPage);
  }
