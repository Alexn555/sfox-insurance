// @ts-nocheck
import { theme, Themes } from '../theme/theme';
import { GlobalSizes } from '../components/common/settings';
import { ButtonTypes } from '../components/common/ui';
import DataStorage from '../services/storage';
import { SaveForms, SaveObjects, WindowSettings } from '../components/common/saves';

class AppSettings extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.theme = Themes.main1;
        this.useCloseAnimation = false;
        this.dataStorage = new DataStorage();

        this.themeList = [
            { id: 'themeMain', label: 'Main Theme', content: Themes.main1, },
            { id: 'themeBlue', label: 'Blue Theme', content: Themes.blue  },
            { id: 'themeBlack', label: 'Black Theme', content: Themes.black  },
            { id: 'themeRed', label: 'Red Theme', content: Themes.red  },
            { id: 'themeYellow', label: 'Yellow Theme', content: Themes.yellow },
        ];

        this.setThemeOnInit();
    }
    
    connectedCallback() {
        this.render();
        this.setThemeHandlers();
        this.setResetSettingsHandler();

        const elClose = this.shadow.querySelector(`#close`);
        elClose.onclick = (() => {
            this.dataStorage.save(SaveObjects.settings.close, '1');
            elClose.className += this.useCloseAnimation ? ' close' : '';
            document.dispatchEvent(new CustomEvent('settings-close', { bubbles: false, cancelable: false }));
        });
    }

    setThemeHandlers() {
        this.themeList.forEach((thm) => {
            this.setThemeHandler(thm.id, thm.content);
        });
    }

    setThemeHandler(themeId, themeSelected) {
        const thmHandler = this.shadow.getElementById(themeId);
        thmHandler.onclick = (() => {
            this.setTheme(themeSelected);
        });
    }

    setResetSettingsHandler() {
        const resetId = this.shadow.getElementById('resetSettings');
        resetId.onclick = (() => {
            const saveObj = [SaveObjects.themes.active, SaveObjects.settings.close, SaveObjects.banners.performance];
            const saveForms = [SaveForms.performance.bannerFlip, SaveForms.calculator.main, SaveForms.performance.payment];
            const list = saveObj.concat(saveForms);
            let permission = prompt("You about to remove all saved values from forms, type Yes to agree or cancel", "Yes");
            if (permission !== null) {
              this.dataStorage.removeList(list);
              setTimeout(() => { // reset to root page
                document.dispatchEvent(new CustomEvent('settings-theme-changed', { detail:{ value: this.theme }, bubbles: false, cancelable: false }));
              }, 500);
            }
        });
    }

    setThemeOnInit() {
        if(document.cookie.indexOf(WindowSettings.refresh) == -1) {
            // The cookie doesn't exist. Create it now -> expires after [n] time
            document.cookie = `${WindowSettings.refresh}=1;max-age=${GlobalSizes.wdStngsRefresh}`;
            // to use only on 'real refresh' with all components
            const savedTheme = this.dataStorage.getItem(SaveObjects.themes.active);
            if (savedTheme) {
                this.setTheme(savedTheme);
            }
        }
    }

    setTheme(_theme = Themes.main1) {
        this.theme = _theme;
        this.dataStorage.save(SaveObjects.themes.active, _theme);
        document.dispatchEvent(new CustomEvent('settings-theme-changed', { detail:{ value: this.theme }, bubbles: false, cancelable: false }));
    }

    showButton(id, label) {
        return `
            <div>
                <action-button id="${id}" label="${label}" type="${ButtonTypes.action}" />
            </div>
        `;
    }

    showButtonSection() {
        let html = '';
        this.themeList.forEach((thm) => {
            html += this.showButton(thm.id, thm.label);
        });
        return html;
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                @keyframes closeAnimation{
                    0%{
                      opacity: 1;
                      transform: rotateX(90deg);
                    }
                    50%{
                      opacity: 0.5;
                      transform: rotateX(0deg);
                    }
                    100%{
                      display: none;
                      opacity: 1;
                      transform: rotateX(90deg);
                    }
                  }
                  
                 .settings {
                    background-color: ${theme.layout.background};
                    padding: 0 0 0 50px;
                 }

                 .close {
                    animation-name: closeAnimation;
                    animation-duration: 2000ms;
                    animation-fill-mode: forwards;
                 }

                .settings-list {
                    & div {
                        display: inline-block;
                        padding: 10px;
                    }
                }
            </style>
            <div class="settings">
                <h2>Main Settings</h2>
                <div class="settings-list">
                    ${this.showButtonSection()}
                    <div>
                        <action-button id="resetSettings" label="Reset settings" type="${ButtonTypes.highlight}" />
                    </div>
                    <div>
                        <action-button id="close" label="Close" type="passive" />
                    </div>
                </div> 
            </div> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('main-settings', AppSettings);
}
