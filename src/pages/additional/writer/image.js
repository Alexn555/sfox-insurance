// @ts-nocheck
import { CommonEvents, CustomPageEvents } from '../../../settings';
import { ImageViewerIds, ImageViewerSettings } from '../../../components/plugins/imageViewer/sets';
import FlickService from '../../../services/api/flickrService';
import EnvService from '../../../services/api/envService';
import { DateService } from '../../../services/helpers';
import { CustomEventService, IdService, StyleService } from '../../../services';
import { ArrayService } from '../../../services/utils';
import { styleErrors } from '../../../components/common/styles/errors';
import { imageSearchList } from '../../../data/mocks/writerImageList';
import { ImageViewerHelper } from '../../../components/plugins/imageViewer/imageViewerHelper';
import { ArrayEnums } from '../../../enums';

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
      StyleService.setProperty(this.loadEl, 'opacity', '0');
      this.$image = IdService.idAndClick('image', this.shadow, () => {
        CustomEventService.send(CustomPageEvents.tabs.writer.showImage, this.imgMedium);
      });
    }

    disconnectedCallback() {
      IdService.remove(this.$image, CommonEvents.click);
    }

    async fetchImage() {
      StyleService.setProperty(this.loadEl, 'opacity', '1');

      let { imgSm, imgMedium } = await this.flickrService.getImage(this.getImageSearchTerm(), true);
      this.imgMedium = imgMedium;
      let imgEl = IdService.id('imgSource', this.shadow);
      StyleService.setDisplay(this.loadEl, false);
      imgEl.setAttribute('src', imgSm);

      this.handleImageError(imgEl, imgSm)
    }

    getImageSearchTerm() {
      let listCase = ImageViewerHelper.getId(this.imgViewerId).searchListNum;
      let lastIndex = listCase === ArrayEnums.All ? imageSearchList.length - 1 : listCase;
      return ArrayService.getRandomItemFromList(imageSearchList, 0, lastIndex);
    }

    handleImageError(el, image) {
      let errEl = IdService.id('error', this.shadow);
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
  