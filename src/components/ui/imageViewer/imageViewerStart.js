import { CustomWindowEvents, ImageViewerIds } from "../../../settings";
import { CustomEventService, IdService } from "../../../services";

class ImageViewerStart extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.id = this.getAttribute('id') || ImageViewerIds.writer;
    this.imgSource = this.getAttribute('source') || '';
    this.currentViewerId = this.id;
    this.container = 'imageViewer';

    CustomEventService.event(CustomWindowEvents.imageViewer.init, (e) => {
        if (e.detail) {
          const sets = JSON.parse(e.detail.value);
          if (this.currentViewerId !== sets['settingsId']) {
            this.currentViewerId = sets['settingsId'];
            const el = IdService.id(this.id, this.shadow);
            el.remove();
            this.id = sets['settingsId'];
            this.setImageViewer();
          }     
          CustomEventService.send(CustomWindowEvents.imageViewer.open, sets, true);
        }
    });
  }

  connectedCallback() {
    this.render();
    this.setImageViewer();
  }

  setImageViewer() {
    const el = IdService.id(this.container, this.shadow);
    el.innerHTML = `<image-viewer-main id="${this.id}" source="${this.imgSource}"></image-viewer-main>`;
  }

  render() {
    this.shadow.innerHTML = `
       <div id="${this.container}"></div>
    `;
  }
}

if ("customElements" in window) {
  customElements.define("image-viewer", ImageViewerStart);
}
