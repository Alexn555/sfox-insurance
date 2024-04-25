// @ts-nocheck
import { CustomWindowEvents } from '../../settings';
import { GeneralNoteCodes, GeneralNoteEnums } from '../../enums';
import { styleErrors } from '../common/styles/errors';
import { IdService, CustomEventService, ClassIdService } from '../../services';
import { errorIcon } from '../common/styles/statusIcons/status';

class GeneralNote extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.id = this.getAttribute('id') || 'generalNote';
      this.closeBtn = 'close';
      this.size = '';
      this.text = '';
      this.status = '';
      this.code = '';
      this.recipe = '';
      this.useBack = '0';
      this.container = this.id;
      this.sizes = {w: 42, wUnits: '%', h: 100 };
    }
  
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {
      this.$container = IdService.id(this.container, this.shadow);
      this.$close = IdService.idAndClick(this.closeBtn, this.shadow, this.close.bind(this));

      CustomEventService.event(CustomWindowEvents.generalNote.open, (e) => {
        this.setProps(e.detail?.value);

        this.toggleStatusCl(this.status);
        this.toggleInfo();
        this.setCustomSize(); 
        this.setCloseVis();
        this.$container.showModal();
      });
      CustomEventService.event(CustomWindowEvents.generalNote.close, () => {
        this.$container?.close();
      });
    }

    setProps(rowProps = '') {
      const props = JSON.parse(rowProps);
      this.status = props.status;
      this.code = props.code;
      this.text = props.text;
      this.size = props.size;
      this.recipe = props.recipe;
      this.useBack = props.useBack;
    }

    disconnectedCallback() {
      if (this.$elBtn && this.$close) {
        IdService.removeList([this.$elBtn, this.$close]);
      }
    }

    setCustomSize() {
      if (this.size !== '') {
        const sizes = JSON.parse(this.size);
        const { w, wUnits, h } = sizes;
        this.$container.style.width = `${w}${wUnits}`;
        this.$container.style.height = `${h}px`;
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

    setCloseVis() {
      const el = ClassIdService.id(this.closeBtn, this.shadow);
      el.style.opacity = '1';
      if (this.code === GeneralNoteCodes.networkLost) {
        el.style.opacity = '0';
      }
    }

    render() {
      this.shadow.innerHTML = `
          <style>
            ${errorIcon(22, 22)}

            #${this.container} {
              background-color: #f2f2f2;
              width: ${this.sizes.w}${this.sizes.wUnits};
              height: ${this.sizes.h}px;
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
              <action-button id="${this.closeBtn}" label="Close" type="action" />
            </div>
            <div id="status" class="error"></div>
          </dialog>
       `;
    }
}
  
if ("customElements" in window) {
  customElements.define("general-note", GeneralNote);
}