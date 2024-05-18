// @ts-nocheck
import { ThemeHelper } from '../../../../theme/theme';
import { CustomEventService, IdService } from '../../../../services';
import { ObjectService } from '../../../../services/utils';
import { PackIds } from '../../../../theme/enums';
import { TextEditorSettings, TextEditorSetEnums } from '../sets';
import { CustomMenuEvents } from '../events';
import { MenuButtons } from '../enums';

class TxEditorMenuButton extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.id = this.getAttribute('id') || 'text-editor-menu';
        this.label = this.getAttribute('label') || '';
        this.customWidth = this.getAttribute('custom-width') || '24';
        this.setsId = this.getAttribute('setsId') || TextEditorSetEnums.textEditorPage;
        this.theme = ThemeHelper.get([PackIds.textViewer]);
        this.sets = ObjectService.getObject('textSettings', TextEditorSettings[this.setsId]);
        this.btnStyle = this.getAttribute('btnStyle') || this.theme.menu.itemBorder;
        this.tip = MenuButtons[this.id].tip;
        this.icon = '';
    }
    
    connectedCallback() {
        this.render();
        this.$button = IdService.idAndClick(this.id, this.shadow, () => {
            CustomEventService.send(`${CustomMenuEvents.menuClick}-${this.id}`);
        });
    }

    disconnectedCallback() {
        CustomEventService.removeListener(`${CustomMenuEvents.menuClick}-${this.id}`);
    }

    setToolTip(theme) {
        let css = '';
        if (this.sets.menu.item.tooltip) {
            css = `
                & .tooltip {
                    visibility: hidden;
                    width: 160px;
                    background-color: ${theme.tipBg};
                    color: ${theme.tipText};
                    text-align: center;
                    padding: 10px 0;
                    border-radius: 6px;
                    position: absolute;
                    top: 30px;
                    z-index: 1;
                }

                &:hover .tooltip {
                    visibility: visible;
                }
            `;
        }
        return css;
    }

    render() {
        let thm = this.theme.menu.item;
        this.shadow.innerHTML = `
            <style>
              .button {
                position: relative;
                background-color: ${thm.bck};
                text-align: center;
                border: 1px solid ${this.btnStyle};
                width: ${this.customWidth}px;
                height: 24px;
                padding: 4px;
                margin: 4px;
                line-height: 24px;
                cursor: ${this.sets.menu.item.cursor};
                user-select: none;

                ${this.setToolTip(thm)}
              }
            </style>
            <div id="${this.id}" class="button">
                ${this.label}
                <span class="tooltip">${this.tip}</span>
            <div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('texteditor-menu-button', TxEditorMenuButton);
}
