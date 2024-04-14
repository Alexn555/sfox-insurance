// @ts-nocheck
import { theme, changeTheme } from '../theme/theme';
import { Animations, PageStructure, CustomEvents, SEO, SettingsBoard } from '../settings';
import { SaveObjects } from '../components/common/saves';
import { StyleService } from '../services';
import { getVersionFromPackage } from '../services/utils';
import DataStorage from '../services/storage';

class Application extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        document.addEventListener(CustomEvents.settings.themeChanged, this.settingsChanged.bind(this));
        document.addEventListener(CustomEvents.settings.toggle, this.toggleSettings.bind(this));
        this.dataStorage = new DataStorage();
        this.setTitle();
        this.isInit = true;
        setTimeout(() => { this.isInit = false; }, 3000);
    }
    
    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        document.removeEventListener(CustomEvents.settings.themeChanged, null);
        document.removeEventListener(CustomEvents.settings.toggle, null);
    }

    setTitle() {
        const pckData = require('../../package.json');
        const titleEl = document.querySelector('title');
        titleEl.innerHTML = `${SEO.application} R${getVersionFromPackage(pckData.version)}`;
    }

    settingsChanged(evt) {
        changeTheme(evt.detail.value);
        setTimeout(() => {
            this.render();
        }, 500);
    }

     toggleSettings(evt) {
        const el = this.shadow.querySelector('.settings');
        if (this.isInit && this.dataStorage.getItem(SaveObjects.settings.close) === '1') {
           StyleService.setDisplay(el, false);
           return;
        }

        const { value } = evt.detail;
        setTimeout(() => {
            StyleService.setDisplay(el, !value);
        }, Animations.topSettings * 1000);
    }

    showSettings() {
        if (SettingsBoard.board.enabled) {
            return `  
                <div class="settings">
                    <main-settings> </main-settings>
                </div>
            `;
        }
        return '';
    }

    render() {
        const stngsHeight = PageStructure.settings.height;
        this.shadow.innerHTML = `
            <style>
                .application {
                    width: 100vw;
                    background-color: ${theme.layout.background};
                    overflow-x: hidden;
                }
                .settings {
                    height: ${stngsHeight}px;
                    z-index: 6;

                    @media (max-width: 768px) {
                        height: ${stngsHeight + 120}px;
                    }   
                }
                .layout {
                    z-index: 7;
                }
            </style>
            <div class="application">
                <notice-disclaimer></notice-disclaimer>
                ${this.showSettings()}
                <div class="layout">
                    <main-layout></main-layout>
                </div>
            </div> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('main-application', Application);
}
