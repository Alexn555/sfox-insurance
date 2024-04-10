// @ts-nocheck
import WriterService from '../../../services/writerService';
import { CommonEvents, CustomEvents, ImageViewerIds, ImageViewerSettings } from '../../../settings';
import { toggleDisplay } from '../../../services/utils/toggleButton';
import FlickService from '../../../services/flickrService';
import GlobalsService from '../../../services/globalsService';
import DateService from '../../../services/dateService';
import { CustomEventService, StyleService } from '../../../services';
import { getRandomItemFromList } from '../../../services/utils/arrays';
import { imageList } from '../../../data/mocks/writerImageList';
import { ImageViewerHelper } from '../../../components/ui/imageViewer/imageViewerHelper';

class WriterForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.writerService = new WriterService();
      this.flickrService = new FlickService();
      this.imgMedium = '';
      this.imgViewerId = ImageViewerIds.writer;
      this.imgViewerSize = {
        w: 800,
        h: 600
      };
    }
  
    connectedCallback() {
      this.render();
      this.$image = this.shadow.getElementById('image');
      this.loadEl = this.shadow.getElementById('loading');
      this.loadEl.style.opacity = 0;
      this.shadow.getElementById('fetchOpen').addEventListener(CommonEvents.click, () => {
        toggleDisplay('fetchOpen', this.shadow, 5000);
        CustomEventService.send(CustomEvents.tabs.writer.showArticles);
        this.fetchImage();
      });

      this.$image.addEventListener(CommonEvents.click, () => {
        this.openViewer();
      });
    }

    disconnectedCallback() {
      this.$image.removeEventListener(CommonEvents.click, null);
    }

    openViewer() {
      if (this.imgMedium) {
        CustomEventService.send(CustomEvents.imageViwer.open, this.imgMedium);
      }
    }

    async fetchImage() {
      this.loadEl.style.opacity = 1; 
      
      const { imgSm, imgMedium } = await this.flickrService.getImage(this.getImageSearchTerm(), true);
      this.imgMedium = imgMedium;
      const imgEl = this.shadow.getElementById('imgSource');
      const imgViewerEl = this.shadow.getElementById(this.imgViewerId);
      StyleService.setDisplay(this.loadEl, false);

      imgEl.setAttribute('src', imgSm);
      imgViewerEl.setAttribute('source', imgMedium);

      this.handleImageError(imgEl, imgSm)
    }

    getImageSearchTerm() {
      const listCase =  ImageViewerHelper.getId( this.imgViewerId).searchListNum;
      const lastIndex = listCase === 'all' ? imageList.length - 1 : listCase;
      return getRandomItemFromList(imageList, 0, lastIndex);
    }

    handleImageError(el, image) {
      const errEl = this.shadow.getElementById('error');
      StyleService.setDisplay(errEl, false);
      if (!image) {
        this.imgMedium = ImageViewerSettings.errorCase;
        el.setAttribute('src', `${GlobalsService.getRoot()}assets/imageviewer/demo_c.jpg`);
        StyleService.setDisplay(errEl, true);
      }
    }
  
    render() {
      this.shadow.innerHTML = `
            <style>
               .writer-wrapper {
                  display: grid;
                  grid-template-columns: 50% 50%; 

                  & h3 {
                    padding-left: 8px;
                  }

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

              #error {
                display: none;
                color: red;
                font-size: smaller;
                font-weight: bold;
              }

              #loading {
                padding-left: 8px;
              }
            </style>
            <form>
                <div class="writer-wrapper">
                    <h3>Writer content</h3>
                    <div>
                        <action-button id="fetchOpen" label="Fetch content" type="action" /> 
                    </div>

                    <div>
                      <writer-articles></writer-articles>
                    </div>               

                    <div id="image">
                      <img id="imgSource" src="${GlobalsService.getRoot()}assets/wallet.svg" alt="..." />
                      <span id="loading">Loading image...</span>
                      <div id="error">Server Error, Flickr © ${DateService.getYear()} Demo image</div>
                    </div>
                </div>

                <image-viewer id="${ImageViewerIds.writer}" source=""></image-viewer>
           </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("writer-form", WriterForm);
  }
  