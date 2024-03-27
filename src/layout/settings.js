// @ts-nocheck
import { theme, Themes } from '../theme/theme';
import { SettingsBoard, CustomEvents } from '../components/common/settings';
import DataStorage from '../services/storage';
import { SaveObjects } from '../components/common/saves';
import { showComponent } from "../components/common/utils/";
import { CustomEventService } from '../services';

class AppSettings extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.theme = Themes.main1;
        this.useCloseAnimation = false;
        this.dataStorage = new DataStorage();
        this.textSizePrcnt = 100;
    }
    
    connectedCallback() {
        this.render();

        const elClose = this.shadow.getElementById('close');
        elClose.onclick = (() => {
            this.dataStorage.save(SaveObjects.settings.close, '1');
            elClose.className += this.useCloseAnimation ? ' close' : '';
            CustomEventService.sendEvent(CustomEvents.settings.close);
        });
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
                    ${showComponent(SettingsBoard.theme.enabled, `
                        <div>
                            <theme-settings></theme-settings>
                        </div>
                    `)}
                    ${showComponent(SettingsBoard.resetSettings.enabled, `
                        <div>
                            <reset-settings></reset-settings>
                        </div>
                    `)}
                    <div>
                        <action-button id="close" label="Close" type="passive" />
                    </div>
                    ${showComponent(SettingsBoard.textSizes.enabled, `
                        <div>
                            <settings-text-size></settings-text-size>
                        </div>
                    `)}
                </div> 
            </div> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('main-settings', AppSettings);
}
