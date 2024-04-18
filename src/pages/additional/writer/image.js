// @ts-nocheck
import { CommonEvents, CustomPageEvents, ImageViewerIds, ImageViewerSettings } from '../../../settings';
import FlickService from '../../../services/api/flickrService';
import EnvService from '../../../services/api/envService';
import DateService from '../../../services/helpers/dateService';
import { CustomEventService, StyleService } from '../../../services';
import { getRandomItemFromList } from '../../../services/utils/arrays';
import { imageSearchList } from '../../../data/mocks/writerImageList';
import { ImageViewerHelper } from '../../../components/ui/imageViewer/imageViewerHelper';

class WriterImage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.flickrService = new FlickService();
      this.imgMedium = '';
      this.imgViewerId = ImageViewerIds.writer;

      document.addEventListener(CustomPageEvents.tabs.writer.getImage, () => {
        this.fetchImage();
      });
    }
  
    connectedCallback() {
      this.render();
      this.$image = this.shadow.getElementById('image');
      this.loadEl = this.shadow.getElementById('loading');
      this.loadEl.style.opacity = 0;
      this.$image.addEventListener(CommonEvents.click, () => {
        CustomEventService.send(CustomPageEvents.tabs.writer.showImage, this.imgMedium);
      });
    }

    disconnectedCallback() {
      this.$image.removeEventListener(CommonEvents.click, null);
    }

    async fetchImage() {
      this.loadEl.style.opacity = 1; 
      
      const { imgSm, imgMedium } = await this.flickrService.getImage(this.getImageSearchTerm(), true);
      this.imgMedium = imgMedium;
      const imgEl = this.shadow.getElementById('imgSource');
      StyleService.setDisplay(this.loadEl, false);
      imgEl.setAttribute('src', imgSm);

      this.handleImageError(imgEl, imgSm)
    }

    getImageSearchTerm() {
      const listCase = ImageViewerHelper.getId(this.imgViewerId).searchListNum;
      const lastIndex = listCase === 'all' ? imageSearchList.length - 1 : listCase;
      return getRandomItemFromList(imageSearchList, 0, lastIndex);
    }

    handleImageError(el, image) {
      const errEl = this.shadow.getElementById('error');
      StyleService.setDisplay(errEl, false);
      if (!image) {
        this.imgMedium = ImageViewerSettings.errorCase;
        el.setAttribute('src', `${EnvService.getRoot()}assets/imageviewer/demo_c.jpg`);
        StyleService.setDisplay(errEl, true);
      }
    }
  
    render() {
      this.shadow.innerHTML = `
            <style>
              #image {
                width: 100%;
                height: 100%;
                cursor: pointer;
                overflow: hidden;

                padding-top: 10px;
                padding-bottom: 10px;
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
            <div id="image">
                <img id="imgSource" src="${EnvService.getRoot()}assets/wallet.svg" alt="..." />
                <span id="loading">Loading image...</span>
                <div id="error">Server Error, Flickr © ${DateService.getYear()} Demo image</div>
            </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("writer-image", WriterImage);
  }
  