import { CustomWindowEvents } from "../../../settings";
import { ImageViewerIds } from './sets';
import { CustomEventService, IdService, HTMLService } from "../../../services";
import { JSONService } from '../../../services/utils';

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
        const sets = JSONService.getObj(e.detail.value);
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
    HTMLService.html(el, `<image-viewer-main id="${this.id}" source="${this.imgSource}"></image-viewer-main>`);
  }

  render() {
    HTMLService.html(this.shadow, `
       <div id="${this.container}"></div>
    `);
  }
}

if ("customElements" in window) {
  customElements.define("image-viewer", ImageViewerStart);
}
