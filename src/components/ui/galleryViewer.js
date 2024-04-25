import { IdService } from "../../services";

class GalleryViewer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.id = this.getAttribute("id") || "gallery-viewer";
    this.images = this.getAttribute("images") || [];
    this.perPage = this.getAttribute("per-page") || "all";
    this.thumbsClickable = this.getAttribute("thumbs-clickable") || "0";
    this.imageAmount = 0;
    this.visPhotos = []; // images that visible (per page)
  }

  static get observedAttributes() {
    return ["images"];
  }

  connectedCallback() {
    this.render();
    this.$container = IdService.id(this.id, this.shadow);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "images" && oldValue !== newValue) {
      this.setImages(this.parseImage(newValue));
    }
  }

  parseImage(images) {
    return JSON.parse(images);
  }

  setImages(images) {
    if (images && images.length > 0) {
      this.setAmount(images.length);
      let html = "";
      images.forEach((img, index) => {
        html += `<div> <img src=${img.imgSm} alt="${index}" /> </div>`;
      });
      this.$container.innerHTML = html;
    } else {
      this.$container.innerHTML = '<span class="not-found">No images found</span>';
    }
  }

  setAmount(length) {
    this.imageAmount = length;
  }

  render() {
    this.shadow.innerHTML = `
        <style>
            #${this.id} {
                display: flex;
                width: 80%;
                flex-wrap: wrap;
                padding: 10px;
                border: 1px dashed grey;

                & div {
                    padding: 6px;
                }

                .not-found {
                    font-weight: bold;
                }

                @media (max-width: 768px) {
                    width: 80%;
                }
            }
        </style>
        <div id="${this.id}">
        </div>
    `;
  }
}

if ("customElements" in window) {
  customElements.define("gallery-viewer", GalleryViewer);
}
