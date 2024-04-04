// @ts-nocheck
import { theme } from '../../theme/theme';
import { GlobalSizes, CommonEvents, CustomEvents, ImageViewerSettings } from '../../settings';
import { isMobile } from '../../components/common/utils';
import DateService from '../../services/dateService';
import GlobalsService from '../../services/globalsService';
import { draggableContainer } from '../../modifiers/dragContainer';

class ImageViewer extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.imgMedium = '';
      window.addEventListener(CommonEvents.resize, this.updateSize.bind(this));
      window.addEventListener(CustomEvents.imageViwer.open, (evt) => {
        if (evt.detail) { // just to double check
            this.imgMedium = evt.detail.value;
        }
        this.toggleViewer(true);
      });

      this.isMobile = false;
      this.imgSource = this.getAttribute('source') || '';
      this.imgViewerVisible = false;
      this.imgViewerId = 'imageViewer';
      this.imgViewerSize = {
        w: 800,
        h: 600
      };
    }

    static get observedAttributes() { 
        return ['source']; 
    }
 
    connectedCallback() {
      this.render();
      this.updateSize();

      this.$error = this.shadow.getElementById('error');
      this.$content = this.shadow.getElementById('imgDetail');
      this.toggleError(false);
      this.$close = this.shadow.getElementById('close');
      this.$close.addEventListener(CommonEvents.click, () => {
        this.toggleViewer(false);
      });

      if (!this.isMobile && ImageViewerSettings.draggable) {
        draggableContainer(this.shadow.getElementById(this.imgViewerId));
      }
    }

    disconnectedCallback() {
      this.$close.removeEventListener(CommonEvents.click, null);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'source' && oldValue !== newValue) {
        this.imgMedium = newValue;
        this.setImage();
      }
    }

    toggleError(isVisible = false) {
      if (this.$error) {
        this.$error.style.display = isVisible ? 'block': 'none';
      }
    }

    updateSize() {
      this.isMobile = isMobile();
      this.screenW = window.innerWidth;
      this.screenH = window.innerHeight;
      let factors = this.isMobile ? { w: 1.1, h: 1.1 } : { w: 1.1, h: 1.2 };
      if (window.innerWidth > GlobalSizes.largeScreen) {
        factors = { w: 1.5, h: 1.2 };
      }

      const el = this.shadow.getElementById(this.imgViewerId);
      this.imgViewerSize = {
        w: Math.ceil(this.screenW / factors.w),
        h: Math.ceil(this.screenH / factors.h)
      };
      el.style.width = `${this.imgViewerSize.w}px`;
      el.style.height = `${this.imgViewerSize.h}px`;
    }

    toggleViewer(isOpen) {
      const el = this.shadow.getElementById(this.imgViewerId);
      if (el && this.imgMedium) {
        if (!this.imgViewerVisible) {
          this.setImage();
          this.checkImage();
          el.showModal();
        } else {
          el.close();
        }
        this.setImgViewer(isOpen);
      }
    }

    setImage() {
      this.$content?.setAttribute('src', this.imgMedium);
    }

    checkImage() {
      const newSource = this.$content.getAttribute('src');
      this.toggleError(false);
      if (newSource === '' || this.imgMedium === '') {
        this.$content?.setAttribute('src', 
          `${GlobalsService.getRoot()}assets/imageviewer/demo_m.jpg`);
        this.toggleError(true);
      }
    }

    setImgViewer(toggle) {
      this.imgViewerVisible = toggle;
    }

    setZoomAbility() {
      return ImageViewerSettings.zoomEnable ? `
        transform: scale(1.1);
        transition: transform 0.5s ease-in-out;
        cursor: zoom-in;` : '';
    }
  
    render() {
      this.shadow.innerHTML = `
            <style>
              dialog#imageViewer {
                position: absolute;
                width: ${this.imgViewerSize.w};
                height: ${this.imgViewerSize.h};
                padding: 20px;
                border: 1px dotted black;
                transition:
                opacity 0.7s ease-out,
                transform 0.7s ease-out,
                overlay 0.7s ease-out allow-discrete,
                display 0.7s ease-out allow-discrete;
                text-align: center;
                overflow-y: hidden;

                & img {
                  object-fit: contain;
                  max-width: 100%;
                  max-height: 100%;
                  width: auto;
                  height: auto;
                  border: 1px solid grey;

                  &:hover {
                    ${this.setZoomAbility()}
                  }
                }

                #error {
                  position: absolute;
                  left: 20%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  padding: 20px;
                  width: 200px;
                  height: 80px;
                  text-align: center;
                  background-color: ${theme.imageViewer.error.bck};
                  font-size: smaller;
                  font-weight: bold;
                  border: 1px solid ${theme.imageViewer.error.border};
                  color: ${theme.imageViewer.error.text};
                }

                .close {
                  position: absolute;
                  right: 10px;
                  top: 10px;
                  padding: 2px;
                  background-color: white;
                  border-radius: 4px;

                  @media (max-width: 768px) {
                    right: 30px;
                    top: 12px;
                    padding: 10px;
                    border-radius: 0;
                  }
                }
              }
            </style>
            <dialog id="${this.imgViewerId}">
                <img id="imgDetail" src="" alt="loading image" />
                <div id="error"> 
                  Server error <br />
                  Demo Image <br />
                  © ${DateService.getYear()} Flickr.com images
                </div>

                <div class="close">
                    <action-button id="close" label="Close" type="action" />
                </div>
            </dialog>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("image-viewer", ImageViewer);
  }
  