import { theme } from '../../../theme/theme';
import { CustomWindowEvents } from '../../../settings';
import { CustomEventService, IdService, StyleService } from "../../../services";
import { Cursors, ArrayEnums } from '../../../enums';

class PaginatableContent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.id = this.getAttribute('id') || '';
    this.atrAmount = this.getAttribute('total') || '0';
    this.atrPerPage = this.getAttribute('per-page') || ArrayEnums.All;
    this.label = this.getAttribute('label') || '';
    this.cursor = this.getAttribute('cursor') || Cursors.normal;
    this.pageContaner = 'pagination';
    this.$pageHandlers = [];
    this.pageIds = [];
    this.totalAmount = 0;
    this.perPage = 0;
    this.pageAmount = 0;
  }

  static get observedAttributes() {
    return ['total', 'label'];
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
    if (name === 'label' && oldValue !== newValue) {
      const el = IdService.id('label', this.shadow);
      if (el) {
        el.innerText = newValue;
      }
    }
  }

  calculatePages() {
    this.totalAmount = parseInt(this.atrAmount, 10);
    this.perPage = this.atrPerPage === ArrayEnums.All ? 1 : parseInt(this.atrPerPage, 10);
    this.pageAmount = this.perPage === 1 ? 1 : Math.ceil(this.totalAmount / this.perPage);
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
      this.setHandlers();
    }
  }

  setHandlers() {
    this.pageIds.forEach((pageId, index) => {
      this.$pageHandlers[index] = IdService.idAndClick(pageId, this.shadow, () => { 
        CustomEventService.send(CustomWindowEvents.paginatableContent.pageClick, index + 1);
        this.setActive(index);
      });
    });
    this.setActive(0);
  }

  setActive(selected) {
    StyleService.setActive(this.$pageHandlers, selected, 'active');
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        .content {
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
          flex-wrap: wrap;
          width: 100%;
          height: fit-content;
          padding-left: 60px;     

          @media (max-width: 768px) {
            padding-left: 20px;     
          }
        }
        .page {
          width: 60px;
          height: 60px;
          margin: 10px;
          background-color: ${theme.paginatableContent.background};
          text-align: center;
          font-weight: bold;
          line-height: 60px;
          border: 1px solid ${theme.paginatableContent.border};
          user-select: none;
          cursor: ${this.cursor};         
        }

        .active {
          background-color: ${theme.paginatableContent.active};
        }
      </style>
      <div id="${this.id}">
        <div class="content">
            <span id="label">${this.label}</span>
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
