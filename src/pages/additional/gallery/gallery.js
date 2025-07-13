import { ThemeHelper } from '../../../theme/theme';
import { PackIds } from '../../../theme/enums';
import { GallerySet } from '../../../components/plugins/galleryViewer/sets';
import { CustomEventService, IdService } from '../../../services';
import FlickService from '../../../services/api/flickrService';
import { JSONService } from '../../../services/utils';

class GalleryPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.flickrService = new FlickService();
      this.viewer = 'galleryViewer';
      this.searchWord = GallerySet.defaultSearch;
      this.perPage = GallerySet.perPage;
      this.totalAmount = GallerySet.total;
      this.theme = ThemeHelper.get([PackIds.galleryPage]);

      if (GallerySet.searchEnabled) {
        CustomEventService.event(GallerySet.searchSavedInit, (e) => {
          this.searchWord = e.detail.value;
          setTimeout(() => {
            this.updateLabel(this.searchWord);
            this.activateContent(this.searchWord);
          }, 500);
        }, document);
      }
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {    
      this.$viewer = IdService.id(this.viewer, this.shadow);
      if (GallerySet.searchEnabled) {
        CustomEventService.event(GallerySet.searchEvent, (e) => {
          let input = e.detail?.value || '';
          if (input !== '' && input.length >= GallerySet.minimumSearch) {
            this.searchWord = input;
            this.updateLabel(this.searchWord);
            this.activateContent(this.searchWord);
          }
        }, document);
      } else {
        this.activateContent(this.searchWord);
      }
    }

    async activateContent(searchword) {
      let images = await this.flickrService.getImages(searchword, this.totalAmount);
      this.$viewer.setAttribute('images', JSONService.set(images));
    }

    updateLabel(searchword) {
      if (GallerySet.showLabel) {
        this.$viewer.setAttribute('label', searchword);
      }
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            .gallery-wrapper {
              padding: 2px 0 20px 0;
              border: 1px dashed ${this.theme.background};

              .photo {
                width: fit-content;
                padding: 0 10px 0 10px;
                border: 1px dotted ${this.theme.border};
              }

              & h3 {
                padding-left: 8px;
              }
            }
          </style>
          <div class="gallery-wrapper">
            <h3>Gallery</h3>
            ${GallerySet.searchEnabled ? '<gallery-search></gallery-search>' : ''}

            <gallery-viewer 
              id="${this.viewer}" 
              label="${GallerySet.showLabel ? this.searchWord : ''}"
              images=''
              per-page="${this.perPage}"
              thumbs-openable="${GallerySet.thumbsOpenable}"
              page-cursor="${GallerySet.pageCursor}"
            >
            </gallery-viewer>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("gallery-page", GalleryPage);
  }
