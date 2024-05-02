import { CustomWindowEvents } from "../../../settings";
import { ImageViewerIds } from './sets';
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
        const setId = sets['settingsId'];
        if (this.currentViewerId !== setId) {
          this.currentViewerId = setId;
          const el = IdService.id(this.id, this.shadow);
          el.remove();
          this.id = setId;
          this.setImageViewer();
        }
        CustomEventService.send(`${CustomWindowEvents.imageViewer.open}-${setId}`, sets, true);
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
