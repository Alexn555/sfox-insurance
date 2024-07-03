// @ts-nocheck
import { CustomEvents } from '../../settings';
import { DirectionAlignment } from '../../enums';
import { IdService, CustomEventService, LoggerService } from '../../services';
import { JSONService } from '../../services/utils';
import { radioGroupSets } from './sets/radioGroup';

class RadioInputGroup extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.id = this.getAttribute('id') || 'text-id';
    this.setsId = this.getAttribute('sets-id') || 'common';
    this.name = this.getAttribute('name') || this.id;
    this.legend = this.getAttribute('legend') || '';
    this.list = this.getAttribute('list') || '';
    this.align = this.getAttribute('align') || DirectionAlignment.row;
    this.value = this.getAttribute('value') || '';
    this.sets = radioGroupSets[this.setsId];
    this.useRadioCmp = false;
  }

  connectedCallback() {
    this.initList();
    this.render();
    this.initRadios();
  }

  initRadios() {
    if (this.list && this.list.length > 0) {
      for (let i = 0, l = this.list.length; i < l; i++) {
        let el = IdService.id(this.id+'-'+i, this.shadow);
        el.onchange = (() => {
            CustomEventService.send(`${CustomEvents.interaction.radioGroupChange}-${this.name}`, el.value);
        }); 
      }
    } else {
      LoggerService.warn(`RadioGroup with id ${this.id} does not have options`);
    }
  }

  initList() {
    this.list = JSONService.getArray(this.list);
  }

  showList() {
    let html = '';
    this.list.forEach((item, index) => {
      if (this.useRadioCmp) {
        html += `<radio-input id="${this.id}-${index}"
          label="${item.label}" 
          name='${this.name}" 
          value="${item.val}"></radio-input>`;
      } else {
        html += `
          <div>
            <input type="radio" id="${this.id}-${index}" name="${this.name}" value="${item.val}" />
            <label for="${this.id}">${item.label}</label>
          </div>
        `;
      }
    });
    return html;
  }

  getBorder() {
    return this.align === DirectionAlignment.row ? this.sets.item.border : this.sets.item.borderColumn;
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        input {
          padding: ${this.sets.input};
        } 
        .list {
          display: flex;
          flex-direction: ${this.align};

          & div {
            padding: ${this.sets.item.padding};
            border: ${this.getBorder()};
          }
        }
      </style>               
       <fieldset>
          <legend>${this.legend}</legend>
          <div class="list">
            ${this.showList()}
          </div>
        </fieldset>
    `;
  }
}

if ("customElements" in window) {
  customElements.define("radio-input-group", RadioInputGroup);
}
