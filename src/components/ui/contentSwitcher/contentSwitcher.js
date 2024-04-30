import { theme } from '../../../theme/theme';
import { CustomWindowEvents } from '../../../settings';
import { CustomEventService, IdService, StyleService } from "../../../services";
import EnvService from '../../../services/api/envService';
import { Cursors, ArrayEnums, BoolEnums } from '../../../enums';
import { ContentSwSides, LabelModes, LabelIcons } from './enums';

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
    this.labels = this.getAttribute('labels') || '[]';
    this.side = this.getAttribute('side') || ContentSwSides.right;
    this.cursor = this.getAttribute('cursor') || Cursors.normal;
    this.iconType = this.getAttribute('icon-type') || 'game';
    this.disabledClicks = this.getAttribute('disable-actions') || BoolEnums.bFalse;
    this.pageContaner = 'pagination';
    this.labelMode = LabelModes.labels;
    this.$pageHandlers = [];
    this.pageIds = [];
    this.totalAmount = 0;
    this.perPage = 0;
    this.pageAmount = 0;
  }

  static get observedAttributes() {
    return ['total', 'disable-actions'];
  }

  connectedCallback() {
    this.render();
    this.initLabels();
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
    if (name === 'disable-actions' && oldValue !== newValue) {
      this.activatePageClicks(newValue);
    }
  }

  calculatePages() {
    this.totalAmount = parseInt(this.atrAmount, 10);
    this.perPage = this.atrPerPage === ArrayEnums.All ? 1 : parseInt(this.atrPerPage, 10);
    this.pageAmount = Math.ceil(this.totalAmount / this.perPage);
  }

  initLabels() {
    let labels = [];
    if (this.labels) {
      labels = JSON.parse(this.labels);
      this.labels = labels;
    }
    if (labels.length === 0) {
      this.labelMode = LabelModes.numeric;
    }
  }

  activatePageClicks(activate) {
    if (this.$pagination) {
      this.$pagination.style.pointerEvents = activate ===  BoolEnums.bTrue ? 'none' : 'initial';
    }
  }

  setLabel(index, num) {
    let html = '';
    if (this.labelMode === LabelModes.numeric) {
      html = num;
    } else {
      html = `<div class="label">${this.labels[index]}</div>`;
    }
    return html;
  }

  setLabelIcons(pages) {
    pages.forEach((page) => {
      let $page = IdService.id(page, this.shadow);
      $page.style.background = `url("${EnvService.getRoot()}${LabelIcons[this.iconType].source}")`;
    });
  }

  setPageContainer(pagesAmount) {
    if (pagesAmount > 3) {
      this.$pagination.style.overflowY = 'scroll';
      this.$pagination.style.scrollbarWidth = 'thin';
    }
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
        html += `<div id="page-${i+1}" class="page">
          ${this.setLabel(i, i + 1)}
        </div>`;
        this.pageIds.push('page-'+(i+1));
      }
      this.$pagination.innerHTML = html;
      this.setPageContainer(this.pageIds.length);
      this.setHandlers();
      this.setLabelIcons(this.pageIds);
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
        }

        .sideLt {
          flex-direction: row-reverse;
        }

        .sideRt {
          flex-direction: row;
        }

        .label {
          font-size: 12px;
          transform: translateY(60px);
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
          height: 500px;
          padding-left: 60px;   

          @media (max-width: 768px) {
            padding-left: 20px;     
          }
        }
        .page {
          width: 80px;
          height: 100px;
          margin: 20px 10px 20px 10px;
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
