// @ts-nocheck
import { theme } from '../../../theme/theme';
import { NoticeDisclaimerSets } from '../../../settings';
import InfoService from '../../../services/page/infoService';
import { SaveObjects } from '../../common/saves';
import { IdService, HTMLService } from '../../../services';
import { RenderService } from '../../../services/helpers';

class NoticeDisclaimer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.info = '';
    }
    
    connectedCallback() {
        this.render();
        this.setInfo();
        this.toggleDisclaimer(true);
    }

    disconnectedCallback() {
        IdService.remove(this.$close);
    }

    async setInfo() {
        const saved = window.DataStorage.getItem(SaveObjects.notice.topDisclaimer);
        if (!saved && NoticeDisclaimerSets.enabled) {
            this.showDialog();
            this.setInit();
            this.info = await InfoService.getDisclaimer();
            window.DataStorage.save(SaveObjects.notice.topDisclaimer, this.info);
            HTMLService.html(this.$content, this.info);
            this.toggleDisclaimer(true);
        }
    }

    setInit() {
        this.$el = IdService.id('disclaimer', this.shadow);
        this.$content = IdService.id('content', this.shadow);
        this.$close = IdService.idAndClick('noticeClose', this.shadow, () => {
            this.toggleDisclaimer(false);
        })
    }

    toggleDisclaimer(visible) {
        if (visible) {
            if (this.$el) {  
                RenderService.modal(this.$el, 500); 
            }
        } else {
            this.$el?.close(); 
        }
    }

    showDialog() {
        const el = IdService.id('disclaimerPlace', this.shadow);
        const html = `
            <dialog id="disclaimer">
                <h3>Disclaimer Notice</h3>
                <div id="content">Loading...</div>
                <div>
                    <action-button id="noticeClose" label="OK" type="action"></action-button>
                </div>
            </dialog>`;
        HTMLService.html(el, html);
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
