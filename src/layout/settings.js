// @ts-nocheck
import { Themes } from '../theme/enums';
import { theme } from '../theme/theme';
import { SettingsBoard, CustomEvents } from '../settings';
import { CustomEventService, IdService } from '../services';
import { RenderService } from '../services/helpers';
import { SaveObjects } from '../components/common/saves';
import { BoolEnums } from '../enums';

class AppSettings extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.theme = Themes.main1;
        this.useCloseAnimation = false;
        this.textSizePrcnt = 100;
    }
    
    connectedCallback() {
        this.render();
        this.$elClose = IdService.idAndClick('close', this.shadow, () => {
            window.DataStorage.save(SaveObjects.settings.close, BoolEnums.bTrue);
            this.$elClose.className += this.useCloseAnimation ? ' close' : '';
            CustomEventService.send(CustomEvents.settings.close);
        });
    }

    disconnectedCallback() {
        IdService.remove(this.$elClose);
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
                    ${RenderService.showComponent(SettingsBoard.theme.enabled, `
                        <div>
                            <theme-settings></theme-settings>
                        </div>
                    `)}
                    ${RenderService.showComponent(SettingsBoard.resetSettings.enabled, `
                        <div>
                            <reset-settings></reset-settings>
                        </div>
                    `)}
                    <div>
                        <action-button id="close" label="Close" type="passive" />
                    </div>
                    ${RenderService.showComponent(SettingsBoard.textSizes.enabled, `
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
