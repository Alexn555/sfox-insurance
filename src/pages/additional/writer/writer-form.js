// @ts-nocheck
import { CommonEvents, CustomEvents, ImageViewerIds } from '../../../settings';
import { toggleDisplay } from '../../../services/utils/toggleButton';
import { CustomEventService } from '../../../services';

class WriterForm extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.imgMedium = '';
    }
  
    connectedCallback() {
      this.render();
      this.shadow.getElementById('fetchOpen').addEventListener(CommonEvents.click, () => {
        toggleDisplay('fetchOpen', this.shadow, 5000);
        CustomEventService.send(CustomEvents.tabs.writer.showArticle);
        CustomEventService.send(CustomEvents.tabs.writer.getImage);
      });

      document.addEventListener(CustomEvents.tabs.writer.showImage, (evt) => {
        this.imgMedium = evt.detail.value;
        this.openViewer();
      });
    }

    openViewer() {
      if (this.imgMedium) {
        CustomEventService.send(CustomEvents.imageViwer.open, this.imgMedium);
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

                <image-viewer id="${ImageViewerIds.writer}" source=""></image-viewer>
           </form>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("writer-form", WriterForm);
  }
  