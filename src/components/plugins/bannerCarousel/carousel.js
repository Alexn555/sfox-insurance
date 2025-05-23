// @ts-nocheck
import { CustomEventService, HTMLService, IdService } from '../../../services';
import { ArrayService, JSONService } from '../../../services/utils';
import { draggableContainer } from '../../../modifiers/dragContainer';
import ScreenQuery from '../../../styles/query';
import { PackIds } from '../../../theme/enums';
import { ThemeHelper } from '../../../theme/theme';
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
        if (this.sets.navShuffle) {
          this.$shuffle = IdService.idAndClick('shuffle', this.shadow, this.shuffle.bind(this));
        }
      }

      draggableContainer(this.$scene, false, false);
    }

    disconnectedCallback() {
      if (this.$prev) {
        IdService.removeList([this.$prev, this.$next]);
      }
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
              <span class="name">
                ${this.items[i].label}
              </span>
              <p>
                ${this.items[i].desc}
              </p>
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

    shuffle() {
      HTMLService.removeItems(this.$scene);
      this.items = ArrayService.shuffleArray(this.items);
      this.getItems();
    }

    setScenePos(x, updatePos = false) {
      this.$scene.style.left = x + 'px';
      if (updatePos) {
        this.curPos = x;
      }
    }

    showNavigation() {
      let html = '';
      let shuffle = '';
      if (this.sets.navShuffle) {
        shuffle = '<div id="shuffle" class="nav">shuffle</div>';
      }

      if (this.sets.enableNav) {
          html = `
          <div id="navigation">
            <div id="prev" class="nav">prev</div>
            ${shuffle}
            <div id="next" class="nav">next</div>
          </div>
        `;
      }
      return html;
    }

    adjustNext() {
      let number = this.sets.navShuffle ? 3 : 2;
      return `
        &:nth-child(${number}) {
          margin-right: 18px;
        }`;
    }

    render() {
      let scene = BannerCarouelHelper.getSceneSizes(this.items, this.itemSet);
      let lbthm = this.theme.label;
      let lbsets = this.sets.label;

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
              overflow-y: hidden;
            }

            .banner {
              display: inline-block;
              position: relative;
              margin: ${this.sets.margin};
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
              color: ${lbthm.text};
              height: ${lbsets.height};
              opacity: ${lbthm.opacity};
              cursor: ${this.sets.linkCursor};

              transition: height ${this.sets.descHover}s;
              &:hover {
                height: ${lbsets.hoverH};         
              }

              p {
                color: ${lbthm.desc};
              }
            }
            
            .name {
              display: inline-block;
              border: 1px dashed ${lbthm.border};
              height: ${lbsets.nameH};
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

              ${this.adjustNext()}
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