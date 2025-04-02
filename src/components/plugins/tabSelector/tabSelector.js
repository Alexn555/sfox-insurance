// @ts-nocheck
import { IdService, StyleService } from '../../../services';
import commonTabStyle from '../../../pages/common/tabsStyle';
import { theme } from '../../../theme/theme';
import { JSONService } from '../../../services/utils';
import { LinkTypes, LinkVariants } from '../../../components/common/ui';
import ScreenQuery from '../../../styles/query';

class TabSelector extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.theme = JSONService.getObj(this.getAttribute('theme')) ;
        this.id = this.getAttribute('id') || '1';
        let stls = this.getAttribute('stls') || '';
        let menu = this.getAttribute('menu');
        let slots = this.getAttribute('slots');
        this.openIndex = 0;
        this.stls = stls === '' ? JSONService.getObj(stls) : {};
        this.menu = JSONService.getArray(menu);
        this.slots = JSONService.getArray(slots);
        this.$menuBtns = [];
    }
    
    connectedCallback() {
        let menuHTML = '';
        for (let j = 0, lj = this.menu.length; j < lj; j++) {
            if (!this.menu[j].sideBtn) {
                menuHTML += '<button id="'+ this.menu[j].id+'">'+this.menu[j].label+'</button>';
            } else {
                menuHTML += `<div class="sidemenu">
                    <action-link 
                        id="${this.menu[j].id}"
                        label="${this.menu[j].label}" 
                        type="${LinkTypes.transparentButton}"
                        variant="${LinkVariants.thinText}"> 
                    </action-link>
                </div>`;
            }
        }
        let slotHTML = '';
        for (let i = 0, l = this.slots.length; i < l; i++) {
            slotHTML += '<div id="tabp-'+this.slots[i].id+'"><slot name='+this.slots[i].name+'></slot></div>';
        }

        this.shadow.innerHTML = `
            <style>
                ${commonTabStyle(this.theme)}

                .tab-wrapper {
                    position: relative;
                    width: ${this.stls.width ?? '100%'};
                    min-height: ${this.stls.height ?? '200px'};
                    padding: ${this.stls.padding ?? '6px 12px'};
                    margin: ${this.stls.margin ?? 0};
                    background-color: white;

                    ${ScreenQuery.mobile(`
                        width: ${this.stls.mWidth ?? '100%'};
                    `)}
                }

                .sidemenu {
                    position: absolute;
                    top: 6px;
                    right: 100px;

                    ${ScreenQuery.mobile(`
                        top: 42px;
                        right: 100px;
                    `)}
                }
            </style>
            <div id="page-selector-${this.id}" class="tab-wrapper">
                <div id="tab-menu-${this.id}" class="tab">
                    ${menuHTML}
                </div>
                ${slotHTML}
            </div>
        `;

        let tabs = [];
        for (let j = 0, lj = this.slots.length; j < lj; j++) {
            tabs[j] = IdService.id('tabp-'+this.slots[j].id, this.shadow);
        }
        for (let m = this.openIndex + 1, lm = this.slots.length; m < lm; m++) {
            StyleService.setDisplay(tabs[m], false);
        }
        for (let c = 0, lc = this.menu.length; c < lc; c++) {
            this.$menuBtns[c] = IdService.idAndClick(this.menu[c].id, this.shadow, () => {
                this.openTab(tabs[c], tabs);
            });
        }
    }

    disconnectedCallback() {
        IdService.removeList(this.$menuBtns);
    }

    openTab(selected, $tabs) {
        StyleService.setDisplayMultiple($tabs, false);
        StyleService.setDisplay(selected, true);
    }
}

if ('customElements' in window) {
    customElements.define('tab-selector', TabSelector);
}
