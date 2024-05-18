// @ts-nocheck
import { ThemeHelper } from '../../../../theme/theme';
import { IdService } from '../../../../services';
import { ObjectService, NumberService } from '../../../../services/utils';
import { TextEditorSettings, TextEditorSetEnums } from '../sets';
import { MenuButtons } from '../enums';
import { PackIds } from '../../../../theme/enums';

class TextEditorMenu extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.id = this.getAttribute('id') || 'text-editor-menu';
        this.setsId = this.getAttribute('setsId') || TextEditorSetEnums.textEditorPage;
        this.sets = ObjectService.getObject('textSettings', TextEditorSettings[this.setsId]);
        this.theme = ThemeHelper.get([PackIds.textViewer]);
        this.itemBorder = this.getBtnBorder();
    }
    
    connectedCallback() {
        this.render();
        this.$error = IdService.id('error', this.shadow); 
    }

    getBtnBorder() {
        let color = this.theme.menu.item.border;
        if (this.sets.menu.item.randomBorder) {
          let colors = ['orange', 'red', 'green', 'black', 'blue'];
          color = colors[NumberService.randomInteger(0, colors.length - 1)];
        }
        return color;
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
                    label="S" 
                    setsId="${this.setsId}" 
                    btnStyle="${this.itemBorder}"
                > 
                </texteditor-menu-button>
                <texteditor-menu-button 
                    id="${MenuButtons.paragraph.id}" 
                    label="pr"
                    setsId="${this.setsId}"
                    btnStyle="${this.itemBorder}"
                > 
                </texteditor-menu-button>
                &nbsp; | &nbsp;
                <texteditor-menu-button 
                    id="${MenuButtons.bold.id}" 
                    label="b" 
                    setsId="${this.setsId}"
                    btnStyle="${this.itemBorder}"
                > 
                </texteditor-menu-button>
                <texteditor-menu-button 
                    id="${MenuButtons.italic.id}" 
                    label="i" 
                    setsId="${this.setsId}"
                    btnStyle="${this.itemBorder}"
                >
                </texteditor-menu-button>

                <texteditor-menu-button 
                    id="${MenuButtons.tipToggle.id}" 
                    label="tip" 
                    custom-width="36"
                    setsId="${this.setsId}"
                    btnStyle="${this.itemBorder}"
                >
                </texteditor-menu-button>
                <texteditor-menu-button 
                    id="${MenuButtons.preview.id}" 
                    label="preview" 
                    custom-width="64"
                    setsId="${this.setsId}"
                    btnStyle="${this.itemBorder}"
                >
                </texteditor-menu-button>
            <div>
            <div id="error"></div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('texteditor-menu', TextEditorMenu);
}
