import { CustomWindowEvents } from '../../settings';
import { CustomEventService, IdService } from '../../services';
import { GeneralNoteEnums, GeneralNoteCodes } from '../../enums';

class NetworkChecker extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.connectionLost = 'Network connection lost';
        this.connectionON = 'Network connection restored';
        this.status = 'Network connection OK';
        this.container = 'genericNote';
        this.lostConnection = false;
    }
    
    connectedCallback() {
        this.render();
        this.initForm();
    }

    initForm() {
        this.$container = IdService.id(this.container, this.shadow);
        
        CustomEventService.windowEvent(CustomWindowEvents.network.online, () => {
            if (this.lostConnection) {
                this.toggleStatus(this.connectionON);
                this.setInfo(GeneralNoteEnums.status.success, this.status);
                this.toggleConnection(false);
                CustomEventService.send(CustomWindowEvents.generalNote.open, this.status);
                setTimeout(() => {
                    CustomEventService.send(CustomWindowEvents.generalNote.close, this.status);
                }, 2000);
            }
        });

        CustomEventService.windowEvent(CustomWindowEvents.network.offline, () => {
            this.toggleStatus(this.connectionLost);
            this.setInfo(GeneralNoteEnums.status.error, this.status);
            this.toggleConnection(true);
            CustomEventService.send(CustomWindowEvents.generalNote.open, this.status);
        });
    }

    disconnectedCallback() {
        CustomEventService.removeList([CustomWindowEvents.network.online, 
            CustomWindowEvents.network.offline]);
    }

    toggleStatus(toggle) {
        this.status = toggle;
    }
    
    toggleConnection(toggle) {
        this.lostConnection = toggle;
    }

    setInfo(status, msg) {
        this.$container.setAttribute('status', status);
        this.$container.setAttribute('text', msg);
    }

    render() {
        this.shadow.innerHTML = `
             <general-note
                id="${this.container}" 
                status="${GeneralNoteEnums.status.error}" 
                recipe="" 
                code="${GeneralNoteCodes.networkLost}"
                text="${this.status}"
                useBack="${GeneralNoteEnums.useBack.close}">
            </general-note>    
        `;
    }
}

if ('customElements' in window) {
	customElements.define('network-checker', NetworkChecker);
}
