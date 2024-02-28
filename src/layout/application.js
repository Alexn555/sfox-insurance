// @ts-nocheck
import { theme, changeTheme } from '../theme/theme';

class Application extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        document.addEventListener('settings-theme-changed', this.settingsChanged.bind(this));
        document.addEventListener('settings-close', this.closeSettings.bind(this));
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

    closeSettings() {
        const el = this.shadow.querySelector('.settings');
        setTimeout(() => {
            el.style.display = 'none';
        }, 2000);
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
