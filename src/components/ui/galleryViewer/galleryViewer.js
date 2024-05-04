import { CustomWindowEvents } from '../../../settings';
import { ImageViewerIds } from '../../../settings/ui';
import { GallerLoadHolders, GallerySet, GalleryImgViewerEnums } from './sets';
import { CustomEventService, IdService, StyleService } from '../../../services';
import { JSONService } from '../../../services/utils';
import EnvService from '../../../services/api/envService';
import { ArrayEnums } from '../../../enums';

class GalleryViewer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.id = this.getAttribute('id') || 'gallery-viewer';
    this.label = this.getAttribute('label') || '';
    this.images = this.getAttribute('images') || [];
    this.atrPerPage = this.getAttribute('per-page') || ArrayEnums.All;
    this.thumbsOpenable = this.getAttribute('thumbs-openable');
    this.pageCursor = this.getAttribute('page-cursor') || 'auto';
    this.imageAmount = 0;
    this.perPage = 0;
    this.currentPage = 1;
    this.$holder = [];
    this.allImages = [];
  }

  static get observedAttributes() {
    return ['images', 'label'];
  }

  connectedCallback() {
    this.render();
    this.$container = IdService.id(this.id, this.shadow);
    this.$pagination = IdService.id('gallery-pagination', this.shadow);
    this.showHolders();
    
    CustomEventService.event(CustomWindowEvents.paginatableContent.pageClick, (e) => {
      this.currentPage = e.detail.value;
      this.setPortion(this.currentPage);
    });
  }

  disconnectedCallback() {
    if (this.$holder && this.$holder.length) {
      IdService.removeList(this.$holder);
    }
  }

  setPortion(currentPage) {
    const perPage = this.getPerPage();
    const nextPortion = currentPage <= 1 ? 0 : (currentPage - 1) * perPage;
    const visPhotos = this.allImages.slice(nextPortion, nextPortion + perPage);
    this.setImages(visPhotos);
  }

  getPerPage() {
    return this.atrPerPage !== ArrayEnums.All ? parseInt(this.atrPerPage, 10) : 1;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'images' && oldValue !== newValue) {
      this.allImages = JSONService.getArray(newValue);
      this.setAmount(this.allImages.length);
      this.setPortion(this.currentPage);
    }
    if (name === 'label' && oldValue !== newValue) {
      this.$pagination?.setAttribute('label', newValue);
    }
  }

  setImages(images) {
    if (images && images.length > 0) {
      if (GallerySet.holderLoad === GallerLoadHolders.Simple) {
        let html = "";
        images.forEach((img, index) => {
          html += `<div id="holder-${index}" class="thumb"> <img src="${img.imgSm}" alt="${index}" /> </div>`;
        });
        this.$container.innerHTML = html;
      } else {
        images.forEach((img, index) => {
          const holder = IdService.id(`holder-${index}`, this.shadow);
          const image = IdService.id(`img-${index}`, this.shadow);
          StyleService.toggleClass(holder, 'thumb-loading', false);
          StyleService.toggleClass(holder, 'thumb', true);
          image.setAttribute('src', img.imgSm);
          image.setAttribute('alt', index);
        });
      }
      this.setHandlers(images);
    } else {
      if (this.$container) {
        this.$container.innerHTML = '<span class="not-found">No images found</span>';
      }
    }
  }

  setHandlers(images) {
    if (this.thumbsOpenable === GalleryImgViewerEnums.open) {
      const holderAmount = this.getPerPage();
      for (let i = 0; i < holderAmount; i++) {
        this.$holder[i] = IdService.idAndClick(`holder-${i}`, this.shadow, () => {
          CustomEventService.send(CustomWindowEvents.imageViewer.init, { 
            settingsId: ImageViewerIds.gallery,
            imgMedium: images[i].imgMedium}, 
            true);
        });
      }
    }
  }

  setAmount(length) {
    this.imageAmount = length;
    if (this.$pagination) {
      this.$pagination.setAttribute('total', this.imageAmount);
    }
  }

  showHolders() {
    if (GallerySet.holderLoad === GallerLoadHolders.Advenced) {
      const holderAmount = this.getPerPage();
      let html = '';
      const thmLoad = `${EnvService.getRoot()}assets/gallery/holder.png`;
      for (let i = 0; i < holderAmount; i++) {
        html += `<div id="holder-${i}" class="thumb-loading">
            <img id="img-${i}" src="${thmLoad}" alt="Loading..." />
          </div>`;
      }
      this.$container.innerHTML = html;
    }
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        #${this.id} {
          display: flex;
          width: 80%;
          flex-wrap: wrap;
          padding: 10px;

          & div {
            padding: 6px;
          }

          .not-found {
            font-weight: bold;
          }

          @media (max-width: 768px) {
            width: 80%;
          }
        }
        .thumb {
          cursor: ${GallerySet.thumbCursor};
        }
        .thumb-loading {
          background-color: #dcdcdc;
          width: 160px;
          height: 160px;
          margin: 10px;
          text-align: center;
        }
      </style>
      <paginatable-content 
        id="gallery-pagination"
        label="${this.label}"
        per-page="${this.atrPerPage}"
        total="${this.imageAmount}"
        cursor="${this.pageCursor}"
      >
        <div id="${this.id}"></div>
      </paginatable-content>
    `;
  }
}

if ("customElements" in window) {
  customElements.define("gallery-viewer", GalleryViewer);
}
