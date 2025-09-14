// @ts-nocheck
import { ThemeHelper } from '../../../theme/theme';
import ScreenQuery from '../../../styles/query';
import { CustomWindowEvents } from '../../../settings';
import { GeneralNoteCodes, GeneralNoteEnums } from './enums';
import { styleErrors } from '../../common/styles/errors';
import { PackIds } from '../../../theme/enums';
import { IdService, CustomEventService, StyleService, HTMLService } from '../../../services';
import { JSONService } from '../../../services/utils';
import { RenderService } from '../../../services/helpers';
import { errorIcon } from '../../common/styles/statusIcons/status';

class GeneralNote extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.id = this.getAttribute('id') || 'generalNote';
      this.closeBtn = 'close';
      this.theme = ThemeHelper.get(PackIds.generalNote);
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
        RenderService.modal(this.$container, 500);
      });
      CustomEventService.event(CustomWindowEvents.generalNote.close, () => {
        this.$container?.close();
      });
    }

    setProps(rowProps = '') {
      let props = JSONService.getObj(rowProps);
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
        let sizes = JSONService.getObj(this.size);
        let { w, wUnits, h } = sizes;
        StyleService.setProperties(this.$container, [
          { property: 'width', value: `${w}${wUnits}` },
          { property: 'height', value: `${h}px` },
        ])
      }
    }

    setStatusIcon(status) {
      return `<i class="icon icon-${status}"> </i>`;
    }

    toggleInfo() {
      let el = IdService.id('status', this.shadow);
      if (el) {
        HTMLService.html(el, `
          ${this.setStatusIcon(this.status)}
          <span class="message">${this.text}</span>
        `);
      }
    }

    toggleStatusCl(status) {
      let el = IdService.id('status', this.shadow);
      if (el) {
        StyleService.removeAndAddClass(el, ['error', 'success'], status);
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
      let el = IdService.id(this.closeBtn, this.shadow);
      let opacity = this.code === GeneralNoteCodes.networkLost ? '0' : '1';
      StyleService.setProperty(el, 'opacity', opacity);
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
              color: ${this.theme.error} !important;
            }

            .success {
              color: ${this.theme.success} !important;
            }

            .close {
              text-align: right;
            }

            ${ScreenQuery.mobile(`
              #${this.container} {
                width: 90%;
                height: 120px;
              }
            `)}

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