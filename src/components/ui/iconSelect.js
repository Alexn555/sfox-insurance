// @ts-nocheck
import { CustomEvents, CustomWindowEvents } from '../../settings';
import { CustomEventService, IdService, LoggerService } from '../../services';

class IconSelect extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.id = this.getAttribute('id') || 'select-id';
      this.source = this.getAttribute('source') || '';
      this.items = this.getAttribute('items') || '[]';
      this.$icons = [];
      this.$iconEls = [];
      this.selected = '';
    }

    connectedCallback() {
      this.render();
      this.initForm();
    }

    disconnectedCallback() {
      IdService.removeCustomEvents([`${CustomEvents.interaction.selectChange}-${this.id}`]);
      if (this.$iconEls && this.$iconEls.length > 0) {
        IdService.removeList(this.$iconEls);
      }
      IdService.remove(this.$close);
    }

    initForm() {
        this.$iconSelect = IdService.id('iconSelect', this.shadow);
        IdService.customEvent(CustomWindowEvents.iconSelect.open, () => {
            this.$iconSelect.showModal();
            this.setIcons();
        });

        this.$close = IdService.idAndClick('close', this.shadow, () => {
            this.$iconSelect?.close();
            CustomEventService.send(CustomWindowEvents.iconSelect.close);
        });
    }

    setIcons() {
        const icons = JSON.parse(this.items);
        let html = '';

        icons.forEach((icon, index) => {
            html += `<div id="icon-${icon}" class="icon-selection">
                        <img src="${this.source}${icon}.png" />
                        <span>${icon}</span>
                    </div>`;
            this.$icons.push(`icon-${icon}`);
            this.$iconEls[index] = IdService.id(`icon-${icon}`, this.shadow);
        });
        const el = IdService.id('icons', this.shadow);
        if (el) {
            el.innerHTML = html;
            this.setIconHandlers();
        } else {
            LoggerService.warn('Icons holder not found');
        }
    }

    setIconHandlers() {
        if (this.$icons && this.$icons.length > 0) {
            this.$icons.forEach((icon, index) => {
                this.$iconEls[index] = IdService.idAndClick(icon, this.shadow, () => {
                    CustomEventService.send(`${CustomEvents.interaction.selectChange}-${this.id}`, icon);
                    this.selected = icon;
                    this.showSelected(icon);
                });
            });
        }
    }

    showSelected(icon) {
        if (this.$icons && this.$icons.length > 0) {
            this.$iconEls.forEach((iconEl, index) => {
                iconEl.classList.remove('selected');
                if (this.$icons[index] === icon) {
                    iconEl.classList.add('selected');
                }
            });
        }
    }
    
    render() {
        this.shadow.innerHTML = `
            <style>
                dialog#iconSelect {  
                    padding: 10px;
                    border: 1px dashed grey;
                }
                #icons {
                    display: grid;
                    width: 90%:
                    grid-template-columns: repeat(4, 20%);

                    & div {
                        padding: 8px;
                        height: 40px;
                        
                        & img {
                            object-fit: contain;
                            max-width: 100%;
                            max-height: 100%;
                            width: auto;
                            height: auto;
                        }
                    }
                }
                .icon-selection {
                    cursor: pointer;
                }
                .close-section {
                    padding-bottom: 8px;
                }
                .selected {
                    border: 1px solid black;
                }
            </style>
            <dialog id="iconSelect">
                <div class="close-section">
                    <action-button id="close" label="Close" type="action"></action-button>
                </div>
                <div id="icons"></div>
            </dialog>
        `;
    }
}

if ("customElements" in window) {
    customElements.define("icon-select", IconSelect);
}
  