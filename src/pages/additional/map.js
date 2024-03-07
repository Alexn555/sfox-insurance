// @ts-nocheck
class MapForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.isMapOpen = false;
    }
  
    connectedCallback() {
      this.render();

      this.shadow.querySelector('#mapOpen').addEventListener('click', () => {
          this.toggleGame(true);
      });
      this.shadow.querySelector('#closeMap').addEventListener('click', () => {
        this.toggleGame(false);
      });
    }

    toggleGame(isOpen) {
      const el = this.shadow.querySelector('#mapDialog');
      if (!this.isMapOpen) {
        el.showModal();
      } else {
        el.close();
      }
      this.setMapOpen(isOpen)
    }

    setMapOpen(toggle) {
      this.isMapOpen = toggle;
    }
  
    render() {
      this.shadow.innerHTML = `
            <style>
               .map-wrapper {
                  display: grid;
                  grid-template-columns: 50% 50%; 

                  & div {
                    padding: 20px;
                  }

                  @media (max-width: 768px) {
                    grid-template-columns: 100%;
                  }

                  & dialog#mapDialog {
                    width: 600px !important;
                    border: 1px dotted black;
                    transition:
                    opacity 0.7s ease-out,
                    transform 0.7s ease-out,
                    overlay 0.7s ease-out allow-discrete,
                    display 0.7s ease-out allow-discrete;
                  }
              }
            </style>
            <form>
                <div class="map-wrapper">
                    <div>
                      <action-button id="mapOpen" label="Open Map" type="action" />
                    </div>
                    <div>
                        <dialog id="mapDialog">
                            <h2>Map board</h2>
                            <iframe
                                id="mapOpenStreet"
                                title="Map"
                                width="600"
                                height="400"
                                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik">
                            </iframe>
                            <action-button id="closeMap" label="Close" type="action" />
                        </dialog>
                    </div>
                </div>
           </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("map-form", MapForm);
  }
  