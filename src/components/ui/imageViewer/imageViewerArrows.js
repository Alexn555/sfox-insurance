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
    this.initOpacity = 0.3;
  }

  connectedCallback() {
    this.render();
    this.setHandlers();
  }

  setHandlers() {
    this.$previous = IdService.id('previous', this.shadow);
    this.$next = IdService.idAndClick('next', this.shadow);

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
  }

  getCommonArrow() {
    return `
      position: absolute;
      border: solid #dcdcdc;
      border-width: 0 30px 30px 0;
      display: inline-block;
      padding: 30px;
    `;
  }

  render() {
    this.shadow.innerHTML = `
        <style>
         .arrowLt {
            ${this.getCommonArrow()}
            left: 10px;
            top: 38%;
            transform: rotate(135deg);
            opacity: ${this.initOpacity};

            &:hover {
                opacity: 1;
            }
          }

          .arrowRt {
            ${this.getCommonArrow()}
            right: 10px;
            top: 38%;
            transform: rotate(-45deg);
            opacity: ${this.initOpacity};

            &:hover {
                opacity: 1;
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
