// @ts-nocheck
import { CustomWindowEvents } from '../../settings';
import { GeneralNoteEnums } from '../../enums';
import { styleErrors } from '../common/styles/errors';
import { IdService, CustomEventService } from '../../services';
import { errorIcon } from '../common/styles/statusIcons/status';

class GeneralNote extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.id = this.getAttribute('id') || 'errorNote';
      this.text = this.getAttribute('text') || '';
      this.status = this.getAttribute('status') || '';
      this.code = this.getAttribute('code') || '';
      this.recipe = this.getAttribute('recipe') || '';
      this.useBack = this.getAttribute('use-back') || '0';
      this.container = this.id;
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {
      this.$elBtn = IdService.idAndClick('close', this.shadow, this.toggleInfo.bind(this));
      this.$container = IdService.id(this.container, this.shadow);

      this.$close = IdService.idAndClick('close', this.shadow, this.close.bind(this));

      CustomEventService.event(CustomWindowEvents.generalNote.open, (e) => {
        this.text = e.detail?.value || this.text;
        this.toggleInfo();
        this.$container.showModal();
      });

      CustomEventService.event(CustomWindowEvents.generalNote.close, () => {
        this.$container?.close();
      });
    }

    disconnectedCallback() {
      if (this.$elBtn && this.$close) {
        IdService.removeList([this.$elBtn, this.$close]);
      }
    }

    static get observedAttributes() { 
      return ['text', 'status']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'text' && oldValue !== newValue) {
        this.text = newValue;
      }
      if (name === 'status' && oldValue !== newValue) {
        this.status = newValue;
        this.toggleStatusCl(this.status);
        this.toggleInfo();
      }
    }

    setStatusIcon(status) {
      return `<i class="icon icon-${status}"> </i>`;
    }

    toggleInfo() {
      const el = IdService.id('status', this.shadow);
      if (el) {
        el.innerHTML = `
          ${this.setStatusIcon(this.status)}
          <span class="message">${this.text}</span>
        `;
      }
    }

    toggleStatusCl(status) {
      const el = IdService.id('status', this.shadow);
      if (el) {
        el.classList.remove('error');
        el.classList.remove('success');
        el.classList.add(status);
      }
    }

    close() {
      this.$container?.close();
      if (this.useBack === GeneralNoteEnums.useBack.open) {
        CustomEventService.send(CustomWindowEvents.generalNote.close, this.code);
      }
      if (this.recipe === GeneralNoteEnums.recipes.reload) {
        location.reload();
      }
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            ${errorIcon(22, 22)}

            #${this.container} {
              width: 42%;
              background-color: #f2f2f2;
              height: 120px;
            }

            .message {
              padding-left: 2px;
            }

            #status {
              padding-top: 10px;
              ${styleErrors.commonText};
            }

            .error {
              color: red !important;
            }

            .success {
              color: green !important;
            }

            .close {
              text-align: right;
            }

            @media (max-width: 768px) {
              #${this.container} {
                width: 90%;
                height: 120px;
              }
            }
          </style>
          <dialog id="${this.container}">
            <div class="close">
              <action-button id="close" label="Close" type="action" />
            </div>
            <div id="status" class="error"></div>
          </dialog>
       `;
    }
}
  
if ("customElements" in window) {
  customElements.define("general-note", GeneralNote);
}