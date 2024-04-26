import { CustomWindowEvents } from '../../../settings';
import { CustomEventService, IdService } from '../../../services';
import { ArrayEnums } from '../../../enums';

class GalleryViewer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.id = this.getAttribute('id') || 'gallery-viewer';
    this.label = this.getAttribute('label') || '';
    this.images = this.getAttribute('images') || [];
    this.perPage = this.getAttribute('per-page') || ArrayEnums.All;
    this.thumbsClickable = this.getAttribute('thumbs-clickable') || '0';
    this.pageCursor = this.getAttribute('page-cursor') || 'auto';
    this.imageAmount = 0;
    this.currentPage = 1;
    this.allImages = [];
  }

  static get observedAttributes() {
    return ['images', 'label'];
  }

  connectedCallback() {
    this.render();
    this.$container = IdService.id(this.id, this.shadow);
    this.$pagination = IdService.id('gallery-pagination', this.shadow);
    
    CustomEventService.event(CustomWindowEvents.paginatableContent.pageClick, (e) => {
      this.currentPage = e.detail.value;
      this.setPortion(this.currentPage);
    });
  }

  setPortion(currentPage) {
    const perPage = this.perPage !== ArrayEnums.All ? parseInt(this.perPage, 10) : 1;
    const nextPortion = currentPage <= 1 ? 0 : (currentPage - 1) * perPage;
    const visPhotos = this.allImages.slice(nextPortion, nextPortion + perPage);
    this.setImages(visPhotos);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'images' && oldValue !== newValue) {
      this.allImages = this.parseImage(newValue);
      this.setAmount(this.allImages.length);
      this.setPortion(this.currentPage);
    }
    if (name === 'label' && oldValue !== newValue) {
      this.$pagination?.setAttribute('label', newValue);
    }
  }

  parseImage(images) {
    if (images) {
      return JSON.parse(images);
    }
    return [];
  }

  setImages(images) {
    if (images && images.length > 0) {
      let html = "";
      images.forEach((img, index) => {
        html += `<div> <img src=${img.imgSm} alt="${index}" /> </div>`;
      });
      this.$container.innerHTML = html;
    } else {
      if (this.$container) {
        this.$container.innerHTML = '<span class="not-found">No images found</span>';
      }
    }
  }

  setAmount(length) {
    this.imageAmount = length;
    if (this.$pagination) {
      this.$pagination.setAttribute('total', this.imageAmount);
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
        </style>
        <paginatable-content 
          id="gallery-pagination"
          label="${this.label}"
          per-page="${this.perPage}"
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
