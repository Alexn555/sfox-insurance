import { CustomEventService, IdService, HTMLService } from '../../../services';
import { JSONService } from '../../../services/utils';
import { CustomWindowEvents } from '../../../settings';
import { ImageViewerIds } from './sets';
import { ImgViewArrowDirections } from './enums';
import { ImageViewerEvents } from './events';

class ImageViewerStart extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.id = this.getAttribute('id') || ImageViewerIds.writer;
    this.imgSource = this.getAttribute('source') || '';
    this.currentViewerId = this.id;
    this.container = 'imageViewer';
    this.sets = null;

    CustomEventService.event(ImageViewerEvents.previousImage, () => {
      this.sets.imgMedium = this.setArrow(ImgViewArrowDirections.prev);
      let setId = this.sets['settingsId'];
      CustomEventService.send(`${CustomWindowEvents.imageViewer.change}-${setId}`, this.sets, true);
    });

    CustomEventService.event(ImageViewerEvents.nextImage, () => {
      this.sets.imgMedium = this.setArrow(ImgViewArrowDirections.next);
      let setId = this.sets['settingsId'];
      CustomEventService.send(`${CustomWindowEvents.imageViewer.change}-${setId}`, this.sets, true);
    });

    CustomEventService.event(CustomWindowEvents.imageViewer.init, (e) => {
      if (e.detail) {
        this.sets = JSONService.getObj(e.detail.value);
        let setId = this.sets['settingsId'];
        if (this.currentViewerId !== setId) {
          this.currentViewerId = setId;
          let el = IdService.id(this.id, this.shadow);
          el.remove();
          this.id = setId;
          this.setImageViewer();
        }
        CustomEventService.send(`${CustomWindowEvents.imageViewer.open}-${setId}`, this.sets, true);
      } 
    });
  }

  connectedCallback() {
    this.render();
    this.setImageViewer();
  }

  setArrow(direction) {
    let curImage = this.sets.imgMedium;
    let currentIndex = this.sets.images.findIndex(image => image.imgMedium === curImage);
    let nextImage = curImage;
    if (direction === ImgViewArrowDirections.prev) {
      let nextIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
      nextImage = this.sets.images[nextIndex];
    } else {
      let nextIndex = currentIndex < this.sets.images.length - 1 ? currentIndex + 1 : currentIndex;
      nextImage = this.sets.images[nextIndex];
    }
    return nextImage.imgMedium ? nextImage.imgMedium : curImage;
  }

  setImageViewer() {
    let el = IdService.id(this.container, this.shadow);
    HTMLService.html(el, `<image-viewer-main id="${this.id}" source="${this.imgSource}"></image-viewer-main>`);
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
