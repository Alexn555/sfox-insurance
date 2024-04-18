// @ts-nocheck
import { theme } from '../../../theme/theme';
import { GlobalSizes, CommonEvents, CustomWindowEvents, ImageViewerIds, ImageViewerSettings } from '../../../settings';
import { ButtonTypes, LinkTypes } from '../../common/ui';
import { StyleService } from '../../../services';
import { isMobile } from '../../../services/utils';
import DateService from '../../../services/helpers/dateService';
import EnvService from '../../../services/api/envService';
import { draggableContainer } from '../../../modifiers/dragContainer';
import { ImageViewerHelper } from './imageViewerHelper';

class ImageViewer extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.imgMedium = '';
      this.settings = ImageViewerHelper.getId(this.id);
      this.isMobile = false;
      this.imgSource = this.getAttribute('source') || '';
      this.id = this.getAttribute('id') || ImageViewerIds.writer;
      this.imgViewerVisible = false;
      this.imgViewerId = 'imageViewer';
      this.zoomStarted = false;
      this.$zoomPercent = 'zoomPercent';
      this.keys = {
        left: 'ArrowLeft',
        right: 'ArrowRight'
      };
      this.zoomFactor = this.settings.zoom.keyboard ? 1 : 1.1;
      this.imgViewerSize = {
        w: 800,
        h: 600
      };

      window.addEventListener(CommonEvents.resize, this.updateSize.bind(this));
      window.addEventListener(CustomWindowEvents.imageViwer.open, (evt) => {
        if (evt.detail) {
          this.imgMedium = evt.detail.value;
        }
        this.toggleViewer(true);
      });

      document.addEventListener(CustomWindowEvents.draggable.moveStart, () => {
        this.toggleZoom(false);
      });
      document.addEventListener(CustomWindowEvents.draggable.moveEnd, () => {
        this.toggleZoom(true);
      });
    }

    static get observedAttributes() { 
      return ['source']; 
    }
 
    connectedCallback() {
      this.render();
      this.toggleZoom(true);
      this.updateSize();

      this.$error = this.shadow.getElementById('error');
      this.$content = this.shadow.getElementById('imgDetail');
      this.toggleError(false);

      this.$original = this.shadow.getElementById('originalImage');
      this.$close = this.shadow.getElementById('close');
      this.$close.addEventListener(CommonEvents.click, () => {
        this.toggleViewer(false);
      });
      this.$original.addEventListener(CommonEvents.click, () => {
        if (this.imgMedium) {
          window.open(this.imgMedium);
        }
      });

      if (this.settings.zoomEnable) {
        if (this.settings.zoom.keyboard) {
          this.toggleZoomInfo(true);
          this.fadeZoomInfo(true, 5);
          this.setZoomInfo(this.zoomFactor);
          this.shadow.addEventListener(CommonEvents.keydown, (e) => {
            this.setZoomUpdate(e);
          });
        } else {
          this.toggleZoomInfo(false);
        }
      }

      if (!this.isMobile && this.settings.draggable) {
        draggableContainer(this.shadow.getElementById(this.imgViewerId), this.settings.zoomEnable);
      }
    }

    disconnectedCallback() {
      this.$close.removeEventListener(CommonEvents.click, null);
      this.$original.removeEventListener(CommonEvents.click, null);
      this.shadow.removeEventListener(CommonEvents.keydown, null);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'source' && oldValue !== newValue) {
        this.imgMedium = newValue;
        this.setImage();
      }
    }
    
    toggleError(isVisible = false) {
      if (this.$error) {
        StyleService.setDisplay(this.$error, isVisible);
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

    setZoomUpdate(e) {
      this.toggleZommStart(true);
      if (e.key === this.keys.left) {
        this.zoomFactor -= this.zoomFactor > this.settings.zoom.min ? 0.1 : 0;
        this.fadeZoomInfo(true, 1);
        this.setZoomInfo(this.zoomFactor, this.keys.left);
      } else if (e.key === this.keys.right) {
        this.zoomFactor += this.zoomFactor < this.settings.zoom.max  ? 0.1 : 0;
        this.fadeZoomInfo(true, 1);
        this.setZoomInfo(this.zoomFactor, this.keys.right);
      }
      this.toggleZoom(false);
      setTimeout(() => { this.toggleZoom(true); }, 2000);
    }

    setZoomInfo(zoomFactor, key = '') {
      const el = this.shadow.getElementById(this.$zoomPercent);
      const left = key === this.keys.left ? '<b>[<- key]</b>': '[<- key]';
      const right = key === this.keys.right ? '<b>[key ->]</b>' : '[key ->]'; 
      el.innerHTML = `${left} <b>${Math.floor(zoomFactor * 100)}%</b> ${right}`;
    }

    fadeZoomInfo(toggle, removeTimeout = 0) {
      this.toggleZoomInfo(toggle);
      if (removeTimeout > 0) {
        setTimeout(() => {  this.toggleZoomInfo(!toggle); }, removeTimeout * 1000);
      }
    }

    toggleZoomInfo(toggle) {
      const el = this.shadow.getElementById(this.$zoomPercent);
      StyleService.setDisplay(el, toggle);
    }

    setImage() {
      this.$content?.setAttribute('src', this.imgMedium);
    }

    checkImage() {
      const newSource = this.$content.getAttribute('src');
      this.toggleError(false);
      if (newSource === '' || this.imgMedium === ImageViewerSettings.errorCase) {
        this.$content?.setAttribute('src', 
          `${EnvService.getRoot()}assets/imageviewer/demo_m.jpg`);
        this.toggleError(true);
      }
    }

    setImgViewer(toggle) {
      this.imgViewerVisible = toggle;
    }

    toggleZoom(enable = false) {
      if (this.settings.zoomEnable) {
        const el = this.shadow.querySelector('#imageViewer img');
        if (enable) {
          el.classList.add('zoom');
          if (this.settings.zoom.keyboard) {
            el.style = this.setZoomAbility();
          }
          this.toggleZommStart(true);
        } else {
          if (this.zoomStarted) {
            el.classList.remove('zoom');
            this.toggleZommStart(false);
          }   
        }
      }
    }

    toggleZommStart(toggle) {
      this.zoomStarted = toggle;
    }

    setZoomAbility() {
      const cursor = this.zoomFactor > 1 ? 'zoom-in' : 'zoom-out';
      return this.settings.zoomEnable ? `
        transform: scale(${this.zoomFactor});
        transition: transform 0.5s ease-in-out;
        cursor: ${cursor};` : '';
    }

    setOriginalImageLink() {
      return this.settings.originalLink ? `<div class="original">
        <action-link id="originalImage" label="Original image" type="${LinkTypes.transparentButton}" />
      </div>` : '';
    }
  
    render() {
      const sharedBtnStyles = `
        padding: 10px;
        border-radius: 0;`;
        
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
                    ${sharedBtnStyles}
                  }
                }

                .original {
                  position: absolute;
                  left: 50%;
                  transform: translateX(-50%);
                  bottom: 10px;
                  padding: 2px;
                  background-color: white;
                  border-radius: 4px;
                       
                  @media (max-width: 768px) {
                    bottom: 20px;
                    ${sharedBtnStyles}
                  }
                }
              }

              #${this.$zoomPercent} {
                position: absolute;
                background-color: white;
                right: 100px;
                top: 10px;
                border: 1px solid black;
                width: 180px;
                height: 20px;
              }

              .zoom:hover {
                ${this.setZoomAbility()}
              }
            </style>
            <dialog id="${this.imgViewerId}">
                <img id="imgDetail" src="" alt="loading image" />
                <div id="${this.$zoomPercent}"></div>
                <div id="error"> 
                  Server error <br />
                  Demo Image <br />
                  © ${DateService.getYear()} Flickr.com images
                </div>

                <div class="close">
                  <action-button id="close" label="Close" type="${ButtonTypes.action}" />
                </div> 
                ${this.setOriginalImageLink()}
            </dialog>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("image-viewer", ImageViewer);
  }
  