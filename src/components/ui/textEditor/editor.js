// @ts-nocheck
import { ThemeHelper } from '../../../theme/theme';
import { CustomEventService, IdService, LoggerService, HTMLService } from '../../../services';
import { NumberService, JSONService } from '../../../services/utils';
import DataStorage from '../../../services/storage';
import { CustomWindowEvents, CustomEvents } from '../../../settings';
import { styleErrors } from '../../../components/common/styles/errors';
import { TextEditorSettings, TextEditorSetEnums } from './sets';
import { BoolEnums } from '../../../enums';
import { ContentSwSides, LabelIcons } from '../contentSw/enums';
import { TextEditorHelper } from './textEditorHelper';
import { PackIds } from '../../../theme/enums';
import { FileSaveEnums, SaveEvts } from './enums';

class TextEditor extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.id = this.getAttribute('id') || 'text-viewer';
        this.files = this.getAttribute('files') || '[]';
        this.setsId = this.getAttribute('setsId') || TextEditorSetEnums.textEditorPage;
        this.sets = TextEditorSettings[this.setsId];
        this.displayLabel = this.sets.displayLabel || BoolEnums.bFalse;
        this.side = this.sets.side || ContentSwSides.right;
        this.currentIndex = 0;
        this.filesAmount = 0;
        this.parseArray = true;
        this.nameId = 'textTitle';
        this.textAreaId = 'textEditor';
        this.contentSwId = 'textContentSw';
        this.sessionId = NumberService.randomInteger(0, 200);
        this.theme = ThemeHelper.get([PackIds.textViewer]);
        this.textObject = { 
            id: '',
            name: '', 
            content: '',
            rows: 0,
            cols: 0
        };

        this.storage = new DataStorage();
        this.setfiles();
    }
    
    connectedCallback() {
        this.render();
        this.$container = IdService.id(this.id, this.shadow);
        this.$loading = IdService.id('loading', this.shadow);
        this.$error = IdService.id('error', this.shadow);
        this.$cntSwitcher = IdService.id(this.contentSwId, this.shadow);
        this.$textName = IdService.id(this.nameId, this.shadow);
        this.$textArea = IdService.id(this.textAreaId, this.shadow);

        this.activateFile(0);
        CustomEventService.event(`${CustomWindowEvents.contentSw.pageClick}-${this.contentSwId}`, (e) => {
            this.currentIndex = e.detail.value;
            this.activateFile(this.currentIndex - 1);
        });

        CustomEventService.event(`${CustomEvents.interaction.textInputChange}-${this.nameId}`, (e) => {
            this.saveFile(SaveEvts.name, e.detail.value);
        });

        CustomEventService.event(`${CustomEvents.interaction.textAreaChange}-${this.textAreaId}`, (e) => {
            this.saveFile(SaveEvts.content, e.detail.value);
        });
    }

    disconnectedCallback() {
        CustomEventService.removeList([
            `${CustomWindowEvents.contentSw.pageClick}-${this.contentSwid}`,
            `${CustomEvents.interaction.textInputChange}-${this.nameId}`,
            `${CustomEvents.interaction.textAreaChange}-${this.textAreaId}`
        ]);
    }

    saveFile(evt, value) {  
        const saved = this.storage.getObject(FileSaveEnums.object);
        TextEditorHelper.saveFile(evt, value, saved, this.textObject, this.sets, this.$error, (savedArray) => {
            this.storage.saveObject(FileSaveEnums.object, savedArray);
            this.updateLabels(savedArray);
        });
    }

    getFileObject(file) {
        const saved = this.storage.getObject(FileSaveEnums.object);
        this.textObject = TextEditorHelper.getFileObject(saved, file);

        this.toggleContentLoaded(false);
        TextEditorHelper.setLoading(NumberService.randomInteger(1, 2), file.name, this.$loading, () => {
            let html = this.setEditor(this.textObject, this.sessionId); 
            HTMLService.html(this.$container, html);
            this.toggleContentLoaded(true); 
        });
    }

    updateLabels(savedArray) {
        let realArray = this.files;
        this.files.forEach((file, index) => {
            if (savedArray[index] && file.id === savedArray[index].id) {
                let name = savedArray[index].name;
                realArray[index].name = name !== '' ? name : file.id;
            }
        });

        const labels = this.getTextLabels(realArray);
        this.$cntSwitcher.setAttribute('labels', labels);
    }

    activateFile(index) {
        if (index < 0 || index > this.filesAmount) {
            LoggerService.error('TextEditor index out of files boundaries');
            HTMLService.text(this.$error, 'Error Index for text file not found');
            return;
        }

        const file = this.files[index];
        this.getFileObject(file);
    }

    toggleContentLoaded(toggle) {
        this.$cntSwitcher.setAttribute('disable-actions', toggle ? BoolEnums.bFalse : BoolEnums.bTrue);
    }

    setfiles() {
        if (this.files) {
            this.files = this.parseArray ? JSONService.getArray(this.files) : this.files;
            this.filesAmount = this.files && this.files.length > 0 ? this.files.length : 0;
        }
    }

    setLabel(title) {
        return this.displayLabel === BoolEnums.bTrue ? `<h2>${title}</h2>` : '';
    }

    setEditor(file, sessionId) {
        return `
            <text-input
                id="${this.nameId}" 
                label="File name"
                class-name="input-normal"
                value="${file.name}"
                type="text"           
            >
            </text-input>
            <text-area-input id="${this.textAreaId}" 
                name="editorView-${sessionId}"
                value="${file.content}"
                rows="${file.rows}" 
                cols="${file.cols}"
            >
            </text-area-input>
        `;
    }

    getTextLabels(files = this.files) {
       return JSONService.set(files.map(file => file.name));
    }

    getTextIcons() {
        return JSONService.set(this.files.map(file => file.icon));
    }

    render() {
        this.shadow.innerHTML = `
            <style>
              .editor-wrapper {
                position: relative;
                background-color: ${this.theme.wrapper.background};
                text-align: center;
              }

              #loading {
                position: absolute;
                text-align: center;
                background-color: ${this.theme.loading.background};
                top: 240px;
                width: 50%;
                heigth: 10px;
                color: ${this.theme.loading.text};
                border: 1px solid ${this.theme.loading.border};
                z-index: 2;
              }

              .loading-content {
                & div {
                    display: inline-block;
                    padding: 0 4px 0 4px;
                    transform: translateY(-26px);
                }
              }

              #error {
                ${styleErrors.commonText}
                padding: 4px;
              }

              #${this.id} {
                border: 1px solid ${this.theme.container.border};
                min-width: 500px;
                min-height: 500px;
              }  
            </style>
            <div class="editor-wrapper">
                <div id="error"></div>
                <div id="loading"></div>
                <content-sw
                  id="${this.contentSwId}"
                  per-page="1" 
                  labels='${this.getTextLabels(this.files)}'
                  side="${this.side}"
                  individual-icons='${this.getTextIcons()}'
                  use-ind-icons="${BoolEnums.bFalse}"
                  icon-type="${LabelIcons.text.id}"
                  total="${this.filesAmount}"
                  disable-actions="${BoolEnums.bFalse}"
                >
                    <div id="${this.id}"> </div>
                </content-sw>
            <div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('text-editor', TextEditor);
}
