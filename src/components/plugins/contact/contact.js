// @ts-nocheck
import { BoolEnums } from '../../../enums';
import { ThemeHelper } from '../../../theme/theme';
import { PackIds } from '../../../theme/enums';
import { CustomEvents } from '../../../settings';
import { styleErrors } from '../../common/styles/errors';
import { HTMLService, IdService, StyleService, CustomEventService } from '../../../services';
import { SettingsChecker } from '../../../services/helpers/settingsChecker';
import { ContactSets, ContactIds } from './sets';
import { ContactHelper } from './contactHelper';
import { saveEvts } from './enums';

class ContactForm extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
    this.id = this.getAttribute('id') || 'common';
    this.headline = this.getAttribute('headline') || '';
    this.nameRequired = this.getAttribute('name-required') || BoolEnums.bFalse;
    this.btnLabel = this.getAttribute('button-label') || 'Send';
    this.theme = ThemeHelper.get([PackIds.contactForm]);
    this.sets = SettingsChecker.getId(this.id, ContactIds, ContactSets);
    this.form = {
      name: this.id + '-name',
      email: this.id + '-email',
      message: this.id + '-message',
    };
    this.saveObj = {
      name: this.nameRequired ? '' : 'anonymous',
      email: '',
      message: ''
    };
    this.updateForm();
  }

  connectedCallback() {
    this.render();
    this.initForm();
  }

  disconnectedCallback() { 
    IdService.removeList([this.$submit]);
    CustomEventService.removeList([
      `${CustomEvents.interaction.textInputChange}-${this.form.name}`
      `${CustomEvents.interaction.textInputChange}-${this.form.email}`,
      `${CustomEvents.interaction.textAreaChange}-${this.form.message}`
    ]);
  }

  initForm() {
    this.initForm();
  }

  initForm() {
    this.$name = IdService.id(this.form.name, this.shadow);
    this.$email = IdService.id(this.form.email, this.shadow);
    this.$message = IdService.id(this.form.message, this.shadow);
    this.$msgCounter = IdService.id('msgCounter', this.shadow);
    this.$notice = IdService.id('notice', this.shadow);
    this.$submit = IdService.idAndClick('contact-submit', this.shadow, this.submitForm.bind(this));
  }

  updateForm() {
    CustomEventService.event(`${CustomEvents.interaction.textInputChange}-${this.form.name}`, (e) => {
      this.saveForm(saveEvts.name, e.detail.value);
    });
    CustomEventService.event(`${CustomEvents.interaction.textInputChange}-${this.form.email}`, (e) => {
      this.saveForm(saveEvts.email, e.detail.value);
    });
    CustomEventService.event(`${CustomEvents.interaction.textAreaChange}-${this.form.message}`, (e) => {
      this.saveForm(saveEvts.message, e.detail.value);
    });
  }

  saveForm(key, val) {
    this.saveObj[key] = val;
    let { nameMax, emailMax, messageMax } = this.sets.fields;
    if (key === saveEvts.name && val && val.length > nameMax) {
      ContactHelper.showError(this.$notice, `Name field cannot be more than ${nameMax} width`);
    }
    if (key === saveEvts.email && val && val.length > emailMax) {
      ContactHelper.showError(this.$notice, `Email field cannot be more than ${emailMax} width`);
    }
    if (key === saveEvts.message && val) {
      ContactHelper.updateMsgCounter(this.$msgCounter, val.length, messageMax);
      if (val.length > messageMax) {
        ContactHelper.showError(this.$notice, `Message field cannot be more than ${messageMax} width`);
      }
    }
  }

  resetForm() {
    if (this.sets.resetForm) {
      this.$name.setAttribute('value', '');
      this.$email.setAttribute('value', '');
      this.$message.setAttribute('value', '');
      this.saveObj.email = '';
      this.saveObj.message = '';
    }
  }

  submitForm() {
    let isValid = ContactHelper.validateFields(this.saveObj, this.sets.validateEmail);
    let msg = '';
    StyleService.toggleClass(this.$notice, 'error', !isValid);
    if (isValid) {
      msg = 'All ok, field validated, demo message not send! :) ';
      setTimeout(() => { this.resetForm(); }, this.sets.message.timeout * 1200);
    } else {
      msg = 'Some fields are missing';
    }
    HTMLService.html(this.$notice, msg);
    setTimeout(() => {
      HTMLService.html(this.$notice, ''); 
    }, this.sets.message.timeout * 1000);
  }

  showHeadline() {
    return this.headline ? `<div class="headline">${this.headline}</div>` : '';
  }

  showName() {
    return this.nameRequired === BoolEnums.bTrue ? `
      <div class="name">
        <text-input
          id="${this.form.name}" 
          label="Name"
          class-name="input-normal"
          value=""
          type="text"           
        >
        </text-input>
      </div>
    ` : '';
  }

  showEmail() {
    return `
      <div class="email">
        <text-input
          id="${this.form.email}" 
          label="Email"
          class-name="input-normal"
          value=""
          type="text"           
        >
        </text-input>
      </div>
    `;
  }

  showForm() {
    let html = `
      <div id="item" class="item">
        <form> 
          ${this.showName()}
          ${this.showEmail()}
          <div class="message">
            ${ContactHelper.showMsgCounter('msgCounter',
              this.saveObj.message.length, 
              this.sets.messageCounter, 
              this.sets.fields.messageMax)}
            <text-area-input
              id="${this.form.message}"
              name="${this.form.message}"
              value=""
              rows="${this.sets.message.rows}" 
              cols="${this.sets.message.cols}"
            >
            </text-area-input>    
          </div>
          <div class="submit">
            <action-button id="contact-submit" label="${this.btnLabel}"></action-button>
          </div>
          <div id="notice"></div>
        </form>
        </div>
    `;    
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
        .message {
          padding: ${pads.content};
          background-color: ${this.theme.content.background};
        }
        #notice {
          padding: ${pads.item};
          color: blue;
          font-weight: bold;
        }
        .error {
          ${styleErrors.commonTextHigh};    
          padding: ${pads.item}; 
        }
      </style>
      <div id="wrapper">
        <div id="${this.list}">
          ${this.showHeadline()}
          ${this.showForm()}
        </div>   
      </div>
     ` : '';
  }
}

if ("customElements" in window) {
  customElements.define("contact-form", ContactForm);
}
