import { ThemeHelper } from '../../../theme/theme';
import { PackIds } from '../../../theme/enums';
import { GallerySet } from '../../../components/plugins/galleryViewer/sets';
import { IdService } from '../../../services';
import TheMovieDBService from '../../../services/api/theMoviedbService';
import { JSONService } from '../../../services/utils';

class GalleryPosterPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.themoviedbService = new TheMovieDBService();
      this.viewer = 'galleryViewer';
      this.perPage = GallerySet.perPage;
      this.totalAmount = GallerySet.total;
      this.theme = ThemeHelper.get([PackIds.galleryPage]);
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {    
      this.$viewer = IdService.id(this.viewer, this.shadow);
      this.activateContent();
    }

    async activateContent() {
      let images = await this.themoviedbService.getGalleryPosters();
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
            <h3>Gallery Posters</h3>

            <gallery-viewer 
              id="${this.viewer}" 
              label=""
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
    customElements.define("gallery-posters-page", GalleryPosterPage);
  }
