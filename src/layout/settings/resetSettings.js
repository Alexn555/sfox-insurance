// @ts-nocheck
import { ButtonTypes } from '../../components/common/ui';
import { HeaderSettings, CustomEvents } from '../../settings';
import { SaveForms, SaveObjects } from '../../components/common/saves';
import { CustomEventService, IdService } from '../../services';

class ResetSettings extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }
    
    connectedCallback() {
        this.render();
        this.setResetSettingsHandler();
    }

    setResetSettingsHandler() {
        let resetId = IdService.id('resetSettings', this.shadow);
        resetId.onclick = (() => {
            let saveObj = [
                SaveObjects.themes.active, 
                SaveObjects.settings.close,
                SaveObjects.settings.textSize,
                SaveObjects.banners.performance];
            let saveForms = [
                SaveForms.performance.bannerFlip, 
                SaveForms.calculator.main, 
                SaveForms.performance.payment];
            let permWord = HeaderSettings.resetDialog.permissionWord;
            let permission = prompt(`You about to remove all saved values from forms, type ${permWord} to agree or cancel`, permWord);
            if (permission !== null && permission.toLowerCase() === permWord.toLowerCase()) {
              window.DataStorage.removeList(saveObj.concat(saveForms));
              setTimeout(() => { // reset to root page
                CustomEventService.send(CustomEvents.settings.themeChanged, this.theme);
              }, 500);
            }
        });
    }

    render() {
        this.shadow.innerHTML = `
           <style>
           .theme-list {
                & div {
                    display: inline-block;
                    padding-right: 10px;
                }
            }
           </style>
            <div>
                <action-button id="resetSettings" label="Reset settings" type="${ButtonTypes.highlight}" />
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('reset-settings', ResetSettings);
}
