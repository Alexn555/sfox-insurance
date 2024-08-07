// @ts-nocheck
import { ThemeHelper } from '../../../theme/theme';
import ScreenQuery from '../../../styles/query';
import { PackIds } from '../../../theme/enums';
import { Cursors, ArrayEnums, BoolEnums } from '../../../enums';
import { CommonEvents, CustomWindowEvents } from '../../../settings';
import { CustomEventService, IdService, StyleService, HTMLService, LoggerService } from "../../../services";
import { JSONService, MobileService, ObjectService } from '../../../services/utils';
import { ContentSwSet } from './sets';
import { ContentSwSides, LabelModes, LabelIcons } from './enums';

class ContentSw extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.sides = { // with style class names
      left: 'sideLt',
      right: 'sideRt',
      top: 'sideTop'
    };
    this.id = this.getAttribute('id') || '';
    this.atrAmount = this.getAttribute('total') || '0';
    this.atrPerPage = this.getAttribute('per-page') || ArrayEnums.All;
    this.labels = this.getAttribute('labels') || '[]';
    this.side = this.getAttribute('side') || ContentSwSides.right;
    this.cursor = this.getAttribute('cursor') || Cursors.normal;
    this.indIcons = this.getAttribute('individual-icons') || '';
    this.iconType = this.getAttribute('icon-type') || 'game';
    this.disabledClicks = this.getAttribute('disable-actions') || BoolEnums.bFalse;
    this.useIndIcons = this.getAttribute('use-ind-icons') || BoolEnums.bFalse;
    this.stylesId = this.getAttribute('styles') || 'common';
    this.styles = ObjectService.getObject('gameViewer', ContentSwSet.styleSets[this.stylesId])
    this.paginationId = 'pagination';
    this.labelMode = LabelModes.labels;
    this.theme = ThemeHelper.get(PackIds.contentSw, 'contentSw');
    this.$pageHandlers = [];
    this.$labels = [];
    this.pageIds = [];
    this.totalAmount = 0;
    this.perPage = 0;
    this.pageAmount = 0;
    CustomEventService.event(CommonEvents.resize, this.updateSize.bind(this), window);
  }

  static get observedAttributes() {
    return ['total', 'labels', 'disable-actions'];
  }

  connectedCallback() {
    this.render();
    this.initIndividualIcons();
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
    if (name === 'labels' && oldValue !== newValue) {
      this.labels = JSONService.getArray(newValue);
      this.checkLabels(this.labels);
      this.setPagination();
    }
  }

  updateSize() {
    if (this.$pagination) {
      this.setPageContainer(this.$pagination);
    }
  }

  checkLabels(labels) {
    if (labels) {
      for (let i = 0, l = labels.length; i < l; i++) {
        if (labels[i] === '' || labels[i] === undefined) {
          LoggerService.error(`Contentsw #${this.id} some labels ${labels} doesn't have value`);
          return;
        }
      }
    }
  }

  calculatePages() {
    this.totalAmount = parseInt(this.atrAmount, 10);
    this.perPage = this.atrPerPage === ArrayEnums.All ? 1 : parseInt(this.atrPerPage, 10);
    this.pageAmount = Math.ceil(this.totalAmount / this.perPage);
  }

  initIndividualIcons() {
    if (this.indIcons !== '') {
      this.indIcons = JSONService.getArray(this.indIcons);
    }
  }

  activatePageClicks(activate) {
    if (this.$pagination) {
      StyleService.setProperty(this.$pagination, 'pointerEvents', activate === BoolEnums.bTrue ? 'none' : 'initial');
    }
  }

  setLabel(index, num) {
    let html = '';
    if (this.labelMode === LabelModes.numeric) {
      html = num;
    } else {
      html = `<div id="label-${index}" class="label">${this.labels[index]}</div>`;
    }
    return html;
  }

  setLabelIcons(pages) {
    pages.forEach((page, index) => {
      if (index < pages.length) {
        let $page = IdService.id(page, this.shadow);
        StyleService.setProperty($page, 'background', 
          `url("${this.useIndIcons === BoolEnums.bTrue ? this.indIcons[index].source : LabelIcons[this.iconType].source}")`);
      }
    });
  }

  setPageContainer(pagesAmount) {
    const isMobile = MobileService.isMobile();
    const isPagesMax = isMobile ? pagesAmount > ContentSwSet.maxMobileColumn : pagesAmount > ContentSwSet.maxColumn; 
    let properties = [];
    
    if (isPagesMax) {
      if (isMobile) {
        properties =  [ 
          { property: 'overflowX', value: 'scroll' },
          { property: 'scrollbarWidth', value: 'thin' },
        ];
      } else {
        properties =  [ 
          { property: 'overflowY', value: 'scroll' },
          { property: 'scrollbarWidth', value: 'thin' },
        ];
      }
      StyleService.setProperties(this.$pagination, properties);
    }
  }

  setPagination() {
    this.$container = IdService.id(this.id, this.shadow);
    this.$pagination = IdService.id(this.paginationId, this.shadow);
    if (this.$pagination) {
      if (this.pageAmount === 0) {
        HTMLService.html(this.$pagination, '');
        return;
      }

      this.pageIds = [];
      let html = '';
      for (let i = 0; i < this.pageAmount; i++) {
        html += `<div id="page-${i+1}" class="page">
          ${this.setLabel(i, i + 1)}
        </div>`;
        this.pageIds.push('page-'+(i+1));
      }
      HTMLService.html(this.$pagination, html);
      this.setPageContainer(this.pageIds.length);
      this.setHandlers();
      this.setLabelIcons(this.pageIds);
    }
  }

  setHandlers() {
    this.pageIds.forEach((pageId, index) => {
      this.$pageHandlers[index] = IdService.idAndClick(pageId, this.shadow, () => { 
        CustomEventService.send(`${CustomWindowEvents.contentSw.pageClick}-${this.id}`, index + 1);
        this.setActive(index);
      });
      this.$labels[index] = IdService.id('label-'+index, this.shadow);
    });
    this.setActive(0);
  }

  setSide(side) {
    StyleService.toggleClass(this.$container, this.sides[side], true);
  }

  setActive(selected) {
    StyleService.setActive(this.$pageHandlers, selected, 'active');
    StyleService.setActive(this.$labels, selected, 'labelActive');
  }

  setPaginationStyles(side) {
    let css = `
      display: flex;
      flex-direction: column;
      width: ${window.innerWidth > 1360 ? '16%' : '30%'};
      height: 500px;
      padding-right: ${this.styles.sidePadding}px;
      padding-left: ${this.styles.sidePadding}px;   
    `;
    if (side === ContentSwSides.top) {
      css = `
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 160px;
        padding-left: 20px; 
      `;
    }
    return css;
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        #${this.id} {
          display: flex;
          width: fit-content;
        }

        .sideLt {
          flex-direction: row-reverse;
          ${ScreenQuery.mobile('flex-direction: column-reverse;')}
        }

        .sideRt {
          flex-direction: row;
          ${ScreenQuery.mobile('flex-direction: column-reverse;')}
        }

        .sideTop {
          flex-direction: column-reverse;   
        }

        .label {
          font-size: 12px;
          transform: translateY(60px);
        }

        .labelActive {
          color: ${this.theme.labelActive};
        } 

        .content {
          width: fit-content;
          height: fit-content;

          & span {
            padding-left: 4px;
            text-transform: capitalize;
          }
        }

        #${this.paginationId} {
          ${this.setPaginationStyles(this.side)}

          ${ScreenQuery.mobile(`
            flex-direction: row;
            width: 100%;
            height: 160px;
            padding-left: 20px;  
          `)}
        }

        .page {
          width: 80px;
          height: 100px;
          margin: 20px 10px 20px 10px;
          background-color: ${this.theme.background};
          text-align: center;
          font-weight: bold;
          line-height: 100px;
          border: 1px solid ${this.theme.border};
          user-select: none;
          cursor: ${this.cursor};         
        }

        .active {
          background-color: ${this.theme.active};
        }
      </style>
      <div id="${this.id}">
        <div class="content">
          <slot></slot>
        </div>
        <div id="${this.paginationId}"></div>
      </div>
    `;
  }
}

if ("customElements" in window) {
  customElements.define("content-sw", ContentSw);
}
