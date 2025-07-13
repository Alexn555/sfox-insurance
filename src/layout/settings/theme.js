// @ts-nocheck
import { Themes } from '../../theme/enums';
import ScreenQuery from '../../styles/query';
import { GlobalSizes, CustomEvents } from '../../settings';
import { ButtonTypes } from '../../components/common/ui';
import { SaveObjects, WindowSettings } from '../../components/common/saves';
import { CustomEventService, IdService } from '../../services';
import { CookieService } from '../../services/storage/cookieService';

class ThemeSettings extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.theme = Themes.main1;

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

    disconnectedCallback() {
        IdService.remove(this.$thmHandler);
    }

    setThemeHandler(themeId, themeSelected) {
        this.$thmHandler = IdService.idAndClick(themeId, this.shadow, () => {
            this.setTheme(themeSelected);
        });
    }

    setThemeOnInit() {
        if(document.cookie.indexOf(WindowSettings.refresh) == -1) {
            // The cookie doesn't exist. Create it now -> expires after [n] time
            CookieService.setCookie(WindowSettings.refresh, 1, GlobalSizes.wdStngsRefresh);
            // to use only on 'real refresh' with all components
            let savedTheme = window.DataStorage.getItem(SaveObjects.themes.active);
            if (savedTheme) {
                this.setTheme(savedTheme);
            }
        }
    }

    setTheme(_theme = Themes.main1) {
        this.theme = _theme;
        window.DataStorage.save(SaveObjects.themes.active, _theme);
        CustomEventService.send(CustomEvents.settings.themeChanged, this.theme);
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
                    
                    ${ScreenQuery.mobile('padding-bottom: 10px;')}
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
