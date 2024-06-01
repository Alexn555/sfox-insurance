// @ts-nocheck
import { ThemeHelper } from '../../../theme/theme';
import ScreenQuery from '../../../styles/query';
import { PackIds } from '../../../theme/enums';
import { MouseEvents } from '../../../settings/sets/events';
import { IdService, HTMLService, CustomEventService } from '../../../services';
import { JSONService } from '../../../services/utils';
import { BannerCarouelHelper } from './carouselHelper';
import { BannerCarouselEvents } from './events';

class bannerCarousel extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.id = this.getAttribute('id') || 'bannerCarousel';
      this.itemSet = this.getAttribute('item-set') || '';
      this.items = this.getAttribute('items') || '[]';
      this.theme = ThemeHelper.get(PackIds.bannerCarousel);
      this.sets = BannerCarouelHelper.getId(this.id);
      this.container = this.id;
      this.curPos = 0;
    }

    connectedCallback() {
      this.parseItems();
      this.render();
      this.initForm();
      this.getItems();
    }

    initForm() {
      this.$scene = IdService.id('scene', this.shadow);
      this.$error = IdService.id('status', this.shadow);

      if (this.sets.enableNav) {
        this.$prev = IdService.idAndClick('prev', this.shadow, this.prev.bind(this));
        this.$next = IdService.idAndClick('next', this.shadow, this.next.bind(this));
      }
    
      IdService.event(this.$scene, MouseEvents.mousedown, () => {
        document.onmousemove = (e) => {
          let x = e.offsetX * -1;
          this.setScenePos(x, false);
        };

        document.onmouseleave = (e) => {
          this.curPos = e.offsetX;    
        };
      });

      CustomEventService.event(MouseEvents.mouseup, () => {
        document.onmousemove = null;
      });
    }

    disconnectedCallback() {
      if (this.$prev) {
        IdService.removeList([this.$prev, this.$next]);
      }
      CustomEventService.removeList([MouseEvents.mousedown, MouseEvents.mouseup]);
      if (this.sets.enableLink) {
        IdService.removeList(this.$links);
      }
    }

    parseItems() {
      this.itemSet = JSONService.getObj(this.itemSet);
      this.items = JSONService.getArray(this.items);
    }

    getItems() {
      let amount = this.items.length;   
      let html = '';

      if (amount > 0) {
        for (let i = 0; i < amount; i++) {
          let style = ` 
            background-image: url('${this.items[i].image}');
            width: ${this.itemSet.w}px;
            height: ${this.itemSet.h}px;
          `;

          html += `
          <div id="item-${i}" class="banner" style="${style}">  
            <div id="item-label-${i}" class="label">
              ${this.items[i].label}
            </div>
          </div>`;
        }

      } else {
        BannerCarouelHelper.setError(this.$error, 'No items found', this.shadow);
      }

      HTMLService.html(this.$scene, html);
      this.setLinkHandlers(this.items, amount);
    }

    setLinkHandlers(items, amount) {      
      if (this.sets.enableLink) {
        this.$links = [];
        this.$links.length = amount;
        for (let i = 0; i < amount; i++) {
          let item = IdService.idAndClick(`item-label-${i}`, this.shadow, () => {
            CustomEventService.send(BannerCarouselEvents.linkClick, items[i].id);
          });
          this.$links[i] = item;
        }
      }  
    }

    prev() { 
      if (this.$scene) {
        let x = this.curPos > -100 ? this.curPos + this.itemSet.w : 0;
        this.setScenePos(x, true);
      }
    }

    next() {
      if (this.$scene) {
        let w = this.itemSet.w;
        let amount = this.items.length;
        let len = amount > 0 ? w * amount : w;
        let x = this.curPos < len ? this.curPos - w : len;
        this.setScenePos(x, true);
      }
    }

    setScenePos(x, updatePos = false) {
      this.$scene.style.left = x + 'px';
      if (updatePos) {
        this.curPos = x;
      }
    }

    showNavigation() {
      let html = '';
      if (this.sets.enableNav) {
          html = `
          <div id="navigation">
            <div id="prev" class="nav">prev</div>
            <div id="next" class="nav">next</div>
          </div>
        `;
      }
      return html;
    }

    render() {
      let scene = BannerCarouelHelper.getSceneSizes(this.items, this.itemSet);

      this.shadow.innerHTML = `
          <style>
            #${this.container} {
              background-color: ${this.theme.bck};
              border: 1px dashed ${this.theme.border};
              margin-left: 20px;
              width: 50%;
              text-align: center;
              height: ${scene.h + 80}px;
              overflow: hidden;
            }

            .status {
              padding-left: 2px;
            }

            #scene {
              position: relative;
              background-color: ${this.theme.scene.bck};
              wrap: no-wrap;
              width: ${scene.w}px;
              height: ${scene.h}px;
            }

            .banner {
              display: inline-block;
              position: relative;
              border: 1px solid white;
              background-repeat: no-repeat;
              background-position: center;
              background-size: contain;
              user-select: none;
            }

            .label { 
              position: absolute;
              background-color: ${this.theme.scene.bck};
              bottom: 10px;
              color: ${this.theme.label.text};
              height: 30px;
              opacity: ${this.theme.label.opacity};
              cursor: ${this.sets.linkCursor};
            }

            #navigation {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin: 10px;
              width: 100%;
              user-select: none;
            }

            .nav {
              width: 80px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              border: 1px solid black;
              border-radius: 4px;
              cursor: ${this.sets.navCursor};

              &:nth-child(2) {
                margin-right: 16px;
              }
            }

            ${ScreenQuery.mobile(`
              #${this.container} {
                width: 90%;
              }
            `)}
          </style>
          <section id="${this.container}">
            <div id="status" class="error"></div>
            ${this.showNavigation()}

            <div id="scene">
            </div>
          </section>
       `;
    }
}
  
if ("customElements" in window) {
  customElements.define("banner-carousel", bannerCarousel);
}