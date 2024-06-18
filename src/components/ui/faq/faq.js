// @ts-nocheck
import { ThemeHelper } from '../../../theme/theme';
import { PackIds } from '../../../theme/enums';
import { IdService, StyleService } from '../../../services';
import { JSONService } from '../../../services/utils';
import { SettingsChecker } from '../../../services/helpers/settingsChecker';
import { FAQSets, FAQSetIds } from './sets';

class FAQViewer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.id = this.getAttribute('id') || 'common';
    this.headline = this.getAttribute('headline') || '';
    this.items = this.getAttribute('items') || '[]';
    this.list = this.getAttribute('list') || 'questions';
    this.theme = ThemeHelper.get([PackIds.faqViewer]);
    this.sets = SettingsChecker.getId(this.id, FAQSetIds, FAQSets);
    this.collapsed = {};
    this.$names = [];
  }

  connectedCallback() {
    this.initList();
    this.render();
    this.initForm();
  }

  disconnectedCallback() {
    IdService.removeList(this.$names);
  }

  initForm() {
    this.$list = IdService.id(this.list, this.shadow);
    this.initButtons();
  }

  initList() {
    this.items = JSONService.getArray(this.items);
  }

  initButtons() {
    this.items.forEach(item => {       
      this.$names.push(IdService.idAndClick('name-'+item.id, this.shadow, () => {
        if (this.sets.collapse) {
          let isVis = this.getCollapsed(item.id);
          this.toggleCollapse(item.id, !isVis);
          this.updateContent(item.id, !isVis);
        }
      }));
    });
  }

  toggleCollapse(id, toggle) {
    this.collapsed[id] = toggle;
  }
  
  getCollapsed(id) {
    return id !== '' ? this.collapsed[id] : false;
  }

  updateContent(activeId, toggle) {
    let el = IdService.id('content-'+activeId, this.shadow);
    StyleService.setProperty(el, 'display', toggle ? 'block' : 'none');
    if (this.sets.arrow) {
      this.updateArrow(activeId, toggle);
    }
  }

  updateArrow(activeId, toggle) {
    let arrEl = IdService.id('arrow-'+activeId, this.shadow);
    let addCl = toggle ? 'arrUp' : 'arrDw';
    StyleService.removeAndAddClass(arrEl, ['arrUp', 'arrDw'], addCl);
  }

  getCommonArrow() {
    return `
      position: absolute;
      right: 20px;
      width: 0; 
      height: 0; 
      bottom: 10px;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
    `;
  }

  showHeadline() {
    return this.headline ? `<div class="headline">${this.headline}</div>` : '';
  }

  showArrow(id) {
    return this.sets.arrow ? `<div id="arrow-${id}" class="arrDw"></div>` : '';
  }
    
  showList() {
    let html = '';
    this.items.forEach(item => {
        html += `
          <div id="item-${item.id}" class="item"> 
            <div id="name-${item.id}" class="name">
              ${item.name}
              ${this.showArrow(item.id)}
            </div>
            <div id="content-${item.id}" class="content">
              ${item.content}
            </div>
          </div>
        `;
        this.toggleCollapse(item.id, true);
    });
    return html;
  }

  render() {
    let pads = this.sets.pads;
    let fonts = this.sets.fonts;
    this.shadow.innerHTML = this.sets.enabled ? `
        <style>
          #wrapper {
            background-color: ${this.theme.wrapper.background};
            padding: 2px;
            font-size: ${fonts.wrapper};
          }
          .item {
            padding: ${pads.item};
          }
          .headline {
            width: 100px;
            margin-left: 4px;
            font-size: 18px;
            border-bottom: 1px solid ${this.theme.name.background};
          }
          .name {
            position: relative;
            font-size: ${fonts.name};
            font-weight: bold;
            padding: ${pads.name};
            user-select: none;
            background-color: ${this.theme.name.background};
            cursor: ${this.sets.nameCursor};
          }
          .arrUp {
            ${this.getCommonArrow()}
            border-bottom: 4px solid ${this.theme.arrow.background};
          }
          .arrDw {
            ${this.getCommonArrow()}
            border-top: 4px solid ${this.theme.arrow.background};
          }
          .content {
            padding: ${pads.content};
            background-color: ${this.theme.content.background};
          }
      </style>
        <div id="wrapper">
          <div id="${this.list}">
            ${this.showHeadline()}
            ${this.showList()}
          </div>   
        </div>
     ` : '';
  }
}

if ("customElements" in window) {
  customElements.define("faq-viewer", FAQViewer);
}
