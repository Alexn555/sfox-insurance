// @ts-nocheck
import { Animations, CommonEvents, CustomEvents } from '../../settings';
import DataStorage from '../../services/storage';
import { SaveObjects } from '../../components/common/saves';
import { ClassIdService, CustomEventService, IdService, StyleService } from '../../services';
import { BoolEnums } from '../../enums';

class LoadSettings extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        CustomEventService.event(CommonEvents.resize, this.updateSize.bind(this), window);
        CustomEventService.event(CustomEvents.settings.close, this.closeSettings.bind(this), document);

        this.dataStorage = new DataStorage();
        this.screenW = window.innerWidth;
        this.settingsToggle = true;
        this.loadingNotice = '';
    }
    
    connectedCallback() {
        this.render();
        this.setLayoutOffset();
        this.$setsOpen = IdService.idAndClick('settingsOpen', this.shadow, () => {
            this.dataStorage.save(SaveObjects.settings.close, this.settingsToggle ? BoolEnums.bTrue : BoolEnums.bFalse);
            this.toggleNotice(this.settingsToggle);
            this.moveLayout();
        });
    }

    disconnectedCallback() {
        IdService.remove(this.$setsOpen);
    }

    updateSize() {
        this.screenW = window.innerWidth;
        const stn = ClassIdService.id('settings-button', this.shadow);
        StyleService.setProperty(stn, 'left', this.getStnPosition()+'px');
    }

    setLayoutOffset() {
        const savedToggle = this.dataStorage.getItem(SaveObjects.settings.close) || false;
        this.setToggle(savedToggle === 1);
        this.moveLayout(); 
    }

    getStnPosition() {
        return `${this.screenW - 100}`;
    }

    moveLayout() {
        // send signal layout animate
        CustomEventService.send(CustomEvents.settings.moveLayout, this.settingsToggle);
        this.setToggle(!this.settingsToggle);
    }

    closeSettings() {
        this.setToggle(true);
        this.moveLayout();
    }

    setToggle(toggle) {
        this.settingsToggle = toggle;
    }

    toggleNotice(isClose) {
        const elDialog = IdService.id('load-settings', this.shadow);
        if (!isClose) {
            elDialog.showModal();
            setTimeout(() => { elDialog.close(); }, Animations.topSettings * 1000);
        }
    }

    render() {  
        this.shadow.innerHTML = `
            <style>
                /* {this.screenW - 100}px - to avoid shifting when overlay shows */
                .settings-button {
                    position: absolute;
                    left: ${this.getStnPosition()}px; 
                    top: 16px;
                    z-index: 2000;
                    opacity: 0.3;

                    &:hover {
                        opacity: 1;
                    }

                    @media (max-width: 768px) {
                        top: 60px;
                    }
                }
            </style>
            <div class="settings-button">                
                <action-button label="Settings" id="settingsOpen" type="action"> </action-button>
            </div>
            <dialog id="load-settings">
                Loading settings...
            </dialog>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('load-settings', LoadSettings);
}
