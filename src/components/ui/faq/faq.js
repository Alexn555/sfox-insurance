// @ts-nocheck
import { ThemeHelper } from '../../../theme/theme';
import { PackIds } from '../../../theme/enums';
import { IdService, StyleService } from '../../../services';
import { JSONService, ObjectService } from '../../../services/utils';
import { FAQSets } from './sets';

class FAQViewer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.id = this.getAttribute('id') || 'common';
    this.items = this.getAttribute('items') || '[]';
    this.list =  this.getAttribute('list') || 'questions';
    this.theme = ThemeHelper.get([PackIds.faqViewer]);
    this.sets = ObjectService.getObject('faq', FAQSets[this.id]);
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
  
  showList() {
    let html = '';
    this.items.forEach(item => {
        html += `
            <div id="item-${item.id}" class="item"> 
                <div id="name-${item.id}" class="name">${item.name}</div>
                <div id="content-${item.id}" class="content">
                    ${item.content}
                </div>
            </div>
        `;
        this.toggleCollapse(item.id, true);
    });
    return html;
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
          .name {
            font-size: ${fonts.name};
            font-weight: bold;
            padding: ${pads.name};
            user-select: none;
            background-color: ${this.theme.name.background};
            cursor: ${this.sets.nameCursor};
          }
          .content {
            padding: ${pads.content};
            background-color: ${this.theme.content.background};
          }
      </style>
        <div id="wrapper">
          <div id="${this.list}">
            ${this.showList()}
          </div>   
        </div>
     ` : '';
  }
}

if ("customElements" in window) {
  customElements.define("faq-viewer", FAQViewer);
}
