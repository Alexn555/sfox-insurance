// @ts-nocheck
import { Themes } from '../../theme/theme';
import { GlobalSizes, CustomEvents } from '../../components/common/settings';
import { ButtonTypes } from '../../components/common/ui';
import DataStorage from '../../services/storage';
import { SaveObjects, WindowSettings } from '../../components/common/saves';
import { CustomEventService } from '../../services';

class ThemeSettings extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.theme = Themes.main1;
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
        CustomEventService.sendEvent(CustomEvents.settings.themeChanged, this.theme);
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
           .theme-list {
                & div {
                    display: inline-block;
                    padding-right: 10px;

                    &:last-child {
                        padding-right: 0;
                    }

                    @media (max-width: 768px) {
                        padding-bottom: 10px;
                    }
                }
            }
           </style>
            <div class="theme-list">
                ${this.showButtonSection()}  
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('theme-settings', ThemeSettings);
}
