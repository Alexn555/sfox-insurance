// @ts-nocheck
import { ThemeHelper } from '../../../theme/theme';
import { PackIds } from '../../../theme/enums';
import { IdService, StyleService, HTMLService, CustomEventService } from '../../../services';
import { JSONService, ArrayService } from '../../../services/utils';
import { CustomEvents } from '../../../settings';
import { styleErrors } from '../../common/styles/errors';
import { SettingsChecker } from '../../../services/helpers/settingsChecker';
import { ReviewSets, ReviewerSetIds } from './sets';
import { ReviewEvents } from './events';

class Reviewer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.id = this.getAttribute('id') || 'common';
    this.headline = this.getAttribute('headline') || '';
    this.setsId = this.getAttribute('setsId') || '';
    this.items = this.getAttribute('items') || '[]';
    this.list = this.getAttribute('list') || 'answers';
    this.startNum = this.getAttribute('start-num') || '0';
    this.submitLabel = this.getAttribute('submit') || 'Submit';
    this.theme = ThemeHelper.get([PackIds.reviewer]);
    this.sets = SettingsChecker.getId(this.setsId, ReviewerSetIds, ReviewSets);
    this.collapsed = {};
    this.$names = [];
    this.saveObj = {};
  }

  connectedCallback() {
    this.initAttributes();
    this.render();
    this.initForm();
  }

  disconnectedCallback() {
    IdService.removeList(this.$names);
    IdService.removeList([this.$submit]);
  }

  initAttributes() {
    this.items = JSONService.getArray(this.items);
    this.startNum = parseInt(this.startNum, 10);
  }

  initForm() {
    this.$list = IdService.id(this.list, this.shadow);
    this.$notice = IdService.id('notice', this.shadow);
    this.$error = IdService.id('error', this.shadow);
    this.initButtons();
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

      CustomEventService.event(`${CustomEvents.interaction.radioGroupChange}-radio-${item.id}`, (e) => {
        this.saveObj[item.id] = e.detail.value;
      });
      CustomEventService.event(`${CustomEvents.interaction.checkboxChange}-radio-${item.id}`, (e) => {
        this.saveObj[item.id] = ArrayService.addOrSplice(this.saveObj[item.id], e.detail.value);
      });
    });

    this.$submit = IdService.idAndClick('reviewer-submit', this.shadow, this.submitForm.bind(this));
  }

  submitForm() {
    if (!this.validateForm()) {
      HTMLService.toggleMsg(this.$notice, 
        `All ok,
        demo message not send width save obj ${JSON.stringify(this.saveObj)}! :) `, 
        this.sets.message.timeout);

      CustomEventService.send(ReviewEvents.submit, { 
        id: this.id, 
        label: this.headline,
        saveObj: this.saveObj
      });
    }
  }

  validateForm() {
    let isError = false;
    let itemsRequired = 0;
    let foundRequired = 0;

    if (this.items && this.items.length > 0) {
      this.items.forEach((item, index) => {
        if (item.required) {
          itemsRequired += 1;
        }

        for (const [key] of Object.entries(this.saveObj)) {
          if (item.required && item.id === key) {
            foundRequired += 1;
          }
        }
      });
    }

    isError = itemsRequired !== foundRequired;

    if (isError) {
      HTMLService.toggleMsg(this.$error, 'Error, some required marked with (*) are not answered. Please answer those', 1);
    }

    return isError;
  }

  toggleCollapse(id, toggle) {
    this.collapsed[id] = toggle;
  }
  
  getCollapsed(id) {
    return id !== '' ? this.collapsed[id] : false;
  }

  updateContent(activeId, toggle) {
    let el = IdService.id('content-'+activeId, this.shadow);
    if (this.sets.contentAnim) {
      StyleService.setProperty(el, 'height', toggle ? '30px' : '0');
      setTimeout(() => { 
        if (toggle) {
          StyleService.setProperty(el, 'height', 'fit-content'); 
        }
      }, this.sets.contentAnimTime * 1200);
    } else {
      StyleService.setProperty(el, 'display', toggle ? 'block' : 'none');
    }
  
    if (this.sets.arrow) {
      this.updateArrow(activeId, toggle);
    }
  }

  updateArrow(activeId, toggle) {
    let el = IdService.id('arrow-'+activeId, this.shadow);
    let addCl = toggle ? 'arrUp' : 'arrDw';
    StyleService.removeAndAddClass(el, ['arrUp', 'arrDw'], addCl);
  }

  getCommonArrow() {
    return `
      position: absolute;
      right: 20px;
      width: 0; 
      height: 0; 
      top: 50%;
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
    
  showNumber(num) {
    return this.sets.numeration ? '('+num+')' : '';
  }

  showRequired(item) {
    return item.required ? '*' : '';
  }

  showList() {
    let html = '';
    let key = this.sets.multipleAnswers ? 'checkbox-input-group' : 'radio-input-group';
    this.items.forEach((item, index) => {
      let num = this.startNum + (index + 1);
      let answers = JSONService.set(item.answers);
        html += `
          <div id="item-${item.id}" class="item"> 
            <div id="name-${item.id}" class="name">
              ${this.showNumber(num)} ${item.name} ${this.showRequired(item)}
              ${this.showArrow(item.id)}
            </div>
            <div id="content-${item.id}" class="content">
              <${key}
                id="radio-${item.id}"
                sets-id="${this.sets.id}"
                name="radio-${item.id}"
                list='${answers}'
                align="${this.sets.align}"
                value=""
              >
              </${key}>
            </div>
          </div>
        `;
        this.toggleCollapse(item.id, !this.sets.contentHideOnStart);
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
          color: ${this.theme.name.text};
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
          display: ${this.sets.contentHideOnStart ? 'none': 'block'};
          padding: ${pads.content};
          background-color: ${this.theme.content.background};
          transition: height ${this.sets.contentAnimTime}s;
          overflow-y: hidden;
        }
        #error {
          ${styleErrors.commonText}
          padding-left: 4px;
        }
        #notice {
          padding: ${pads.item};
          color: blue;
          font-weight: bold;
        }
      </style>
      <div id="wrapper">
        <div id="${this.list}">
          ${this.showHeadline()}
          ${this.showList()}
        </div>
        <div class="submit">
          <action-button id="reviewer-submit" label="${this.submitLabel}"></action-button>
        </div>
        <div id="notice"></div>
        <div id="error"></div>
      </div>
     ` : '';
  }
}

if ("customElements" in window) {
  customElements.define("reader-reviewer", Reviewer);
}
