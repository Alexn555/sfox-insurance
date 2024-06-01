// @ts-nocheck
import { CustomWindowEvents, CustomPageEvents } from '../../../settings';
import ScreenQuery from '../../../styles/query';
import { ImageViewerIds } from '../../../settings/ui';
import { CustomEventService, IdService, LoggerService } from '../../../services';
import { RenderService } from '../../../services/helpers';

class WriterForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.imgMedium = '';
    }
  
    connectedCallback() {
      this.render();
      this.activateContent();

      this.$fetchOpen = IdService.idAndClick('fetchOpen', this.shadow, this.activateContent.bind(this));

      CustomEventService.event(CustomPageEvents.tabs.writer.showImage, (e) => {
        if (!e.detail.value || typeof e.detail.value !== 'string') {
          LoggerService.error('Writer show image not defined!');
          e.detail.value = '';
        }
        this.imgMedium = e.detail.value;
        this.openViewer();
      });
    }

    disconnectedCallback() {
      IdService.remove(this.$fetchOpen);
    }

    activateContent() {
      RenderService.toggleDisplay('fetchOpen', this.shadow, 5000);
      CustomEventService.send(CustomPageEvents.tabs.writer.showArticle);
      CustomEventService.send(CustomPageEvents.tabs.writer.getImage);
    }

    openViewer() {
      if (this.imgMedium) {
        CustomEventService.send(CustomWindowEvents.imageViewer.init, { 
          settingsId: ImageViewerIds.writer,
          imgMedium: this.imgMedium}, 
          true);
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

                ${ScreenQuery.mobile('grid-template-columns: 100%;')}
              }

              .image {
                padding: 10px;
                text-align: center;
                border: 1px dashed grey;    
              }
            </style>
            <form>
              <div class="writer-wrapper">
                <h3>Writer content</h3>
                <div>
                    <action-button id="fetchOpen" label="Fetch content" type="action" /> 
                </div>
                <div>
                  <writer-article></writer-article>
                </div>               
                <div class="image">  
                  <writer-image></writer-image>
                </div>
              </div> 
           </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("writer-form", WriterForm);
  }
  