// @ts-nocheck
import WriterService from '../../services/writerService';
import { CustomEvents } from '../../components/common/settings';
import { toggleDisplay } from '../../components/common/utils/toggleButton';
import FlickService from '../../services/flickrService';
import { CustomEventService } from '../../services/';

class WriterForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isGameOpen = false;
      this.writerService = new WriterService();
      this.flickrService = new FlickService();
      this.imgMedium = '';
      this.imgViewerId = 'imageViewer';
      this.imgViewerSize = {
        w: 800,
        h: 600
      };
    }
  
    connectedCallback() {
      this.render();
      this.loadEl = this.shadow.getElementById('loading');
      this.loadEl.style.opacity = 0;
      this.shadow.getElementById('fetchOpen').addEventListener('click', () => {
        this.featchContent();
        this.fetchImage();
      });

      this.shadow.getElementById('image').addEventListener('click', () => {
        this.openViewer();
      });
    }

    disconnectedCallback() {
      this.shadow.getElementById('image').removeEventListener('click', null);
    }

    openViewer() {
      if (this.imgMedium) {
        CustomEventService.send(CustomEvents.imageViwer.open, this.imgMedium);
      }
    }

    async featchContent() {
      const content = await this.writerService.getContent();
      const el = this.shadow.querySelector('.writeContent');
      toggleDisplay('fetchOpen', this.shadow, 5000);

      if (content && content?.title) {
        el.innerHTML = content.title;
      }
    }

    async fetchImage() {
      this.loadEl.style.opacity = 1;
      const { imgSm, imgMedium } = await this.flickrService.getImage('formula1 lego', true);
      this.imgMedium = imgMedium;
      const imgEl = this.shadow.getElementById('imgSource');
      const imgViewerEl = this.shadow.getElementById('imgViewer');
      this.loadEl.style.display = 'none';
      imgEl.setAttribute('src', imgSm);
      imgViewerEl.setAttribute('source', imgMedium);
    }
  
    render() {
      this.shadow.innerHTML = `
            <style>
               .writer-wrapper {
                  display: grid;
                  grid-template-columns: 50% 50%; 

                  & div {
                    padding: 20px;
                  }

                  @media (max-width: 768px) {
                    grid-template-columns: 100%;
                  }
              }

              #image {
                width: 300px;
                height: 200px;
                border: 1px dashed black;
                cursor: pointer;
                overflow: hidden;
              }

              #loading {
                padding-left: 8px;
              }
            </style>
            <form>
                <div class="writer-wrapper">
                    <h2>Writer content</h2>
                    <div>
                        <action-button id="fetchOpen" label="Fetch content" type="action" /> 
                    </div>
                    <div class="writeContent"> </div>
                    <div id="image">
                      <img id="imgSource" src="${process.env.PUBLIC_URL}assets/wallet.svg" alt="..." />
                      <span id="loading">Loading image...</span>
                    </div>
                </div>

                <image-viewer id="imgViewer" source=""></image-viewer>
           </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("writer-form", WriterForm);
  }
  