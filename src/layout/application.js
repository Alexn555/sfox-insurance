// @ts-nocheck
import { theme, changeTheme } from '../theme/theme';
import { Animations } from '../components/common/settings';

class Application extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        document.addEventListener('settings-theme-changed', this.settingsChanged.bind(this));
        document.addEventListener('settings-toggle', this.toggleSettings.bind(this));
        this.settingsHeight = '120';
    }
    
    connectedCallback() {
        this.render();
    }

    settingsChanged(evt) {
        changeTheme(evt.detail.value);
        setTimeout(() => {
            this.render();
        }, 500);
    }

    toggleSettings(evt) {
        const { value } = evt.detail;
        setTimeout(() => {
            const el = this.shadow.querySelector('.settings');
            el.style.display = value ? 'none' : 'block';
        }, Animations.topSettings * 1000);
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .application {
                    width: 100vw;
                    background-color: ${theme.layout.background};
                    overflow-x: hidden;
                }
                .settings {
                    height: ${this.settingsHeight}px;
                    z-index: 6;
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
