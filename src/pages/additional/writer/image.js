// @ts-nocheck
import { CommonEvents, CustomPageEvents, ImageViewerIds, ImageViewerSettings } from '../../../settings';
import FlickService from '../../../services/api/flickrService';
import EnvService from '../../../services/api/envService';
import DateService from '../../../services/helpers/dateService';
import { CustomEventService, IdService, StyleService } from '../../../services';
import { getRandomItemFromList } from '../../../services/utils/arrays';
import { styleErrors } from '../../../components/common/styles/errors';
import { imageSearchList } from '../../../data/mocks/writerImageList';
import { ImageViewerHelper } from '../../../components/ui/imageViewer/imageViewerHelper';

class WriterImage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.flickrService = new FlickService();
      this.imgMedium = '';
      this.imgViewerId = ImageViewerIds.writer;

      CustomEventService.event(CustomPageEvents.tabs.writer.getImage, this.fetchImage.bind(this));
    }
  
    connectedCallback() {
      this.render();
      this.loadEl = IdService.id('loading', this.shadow);
      this.loadEl.style.opacity = 0;
      this.$image = IdService.idAndClick('image', this.shadow, () => {
        CustomEventService.send(CustomPageEvents.tabs.writer.showImage, this.imgMedium);
      });
    }

    disconnectedCallback() {
      IdService.remove(this.$image, CommonEvents.click);
    }

    async fetchImage() {
      this.loadEl.style.opacity = 1; 
      
      const { imgSm, imgMedium } = await this.flickrService.getImage(this.getImageSearchTerm(), true);
      this.imgMedium = imgMedium;
      const imgEl = IdService.id('imgSource', this.shadow);
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
      const errEl = IdService.id('error', this.shadow);
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
                font-size: smaller;
                ${styleErrors.commonText}
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
  