import { JSONService } from '../../../services/utils';
import ScreenQuery from '../../../styles/query';
import { BannerItemSet, Banners } from './banners';
import { CarouselSetIds } from '../../../components/ui/bannerCarousel/enums';

class BannerPage extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
    }
  
    connectedCallback() {
      this.render();
    }

    render() {
      let itemSet = JSONService.set(BannerItemSet);
      let banners = JSONService.set(Banners);

      this.shadow.innerHTML = `
          <style>
            .banner-wrapper {
              padding: 2px 0 20px 0;
              border: 1px dashed #dcdcdc;

              & h3 {
                padding-left: 8px;
              }
            }
            .carousel {
              transform: translateX(24%);
              ${ScreenQuery.mobile('transform: translateX(0);')}
            }
          </style>
          <div class="banner-wrapper">
            <h3>Banner</h3>
            <div class="carousel">
              <banner-carousel
                id="${CarouselSetIds.banner}"
                item-set='${itemSet}'  
                items='${banners}'
              >
              </banner-carousel>
            </div>
          </div>
       `;
    }
  }
  
  if ("customElements" in window) {
    customElements.define("banner-page", BannerPage);
  }
