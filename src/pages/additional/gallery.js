import { CustomEvents, GallerySet } from '../../settings';
import { CustomEventService, IdService } from '../../services';
import FlickService from '../../services/api/flickrService';
import DataStorage from '../../services/storage';

class GalleryPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.flickrService = new FlickService();
      this.viewer = 'galleryViewer';
      this.searchInput = 'searchword';
      this.searchWord = GallerySet.defaultSearch;
      this.perPage = GallerySet.perPage;
      this.totalAmount = GallerySet.total;
      this.storage = new DataStorage();
    }
  
    connectedCallback() {
      this.getSavedSearch();
      this.render();
      this.initForm();
      this.activateContent();
    }

    initForm() {
      this.$searchInput = IdService.id(this.searchInput, this.shadow);
      CustomEventService.event(`${CustomEvents.interaction.textInputChange}-${this.searchInput}`, (e) => {
        const input = e.detail?.value || '';
        if (input !== '' && input.length >= GallerySet.minimumSearch) {
          this.searchWord = input;
          this.$searchInput.setAttribute('value', this.searchWord);
          this.updateLabel(this.searchWord);
          this.activateContent();
          this.saveSearch(this.searchWord);
        }
      }); 
    }

    getSavedSearch() {
      const saved = this.storage.getItem(GallerySet.saveId);
      if (saved) {
        this.searchWord = saved;
      }
    }

    saveSearch(searchVal) {
      this.storage.save(GallerySet.saveId, searchVal);
    }

    async activateContent() {
      this.$viewer = IdService.id(this.viewer, this.shadow);
      const images = await this.flickrService.getImages(this.searchWord, this.totalAmount);
      this.$viewer.setAttribute('images', JSON.stringify(images));
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
              border: 1px dashed #f2f2f2;

              .photo {
                width: fit-content;
                padding: 0 10px 0 10px;
                border: 1px dotted grey;
              }

              & h3 {
                padding-left: 8px;
              }
            }

            #searchbox {
              padding: 8px;
              font-size: smaller;
            }
          </style>
          <div class="gallery-wrapper">
            <h3>Gallery</h3>
            <div id="searchbox">
              <text-input
                id="${this.searchInput}" 
                label="Search"
                class-name="input-normal"
                value="${this.searchWord}"
                type="text"           
              >
              </text-input>
            </div>

            <gallery-viewer 
              id="${this.viewer}" 
              label="${GallerySet.showLabel ? this.searchWord : ''}"
              images=''
              per-page="${this.perPage}"
              thumbs-clickable="1"
            >
            </gallery-viewer>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("gallery-page", GalleryPage);
  }
