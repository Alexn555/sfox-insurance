// @ts-nocheck
import { ThemeHelper } from '../../../theme/theme';
import ScreenQuery from '../../../styles/query';
import { GlobalSizes, CommonEvents, CustomWindowEvents } from '../../../settings';
import { KeyboardKeys, GeneralNoteCodes, GeneralNoteEnums, BoolEnums } from '../../../enums';
import { ButtonTypes, LinkTypes } from '../../common/ui';
import { CustomEventService, HTMLService, IdService, LoggerService, StyleService } from '../../../services';
import { JSONService } from '../../../services/utils';
import { RenderService } from '../../../services/helpers';
import { PackIds } from '../../../theme/enums';
import { DateService } from '../../../services/helpers';
import { ImageViewerIds, ImageViewerSettings } from './sets';
import EnvService from '../../../services/api/envService';
import { draggableContainer } from '../../../modifiers/dragContainer';
import { ImageViewerHelper } from './imageViewerHelper';

class ImageViewer extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.id = this.getAttribute('id') || ImageViewerIds.writer;
      this.imgSource = this.getAttribute('source') || '';
      this.imgMedium = '';
      this.settings = ImageViewerHelper.getId(this.id);
      this.isMobile = false;
      this.theme = ThemeHelper.get(PackIds.imageViewer);
      this.imgViewerVisible = false;
      this.imgViewerId = 'imageViewer';
      this.zoomStarted = false;
      this.$zoomPercent = 'zoomPercent';
      this.genericStatusMsg = `[Warning] ImageViewer failed to open (lost focus error).
      Press [Close] to reload browser. Don't worry, all data (expect this page) saved even after reload page.`;
      this.keys = {
        left: KeyboardKeys.arrowLeft,
        right: KeyboardKeys.arrowRight
      };
      this.originalOpacity = 0.3;
      this.originalLinkToggle = false;
      this.zoomFactor = this.settings.zoom.keyboard ? 1 : 1.1;
      this.imgViewerSize = {
        w: 800,
        h: 600
      };

      CustomEventService.event(CommonEvents.resize, this.updateSize.bind(this), window);
      
      CustomEventService.event(CommonEvents.keydown, (e) => {
        if (this.imgViewerVisible) {
          if (e.key === KeyboardKeys.escape) {
            this.toggleViewer(false);
          }
          if (e.key === KeyboardKeys.o) {
            this.toggleOriginalLink();
          }
        }
      });
      CustomEventService.event(CustomWindowEvents.draggable.moveStart, () => {
        this.toggleZoom(false);
      });
      CustomEventService.event(CustomWindowEvents.draggable.moveEnd, () => {
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

      this.$error = IdService.id('error', this.shadow);
      this.$content = IdService.id('imgDetail', this.shadow);
      this.$imageViewer = IdService.id(this.imgViewerId, this.shadow);

      this.toggleError(false);

      CustomEventService.eventData(`${CustomWindowEvents.imageViewer.open}-${this.id}`, (res) => {
        this.imgMedium = res['imgMedium'];
        this.toggleViewer(true); 
        this.toggleArrowVisible(true);
      }, document, true);

      CustomEventService.eventData(`${CustomWindowEvents.imageViewer.change}-${this.id}`, (res) => {
        this.imgMedium = res['imgMedium'];
        this.setImage();
      }, document, true);

      this.$close = IdService.idAndClick('close', this.shadow, () => {
        this.toggleViewer(false);
        this.toggleArrowVisible(false);
      });

      this.$original = IdService.idAndClick('originalImage', this.shadow, () => {
        if (this.imgMedium) {
          window.open(this.imgMedium);
        }
      });
      this.updateSettings();
    }

    toggleArrowVisible(toggle) {
      let el = IdService.id('arrows', this.shadow);
      if (el) {
        let isVis = toggle ? BoolEnums.bTrue : BoolEnums.bFalse;
        el.setAttribute('visible', isVis);
      }
    }

    updateSettings() {
      if (this.settings.zoomEnable) {
        if (this.settings.zoom.keyboard) {
          this.toggleZoomInfo(true);
          this.fadeZoomInfo(true, 5);
          this.setZoomInfo(this.zoomFactor);
          CustomEventService.event(CommonEvents.keydown, (e) => {
            e.preventDefault();
            this.setZoomUpdate(e);
          }, this.shadow);
        } else {
          this.toggleZoomInfo(false);
        }
      }

      if (!this.isMobile && this.settings.draggable) {
        draggableContainer(IdService.id(this.imgViewerId, this.shadow), this.settings.zoomEnable);
      }
    }

    disconnectedCallback() {
      IdService.removeList([this.$close, this.$original]);
      CustomEventService.removeListener(CommonEvents.keydown);
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
      const { mobile, screenW, screenH, factors } = ImageViewerHelper.updateSize(GlobalSizes.largeScreen);
      this.isMobile = mobile;
      let el = IdService.id(this.imgViewerId, this.shadow);
      this.imgViewerSize = {
        w: Math.ceil(screenW / factors.w),
        h: Math.ceil(screenH / factors.h)
      };
      StyleService.setProperties(el, [
        { property: 'width', value: `${this.imgViewerSize.w}px`},
        { property: 'height', value: `${this.imgViewerSize.h}px`},  
      ]);
    }

    toggleViewer(isOpen) {
      let el = IdService.id(this.imgViewerId, this.shadow);
      if (el && this.imgMedium) {
        if (!this.imgViewerVisible) {
          this.setImage();
          this.checkImage();
          try {
            RenderService.modal(el, 500);
          } catch (e) {
            if (this.settings.exceptionHandler) {
              // re-try with show dialog
              LoggerService.warn('Failed to open ImageViewer -> reload browser');
              CustomEventService.send(CustomWindowEvents.generalNote.open, { 
                size: '', 
                text:  this.genericStatusMsg, 
                status: GeneralNoteEnums.status.error,
                code: GeneralNoteCodes.writerLostFocus,
                recipe: GeneralNoteEnums.recipes.reload,
                useBack: GeneralNoteEnums.useBack.close
              }, true);
            }        
          }
        } else {
          el.close();
          CustomEventService.removeFromContext(CommonEvents.keydown, this.shadow);
        }
        this.setImgViewer(isOpen);
      }
    }

    setZoomUpdate(e) {
      this.toggleZommStart(true);
      this.setImageViewerOverflow('hidden');

      if (e.key === this.keys.left) {
        this.zoomFactor -= this.zoomFactor > this.settings.zoom.min ? 0.1 : 0;
        this.fadeZoomInfo(true, 1);
        this.setZoomInfo(this.zoomFactor, this.keys.left);
      } else if (e.key === this.keys.right) {
        this.zoomFactor += this.zoomFactor < this.settings.zoom.max  ? 0.1 : 0;
        this.fadeZoomInfo(true, 1);
        this.setZoomInfo(this.zoomFactor, this.keys.right);
      }
      if (this.zoomFactor > this.settings.zoom.overflowFactor) {
        this.setImageViewerOverflow('scroll');
      }

      this.toggleZoom(false);
      setTimeout(() => { this.toggleZoom(true); }, 2000);
    }

    setImageViewerOverflow(value = 'hidden') {
      StyleService.setProperty(this.$imageViewer, 'overflow', value);
    }

    setZoomInfo(zoomFactor, key = '') {
      let el = IdService.id(this.$zoomPercent, this.shadow);
      let arrows = ImageViewerHelper.getZommArrows(key, this.keys);
      HTMLService.html(el, `${arrows.left} <b>${Math.floor(zoomFactor * 100)}%</b> ${arrows.right}`);
    }

    fadeZoomInfo(toggle, removeTimeout = 0) {
      this.toggleZoomInfo(toggle);
      if (removeTimeout > 0) {
        setTimeout(() => {  this.toggleZoomInfo(!toggle); }, removeTimeout * 1000);
      }
    }

    toggleZoomInfo(toggle) {
      StyleService.setDisplay(IdService.id(this.$zoomPercent, this.shadow), toggle);
    }

    setImage() {
      this.$content?.setAttribute('src', this.imgMedium);
    }

    checkImage() {
      let newSource = this.$content.getAttribute('src');
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
        let el = this.shadow.querySelector('#imageViewer img');
        if (enable) {
          StyleService.toggleClass(el, 'zoom', true);
          if (this.settings.zoom.keyboard) {
            el.style = this.setZoomAbility();
          }
          this.toggleZommStart(true);
        } else {
          if (this.zoomStarted) {
            StyleService.toggleClass(el, 'zoom', false);
            this.toggleZommStart(false);
          }   
        }
      }
    }

    toggleZommStart(toggle) {
      this.zoomStarted = toggle;
    }

    setZoomAbility() {
      return this.settings.zoomEnable ? `
        transform: scale(${this.zoomFactor});
        transition: transform 0.5s ease-in-out;
        cursor: ${this.zoomFactor > 1 ? 'zoom-in' : 'zoom-out'};` : '';
    }

    toggleOriginalLink() {
      let el = IdService.id('original', this.shadow);
      if (el) {
        StyleService.setProperty(el, 'opacity', this.originalLinkToggle ? this.originalOpacity : 0);
        this.originalLinkToggle = !this.originalLinkToggle;
      }
    }

    setOriginalImageLink() {
      return this.settings.originalLink ? `<div id="original" class="original">
        <action-link id="originalImage" label="Original image" type="${LinkTypes.transparentButton}" />
      </div>` : '';
    }

    showArrows() {
      if (this.settings.enableArrows) {
        return `
          <image-viewer-arrows 
            id="arrows" 
            settings='${JSONService.set(this.settings)}' 
            visible="${BoolEnums.bTrue}">
          </image-viewer-arrows>`;
      }
      return '';
    }
  
    render() {
      let sharedBtnStyles = `
        padding: 10px;
        border-radius: 0;`;
        
      this.shadow.innerHTML = `
        <style>
          dialog#${this.imgViewerId} {
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
            overflow: hidden;

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
              background-color: ${this.theme.error.bck};
              font-size: smaller;
              font-weight: bold;
              border: 1px solid ${this.theme.error.border};
              color: ${this.theme.error.text};
            }

            .close {
              position: absolute;
              right: 10px;
              top: 10px;
              padding: 2px;
              background-color: white;
              border-radius: 4px;

              ${ScreenQuery.mobile(`
                right: 30px;
                top: 12px;
                ${sharedBtnStyles}
              `)}
            }

            .original {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              bottom: 10px;
              padding: 2px;
              background-color: white;
              border-radius: 4px;
              opacity: ${this.originalOpacity};

              &:hover {
                opacity: 1 !important;
              }
                  
              ${ScreenQuery.mobile(`
                bottom: 20px;
                opacity: 1;
                ${sharedBtnStyles}
              `)}
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
          ${this.showArrows()}
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
    customElements.define("image-viewer-main", ImageViewer);
  }
  