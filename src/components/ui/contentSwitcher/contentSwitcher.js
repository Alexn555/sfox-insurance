import { theme } from '../../../theme/theme';
import { CustomWindowEvents } from '../../../settings';
import { CustomEventService, IdService, StyleService } from "../../../services";
import { Cursors, ArrayEnums } from '../../../enums';
import { ContentSwSides } from './enums';

class ContentSwitcher extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });

    this.sides = {
      Lt: 'sideLt',
      Rt: 'sideRt'
    };

    this.id = this.getAttribute('id') || '';
    this.atrAmount = this.getAttribute('total') || '0';
    this.atrPerPage = this.getAttribute('per-page') || ArrayEnums.All;
    this.side = this.getAttribute('side') || ContentSwSides.right;
    this.cursor = this.getAttribute('cursor') || Cursors.normal;
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
    this.setSide(this.side);
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
    this.perPage = this.atrPerPage === ArrayEnums.All ? 1 : parseInt(this.atrPerPage, 10);
    this.pageAmount = Math.ceil(this.totalAmount / this.perPage);
  }

  setPagination() {
    this.$container = IdService.id(this.id, this.shadow);
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
        CustomEventService.send(CustomWindowEvents.contentSwitcher.pageClick, index + 1);
        this.setActive(index);
      });
    });
    this.setActive(0);
  }

  setSide(side) {
    let cl = side === 'left' ? this.sides.Lt : this.sides.Rt;
    StyleService.toggleClass(this.$container, cl, true);
  }

  setActive(selected) {
    StyleService.setActive(this.$pageHandlers, selected, 'active');
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        #${this.id} {
          display: flex;
          //flex-direction: row;
        }

        .sideLt {
          flex-direction: row-reverse;
        }

        .sideRt {
          flex-direction: row;
        }

        .content {
          width: fit-content;
          height: fit-content;

          & span {
            padding-left: 4px;
            text-transform: capitalize;
          }
        }

        #${this.pageContaner} {
          display: flex;
          flex-direction: column;
          width: 30%;
          height: fit-content;
          padding-left: 60px;     

          @media (max-width: 768px) {
            padding-left: 20px;     
          }
        }
        .page {
          width: 80px;
          height: 100px;
          margin: 10px;
          background-color: ${theme.contentSwitcher.background};
          text-align: center;
          font-weight: bold;
          line-height: 100px;
          border: 1px solid ${theme.contentSwitcher.border};
          user-select: none;
          cursor: ${this.cursor};         
        }

        .active {
          background-color: ${theme.contentSwitcher.active};
        }
      </style>
      <div id="${this.id}">
        <div class="content">
          <slot></slot>
        </div>
        <div id="${this.pageContaner}"></div>
      </div>
    `;
  }
}

if ("customElements" in window) {
  customElements.define("content-switcher", ContentSwitcher);
}
