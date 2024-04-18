// @ts-nocheck
import { theme } from '../../theme/theme';
import { NoticeDisclaimerSets } from '../../settings/';
import DataStorage from '../../services/storage';
import InfoService from '../../services/page/infoService';
import { SaveObjects } from '../../components/common/saves';
import { CommonEvents } from '../../settings';

class NoticeDisclaimer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.storage = new DataStorage();
        this.info = '';
    }
    
    connectedCallback() {
        this.render();
        this.setInfo();
        this.toggleDisclaimer(true);
    }

    disconnectedCallback() {
        this.$close?.removeEventListener(CommonEvents.click, null);
    }

    async setInfo() {
        const saved = this.storage.getItem(SaveObjects.notice.topDisclaimer);
        if (!saved && NoticeDisclaimerSets.enabled) {
            this.showDialog();
            this.setInit();
            this.info = await InfoService.getDisclaimer();
            this.storage.save(SaveObjects.notice.topDisclaimer, this.info);
            this.$content.innerHTML = this.info;
            this.toggleDisclaimer(true);
       }
    }

    setInit() {
        this.$el = this.shadow.getElementById('disclaimer');
        this.$content = this.shadow.getElementById('content');
        this.$close = this.shadow.getElementById('noticeClose');
        this.$close.addEventListener(CommonEvents.click, () => {
            this.toggleDisclaimer(false);
        });
    }

    toggleDisclaimer(visible) {
        if (visible) {
            this.$el?.showModal();
        } else {
            this.$el?.close(); 
        }
    }

    showDialog() {
        const el = this.shadow.getElementById('disclaimerPlace');
        const html = `
            <dialog id="disclaimer">
                <h3>Disclaimer Notice</h3>
                <div id="content">Loading...</div>
                <div>
                    <action-button id="noticeClose" label="OK" type="action"></action-button>
                </div>
            </dialog>`;
        el.innerHTML = html;
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                dialog#disclaimer {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 500px;
                    height: 320px;
                    border: 1px solid ${theme.settings.textSize.border};
                    border-radius: 4px;
                    
                    & h3 {
                        font-size: 16px;
                    }

                    & div:nth-child(2) {
                        padding-top: 10px;
                    }
                }

                #content {
                    font-size: bigger;
                    padding-bottom: 10px;
                }
            </style>
            <div id="disclaimerPlace"></div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('notice-disclaimer', NoticeDisclaimer);
}
