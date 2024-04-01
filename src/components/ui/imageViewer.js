// @ts-nocheck
import { GlobalSizes } from '../../components/common/settings';

class ImageViewer extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.imgMedium = '';
      window.addEventListener('resize', this.updateSize.bind(this));
      window.addEventListener('image-viewer-open', (evt) => {
        if (evt.detail) { // just to double check
            this.imgMedium = evt.detail.value;
        }
        this.toggleViewer(true);
      });

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

      this.$close = this.shadow.getElementById('close');
      this.$close.addEventListener('click', () => {
        this.toggleViewer(false);
      });
    }

    disconnectedCallback() {
       this.$close.removeEventListener('click', null);
    }

    attributeChangedCallback(name, oldValue, newValue) {
       if (name === 'source' && oldValue !== newValue) {
          this.imgMedium = newValue;
          this.setImage();
       }
    }

    updateSize() {
      const isMobile = window.innerWidth < GlobalSizes.mobileMax;
      this.screenW = window.innerWidth;
      this.screenH = window.innerHeight;
      let factors = isMobile ? { w: 1.1, h: 1.1 } : { w: 1.1, h: 1.2 };
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
      if (this.imgMedium) {
        const el = this.shadow.getElementById(this.imgViewerId);
        if (!this.imgViewerVisible) {
          this.setImage();
          el.showModal();
        } else {
          el.close();
        }
        this.setImgViewer(isOpen);
      }
    }

    setImage() {
        const content = this.shadow.getElementById('imgDetail');
        content.setAttribute('src', this.imgMedium);
    }

    setImgViewer(toggle) {
      this.imgViewerVisible = toggle;
    }
  
    render() {
      this.shadow.innerHTML = `
            <style>
              dialog#imageViewer {
                position: relative;
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
                <img id="imgDetail" src="../../assets/wallet.svg" alt="loading image" />
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
  