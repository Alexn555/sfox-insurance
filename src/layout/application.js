// @ts-nocheck
import { theme, changeTheme } from '../theme/theme';
import ScreenQuery from '../styles/query';
import { Animations, PageStructure, CustomEvents, SEO,
     SettingsBoard, NetworkCheckerSet } from '../settings';
import { ImageViewerIds } from '../settings/ui';
import { SaveObjects } from '../components/common/saves';
import { ClassIdService, CustomEventService, StyleService, HTMLService } from '../services';
import { StringService } from '../services/utils';
import DataStorage from '../services/storage';
import { BoolEnums } from '../enums';

class Application extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});

        CustomEventService.event(CustomEvents.settings.themeChanged, this.settingsChanged.bind(this), document);
        CustomEventService.event(CustomEvents.settings.toggle, this.toggleSettings.bind(this), document);

        this.dataStorage = new DataStorage();
        this.setTitle();
        this.isInit = true;
        setTimeout(() => { this.isInit = false; }, 3000);
    }
    
    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        CustomEventService.removeFromContext(CustomEvents.settings.themeChanged, document);
        CustomEventService.removeFromContext(CustomEvents.settings.toggle, document);
    }

    setTitle() {
        const pckData = require('../../package.json');
        const titleEl = document.querySelector('title');
        HTMLService.html(titleEl, `${SEO.application} R${StringService.getVersionFromPackage(pckData.version)}`);
    }

    settingsChanged(evt) {
        changeTheme(evt.detail.value);
        setTimeout(() => {
            this.render();
        }, 500);
    }

     toggleSettings(evt) {
        const el = ClassIdService.id('settings', this.shadow);
        if (this.isInit && this.dataStorage.getItem(SaveObjects.settings.close) === BoolEnums.bTrue) {
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

    showWindowComponents() { 
        return `
            <notice-disclaimer></notice-disclaimer>
            <image-viewer id="${ImageViewerIds.writer}" source=""></image-viewer>
            <general-note id="genericNote"></general-note>
            ${this.showNetworkChecker()}
        `;
    }

    showNetworkChecker() {
        return NetworkCheckerSet.enabled ? '<network-checker></network-checker>' : '';
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

                    ${ScreenQuery.mobile('height: ${stngsHeight + 120}px')}
                }
                .layout {
                    z-index: 7;
                }
            </style>
            <div class="application">
                ${this.showWindowComponents()}
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
