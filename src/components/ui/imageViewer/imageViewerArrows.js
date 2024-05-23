import { ThemeHelper } from '../../../theme/theme';
import { PackIds } from '../../../theme/enums';
import { Cursors, KeyboardKeys } from '../../../enums';
import { CommonEvents } from '../../../settings';
import { CustomEventService, IdService, StyleService } from '../../../services';
import { JSONService } from '../../../services/utils';
import { ImageViewerEvents } from './events';

class ImageViewerArrows extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.settings = this.getAttribute('settings') || {};
    this.sets = JSONService.getObj(this.settings);
    this.theme = ThemeHelper.get(PackIds.imageViewer);
    this.diameter = 30;
    this.cursor = this.sets.arrows.cursor || Cursors.normal;
    this.initOpacity = 0.2;
    this.endOpacity = 0.6;
    this.opacityToggle = false;
    this.isVisible = true;
  }

  connectedCallback() {
    this.render();
    this.setHandlers();
    this.toggleVisible(true);
  }

  setHandlers() {
    this.$previous = IdService.id('previous', this.shadow);
    this.$next = IdService.idAndClick('next', this.shadow);

    CustomEventService.event(ImageViewerEvents.openViewer, () => {
      this.toggleVisible(true);
    });

    CustomEventService.event(ImageViewerEvents.closeViewer, () => {
      this.toggleVisible(false);
      CustomEventService.removeFromContext(CommonEvents.keydown, this.shadow);
    });

    CustomEventService.event(CommonEvents.keydown, (e) => {
      if (this.isVisible) {
         if (e.key === KeyboardKeys.m) {
          this.toggleArrowsOpacity();
        }
        if (e.key === KeyboardKeys.arrowUp) {
          e.preventDefault();
          CustomEventService.send(ImageViewerEvents.nextImage);
        }
        if (e.key === KeyboardKeys.arrowDw) {
          e.preventDefault();
          CustomEventService.send(ImageViewerEvents.previousImage);
        }
      }
    });

    if (this.sets.enableArrows) {
        IdService.event(this.$previous, CommonEvents.click, () => {
          CustomEventService.send(ImageViewerEvents.previousImage);
        });
        IdService.event(this.$next, CommonEvents.click, () => {
          CustomEventService.send(ImageViewerEvents.nextImage);
        });
    } else {
      StyleService.setDisplayMultiple([this.$previous, this.$next], false);
    }
  }

  disconnectedCallback() {
    IdService.removeList([this.$previous, this.$next]);
    CustomEventService.removeFromContext(CommonEvents.keydown, this.shadow);
  }

  toggleVisible(toggle) {
    this.isVisible = toggle;
  }

  toggleArrowsOpacity() {
    let cl = 'arrowInvisible';
    let addCl = this.opacityToggle ? `${cl}` : '';
    StyleService.removeAndAddClass(this.$previous, ['arrowLt', cl], `arrowLt${addCl}`); // refresh class
    StyleService.removeAndAddClass(this.$next, ['arrowRt', cl], `arrowRt${addCl}`); 
    this.opacityToggle = !this.opacityToggle;
  }

  getCommonArrow() {
    return `
      position: absolute;
      border: solid ${this.theme.arrows.bck};
      border-width: 0 ${this.diameter}px ${this.diameter}px 0;
      display: inline-block;
      padding: ${this.diameter}px;
      cursor: ${this.cursor};
      z-index: 10;
    `;
  }

  render() {
    this.shadow.innerHTML = `
        <style>
         .arrowInvisible {
            opacity: 0 !important;
         }

         .arrowLt {
            ${this.getCommonArrow()}
            left: 10px;
            top: 38%;
            transform: rotate(135deg);
            opacity: ${this.initOpacity};

            &:hover {
              opacity: ${this.endOpacity};
            }
          }

          .arrowRt {
            ${this.getCommonArrow()}
            right: 10px;
            top: 38%;
            transform: rotate(-45deg);
            opacity: ${this.initOpacity};

            &:hover {
              opacity: ${this.endOpacity};
            }
          }
        </style>
        <div id="previous" class="arrowLt"> </div>
        <div id="next" class="arrowRt"> </div>
    `;
  }
}

if ("customElements" in window) {
  customElements.define("image-viewer-arrows", ImageViewerArrows);
}
