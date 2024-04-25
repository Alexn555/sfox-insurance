import { CustomWindowEvents } from '../../settings';
import { CustomEventService, IdService } from "../../services";

class PaginatableContent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.id = this.getAttribute('id') || '';
    this.atrAmount = this.getAttribute('total') || '0';
    this.atrPerPage = this.getAttribute('per-page') || 'all';
    this.label = this.getAttribute('label') || '';
    this.pageContaner = 'pagination';
    this.$pageHandlers = [];
    this.pageIds = [];
    this.totalAmount = 0;
    this.perPage = 0;
    this.pageAmount = 0;
  }

  static get observedAttributes() {
    return ['total'];
  }

  connectedCallback() {
    this.render();
    this.calculatePages();
    this.setPagination();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'total' && oldValue !== newValue) {
      this.atrAmount = newValue;
      this.calculatePages();
      this.setPagination();
    }
  }

  calculatePages() {
    this.totalAmount = parseInt(this.atrAmount, 10);
    this.perPage = this.atrPerPage === 'all' ? 1 : parseInt(this.atrPerPage, 10);
    this.pageAmount = this.perPage === 1 ? 1 : Math.floor(this.totalAmount / this.perPage);
  }

  setPagination() {
    this.$pagination = IdService.id(this.pageContaner, this.shadow);
    if (this.$pagination) {
      if (this.pageAmount === 0) {
        return this.$pagination.innerHTML = '';
      }

      this.pageIds = [];
      let html = '';
      for (let i = 0; i < this.pageAmount; i++) {
        html += `<div id="page-${i+1}" class="page">${i + 1}</div>`;
        this.pageIds.push('page-'+(i+1));
      }
      this.$pagination.innerHTML = html;
      setTimeout(() => { this.setHandlers(); }, 1000);
    }
  }

  setHandlers() {
    this.pageIds.forEach((pageId, index) => {
        this.$pageHandlers[index] = IdService.idAndClick(pageId, this.shadow, () => { 
            CustomEventService.send(CustomWindowEvents.paginatableContent.pageClick, index + 1);
        });
    });
  }

  render() {
    this.shadow.innerHTML = `
        <style>
            #${this.id} {
                border: 1px dashed grey;
            }

            .content {
                border: 1px dashed black;
                width: fit-content;
                height: 100%;

                & span {
                    padding-left: 4px;
                    text-transform: capitalize;
                }
            }

            #${this.pageContaner} {
                display: flex;
                flex-direction: row;
                width: 100%;
                height: 100px;
                padding-left: 60px;
            }
            .page {
                width: 60px;
                height: 60px;
                margin: 10px;
                text-align: center;
                font-weight: bold;
                line-height: 60px;
                border: 1px solid black;
                user-select: none;

                &:hover {
                    cursor: ponter;
                }
            }
        </style>
        <div id="${this.id}">
            <div class="content">
                <span>${this.label}</span>
                <slot></slot>
            </div>
            <div id="${this.pageContaner}"></div>
        </div>
    `;
  }
}

if ("customElements" in window) {
  customElements.define("paginatable-content", PaginatableContent);
}
