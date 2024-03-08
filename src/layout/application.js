// @ts-nocheck
import { theme, changeTheme } from '../theme/theme';
import { Animations, PageStructure } from '../components/common/settings';
import { SaveObjects } from '../components/common/saves';
import DataStorage from '../services/storage';

class Application extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        document.addEventListener('settings-theme-changed', this.settingsChanged.bind(this));
        document.addEventListener('settings-toggle', this.toggleSettings.bind(this));
        this.dataStorage = new DataStorage();
        this.isInit = true;
        setTimeout(() => { this.isInit = false; }, 3000);
    }
    
    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        document.removeEventListener('settings-theme-changed', null);
        document.removeEventListener('settings-toggle', null);
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
           el.style.display = 'none';
           return;
        }

        const { value } = evt.detail;
        setTimeout(() => {
            el.style.display = value ? 'none' : 'block';
        }, Animations.topSettings * 1000);
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
                        height: ${stngsHeight + 60}px;
                    }   
                }
                .layout {
                    z-index: 7;
                }
            </style>
            <div class="application">
                <div class="settings">
                    <main-settings> </main-settings>
                </div>
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
