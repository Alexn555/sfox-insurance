// @ts-nocheck
import { CustomEvents, CustomWindowEvents } from '../../settings';
import { CustomEventService, IdService, LoggerService, StyleService } from '../../services';
import { JSONService, MobileService } from '../../services/utils';

class IconSelect extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'closed' });
      this.id = this.getAttribute('id') || 'select-id';
      this.source = this.getAttribute('source') || '';
      this.items = this.getAttribute('items') || '[]';
      this.deskColumns = this.getAttribute('columns-md') || 1;
      this.mobColumns = this.getAttribute('columns-xs') || 1;
      this.styles = {
        columns: 1,
        width: 100
      };
      this.$icons = [];
      this.$iconEls = [];
      this.mounted = false;
      this.selected = '';
    }

    connectedCallback() {
      this.initColumnStyles();
      this.render();
      this.initForm();
    }

    disconnectedCallback() {
      this.toggleMount(false);
      CustomEventService.removeList([`${CustomEvents.interaction.selectChange}-${this.id}`]);
      if (this.$iconEls && this.$iconEls.length > 0) {
        IdService.removeList(this.$iconEls);
      }
      IdService.remove(this.$close);
    }

    initForm() {
        this.$iconSelect = IdService.id('iconSelect', this.shadow);
        CustomEventService.event(CustomWindowEvents.iconSelect.open, () => {
            this.$iconSelect.showModal();
            this.setIcons();
        });

        this.$close = IdService.idAndClick('close', this.shadow, () => {
            this.$iconSelect?.close();
            CustomEventService.send(CustomWindowEvents.iconSelect.close);
        });
    }

    initColumnStyles() {
        this.styles.columns = MobileService.isMobile() ? this.mobColumns : this.deskColumns;
        this.styles.width = this.styles.columns > 1 ? 400 : 160;
    }

    setIcons() {
        if (!this.mounted) {
            const icons = JSONService.getArray(this.items);
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
        this.toggleMount(true);
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

    toggleMount(toggle) {
        this.mounted = toggle;
    }

    showSelected(icon) {
        if (this.$icons && this.$icons.length > 0) {
            this.$iconEls.forEach((iconEl, index) => {
                StyleService.toggleClass(iconEl, 'selected', false);
                if (this.$icons[index] === icon) {
                   StyleService.toggleClass(iconEl, 'selected', true);
                }
            });
        }
    }
    
    render() {
        this.shadow.innerHTML = `
            <style>
                dialog#iconSelect {  
                    padding: 10px;
                    width: ${this.styles.width}px;
                    border: 1px dashed grey;
                }
                #icons {
                    display: grid;
                    width: 90%:
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-template-columns: repeat(${this.styles.columns}, 120px);

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
  