// @ts-nocheck
import { ButtonTypes } from '../../components/common/ui';
import DataStorage from '../../services/storage';
import { HeaderSettings } from '../../components/common/settings';
import { SaveForms, SaveObjects } from '../../components/common/saves';

class ResetSettings extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.enabled = this.getAttribute('enabled') | 1;
        this.dataStorage = new DataStorage();
    }
    
    connectedCallback() {
        if (this.enabled === 1) {
            this.render();
            this.setResetSettingsHandler();
        }
    }

    setResetSettingsHandler() {
        const resetId = this.shadow.getElementById('resetSettings');
        resetId.onclick = (() => {
            const saveObj = [
                SaveObjects.themes.active, 
                SaveObjects.settings.close,
                SaveObjects.settings.textSize,
                SaveObjects.banners.performance];
            const saveForms = [
                SaveForms.performance.bannerFlip, 
                SaveForms.calculator.main, 
                SaveForms.performance.payment];
            const list = saveObj.concat(saveForms);
            const permWord = HeaderSettings.resetDialog.permissionWord;
            let permission = prompt(`You about to remove all saved values from forms, type ${permWord} to agree or cancel`, permWord);
            if (permission !== null && permission.toLowerCase() === permWord.toLowerCase()) {
              this.dataStorage.removeList(list);
              setTimeout(() => { // reset to root page
                document.dispatchEvent(new CustomEvent('settings-theme-changed', { detail:{ value: this.theme }, bubbles: false, cancelable: false }));
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
