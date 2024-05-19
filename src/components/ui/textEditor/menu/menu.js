// @ts-nocheck
import { ThemeHelper } from '../../../../theme/theme';
import { IdService, CustomEventService } from '../../../../services';
import { ObjectService, NumberService } from '../../../../services/utils';
import { TextEditorSettings, TextEditorSetEnums } from '../sets';
import { BoolEnums } from '../../../../enums';
import { PackIds } from '../../../../theme/enums';
import { MenuButtons } from '../enums';
import { CustomMenuEvents } from '../events';

class TextEditorMenu extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.id = this.getAttribute('id') || 'text-editor-menu';
        this.setsId = this.getAttribute('setsId') || TextEditorSetEnums.textEditorPage;
        this.sets = ObjectService.getObject('textSettings', TextEditorSettings[this.setsId]);
        this.theme = ThemeHelper.get([PackIds.textViewer]);
        this.itemBorder = this.getBtnBorder();
        this.swToolTip = false;
    }
    
    connectedCallback() {
        this.render();
        this.$error = IdService.id('error', this.shadow); 

        CustomEventService.event(`${CustomMenuEvents.menuClick}-${MenuButtons.tipToggle.id}`, () => {
            const items = [ 
                IdService.id(MenuButtons.save.id, this.shadow),
                IdService.id(MenuButtons.paragraph.id, this.shadow),
                IdService.id(MenuButtons.bold.id, this.shadow),
                IdService.id(MenuButtons.italic.id, this.shadow),
                IdService.id(MenuButtons.left.id, this.shadow),
                IdService.id(MenuButtons.center.id, this.shadow),
                IdService.id(MenuButtons.right.id, this.shadow),
                IdService.id(MenuButtons.tipToggle.id, this.shadow),
                IdService.id(MenuButtons.preview.id, this.shadow),
            ];

            items.forEach((item) => {
               item.setAttribute('tooltip', this.swToolTip);
            });
            this.toggleToolTip();
        });
    }

    toggleToolTip() {
        this.swToolTip = !this.swToolTip;
    }

    getBtnBorder() {
        let color = this.theme.menu.item.border;
        if (this.sets.menu.item.randomBorder) {
          let colors = ['orange', 'red', 'green', 'black', 'blue'];
          color = colors[NumberService.randomInteger(0, colors.length - 1)];
        }
        return color;
    }

    showPreview() {
        let html = '';
        if (this.sets.menu.previewEnabled) {
            html = `
                <texteditor-menu-button 
                    id="${MenuButtons.preview.id}" 
                    label="preview" 
                    custom-width="64"
                    setsId="${this.setsId}"
                    tooltip="${BoolEnums.bTrue}"
                    btnStyle="${this.itemBorder}"
                >
                </texteditor-menu-button>
            `;
        }
        return html;
    }

    render() {
        this.shadow.innerHTML = `
            <style>
              .menu {
                position: relative;
                display: flex;
                background-color: ${this.theme.menu.background};
                border: 1px dashed black;
                width: 90%;
                height: 32px;
                padding: 4px 10px 16px 10px;
              }
            </style>
            <div id="${this.id}" class="menu">
                <texteditor-menu-button 
                    id="${MenuButtons.save.id}"
                    label="" 
                    hasIcon="${BoolEnums.bTrue}"
                    setsId="${this.setsId}" 
                    tooltip="${BoolEnums.bTrue}"
                    btnStyle="${this.itemBorder}"
                > 
                </texteditor-menu-button>
                <texteditor-menu-button 
                    id="${MenuButtons.paragraph.id}" 
                    label="pr"
                    setsId="${this.setsId}"'
                    tooltip="${BoolEnums.bTrue}"
                    btnStyle="${this.itemBorder}"
                > 
                </texteditor-menu-button>    
                &nbsp; | &nbsp;
                
                <texteditor-menu-button 
                    id="${MenuButtons.bold.id}" 
                    label="" 
                    hasIcon="${BoolEnums.bTrue}"
                    setsId="${this.setsId}"
                    tooltip="${BoolEnums.bTrue}"
                    btnStyle="${this.itemBorder}"
                > 
                </texteditor-menu-button>
                <texteditor-menu-button 
                    id="${MenuButtons.italic.id}" 
                    label="i" 
                    setsId="${this.setsId}"
                    tooltip="${BoolEnums.bTrue}"
                    btnStyle="${this.itemBorder}"
                >
                </texteditor-menu-button>
                <texteditor-menu-button 
                    id="${MenuButtons.left.id}" 
                    label="" 
                    hasIcon="${BoolEnums.bTrue}"
                    setsId="${this.setsId}"
                    tooltip="${BoolEnums.bTrue}"
                    btnStyle="${this.itemBorder}"
                >
                </texteditor-menu-button>
                <texteditor-menu-button 
                    id="${MenuButtons.center.id}" 
                    label="" 
                    hasIcon="${BoolEnums.bTrue}"
                    setsId="${this.setsId}"
                    tooltip="${BoolEnums.bTrue}"
                    btnStyle="${this.itemBorder}"
                 >
                </texteditor-menu-button>
                <texteditor-menu-button 
                    id="${MenuButtons.right.id}" 
                    label="" 
                    hasIcon="${BoolEnums.bTrue}"
                    setsId="${this.setsId}"
                    tooltip="${BoolEnums.bTrue}"
                    btnStyle="${this.itemBorder}"
                 >
                </texteditor-menu-button>
                
                <texteditor-menu-button 
                    id="${MenuButtons.tipToggle.id}" 
                    label="tip" 
                    custom-width="36"
                    setsId="${this.setsId}"
                    tooltip="${BoolEnums.bTrue}"
                    btnStyle="${this.itemBorder}"
                >
                </texteditor-menu-button>
                ${this.showPreview()}
            <div>
            <div id="error"></div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('texteditor-menu', TextEditorMenu);
}
