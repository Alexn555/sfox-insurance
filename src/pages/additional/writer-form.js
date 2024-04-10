// @ts-nocheck
import WriterService from '../../services/writerService';
import { CommonEvents, CustomEvents, ImageViewerIds, ImageViewerSettings, Writer } from '../../settings';
import { toggleDisplay } from '../../services/utils/toggleButton';
import { simulateDelay } from '../../services/utils';
import FlickService from '../../services/flickrService';
import { ContentService } from '../../services/contentService';
import GlobalsService from '../../services/globalsService';
import DateService from '../../services/dateService';
import { CustomEventService, StyleService } from '../../services/';
import { getRandomItemFromList } from '../../services/utils/arrays';
import { imageList } from '../../data/mocks/writerImageList';
import { ImageViewerHelper } from '../../components/ui/imageViewer/imageViewerHelper';

class WriterForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.isGameOpen = false;
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
        this.fetchContent(Writer.fetchOnce);
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

    fetchContent(loadOnce) {
      if (loadOnce) {
        this.featchContentAtOnce();
      } else {
        const { amount, eachTime } = Writer.queue;
        this.featchContentQueue(amount, eachTime);
      }
    }

    async featchContentAtOnce() {
      let content = ['', ''];
      content[0] = await this.writerService.getContent();
      content[1] = await this.writerService.getContent();
      const el = this.shadow.querySelector('.writeContent');
      this.removeContent();

      let html;
      if (content && content[0]?.body) {
        html += ContentService.createArticle(el, content[0].body);
        html += ContentService.createArticle(el, content[1].body);
        el.appendChild(html);
      }
    }

    async featchContent() {
      const content = await this.writerService.getContent();
      const el = this.shadow.querySelector('.writeContent');

      if (content && content?.body) {
        const html = ContentService.createArticle(el, content.body);
        el.appendChild(html);
      }
    }

    async featchContentQueue(amount = 4, timeout = 1000) { 
      this.removeContent();
      for (let i = 0; i < amount; i++) {
        this.featchContent(i);
        await simulateDelay(timeout);
      }
    }

    removeContent() {
      toggleDisplay('fetchOpen', this.shadow, 5000);
      const el = this.shadow.querySelector('.writeContent');
      ContentService.removeArticles(el);
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

              .writeContent {
                &:first-letter {
                  text-transform: uppercase;
                }

                & p:first-letter {
                  text-transform: uppercase;
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
                    <div class="writeContent"> </div>
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
  