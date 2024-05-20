// @ts-nocheck
import { ThemeHelper } from '../../../../theme/theme';
import { CustomEventService, IdService, StyleService } from '../../../../services';
import { ObjectService } from '../../../../services/utils';
import { PackIds } from '../../../../theme/enums';
import { BoolEnums } from '../../../../enums';
import { TextEditorSettings, TextEditorSetEnums } from '../sets';
import { CustomMenuEvents } from '../events';
import { MenuButtons } from '../enums';
import { MenuIcons } from '../icons';

class TxEditorMenuButton extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.id = this.getAttribute('id') || 'menu-button';
        this.label = this.getAttribute('label') || '';
        this.customWidth = this.getAttribute('custom-width') || '24';
        this.swToolTip = this.getAttribute('tooltip') || BoolEnums.bTrue;
        this.hasIcon = this.getAttribute('hasIcon') || BoolEnums.bFalse;
        this.setsId = this.getAttribute('setsId') || TextEditorSetEnums.textEditorPage;
        this.theme = ThemeHelper.get([PackIds.textViewer]);
        this.toolTipId = 'tooltip';
        this.sets = ObjectService.getObject('textSettings', TextEditorSettings[this.setsId]);
        this.btnStyle = this.getAttribute('btnStyle') || this.theme.menu.itemBorder;
        this.tip = MenuButtons[this.id].tip;
        this.icon = '';
    }

    static get observedAttributes() { 
        return ['tooltip', 'mode']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.$toolTip && name === 'tooltip' && this.sets.menu.item.tooltip) {
           this.toggleToolTip(newValue);
        } 
        if (name === 'mode' && this.id === MenuButtons.preview.id) {
            this.toggleMode(newValue);
        }
    }
    
    connectedCallback() {
        this.render();
        this.$toolTip = IdService.id(this.toolTipId, this.shadow);
        this.$button = IdService.idAndClick(this.id, this.shadow, () => {
            CustomEventService.send(`${CustomMenuEvents.menuClick}-${this.id}`);
        });
        if (!this.sets.menu.item.tooltip) {
            StyleService.setDisplay(this.$toolTip, false)
        }
        this.setIcon();
    }

    disconnectedCallback() {
        CustomEventService.removeListener(`${CustomMenuEvents.menuClick}-${this.id}`);
    }

    toggleToolTip(newValue) {
        let toggle = newValue === 'true' ? true : false;
        StyleService.setDisplay(this.$toolTip, toggle);
        if (this.id === MenuButtons.tipToggle.id && this.sets.menu.tipToggleHighlight) {
           let thm = this.theme.menu.item;
           let color = toggle ? thm.bckActive : thm.bck;
           StyleService.setProperty(this.$button, 'backgroundColor', color);
        }
    }

    toggleMode(newValue) {
        let el = IdService.id('label', this.shadow);
        el.innerHTML = newValue === 'false' ? 'preview' : 'edit';
    }

    setIcon() {
        if (this.hasIcon === BoolEnums.bTrue) {
            this.icon = MenuIcons[this.id].source;
            this.icon = this.icon ? this.icon: '';
            StyleService.setProperty(this.$button, 'backgroundImage', `url("${this.icon}")`);
        }
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
                background-repeat: no-repeat;
                background-size: contain;
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
                <span id="label">${this.label}</span>
                <span id="${this.toolTipId}" class="tooltip">${this.tip}</span>
            <div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('texteditor-menu-button', TxEditorMenuButton);
}
