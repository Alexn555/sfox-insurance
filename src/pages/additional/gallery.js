import { IdService } from '../../services';
import FlickService from '../../services/api/flickrService';

class GalleryPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.flickrService = new FlickService();
      this.viewer = 'galleryViewer';
      this.perPage = 10;
      this.totalAmount = 10;
    }
  
    connectedCallback() {
      this.render();
      this.activateContent();
    }

    async activateContent() {
        this.$viewer = IdService.id(this.viewer, this.shadow);
        const images = await this.flickrService.getImages('art', this.totalAmount);
        this.$viewer.setAttribute('images', JSON.stringify(images));
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            .gallery-wrapper {
              padding: 2px 0 20px 0;
              .photo {
                width: fit-content;
                padding: 0 10px 0 10px;
                border: 1px dotted grey;
              }

              & h3 {
                padding-left: 8px;
              }
            }
          </style>
          <section>
            <div class="gallery-wrapper">
                <h3>Gallery</h3>
                <gallery-viewer 
                  id="${this.viewer}" 
                  images=''
                  per-page="${this.perPage}"
                  thumbs-clickable="1"
                >
                </gallery-viewer>
            </div>
          </section>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("gallery-page", GalleryPage);
  }
