// @ts-nocheck
import { pageNames, Animations, CustomEvents } from "../settings";
import { SaveRoutes } from '../components/common/saves';
import DataStorage from '../services/storage';
import { fadeInAnimation } from '../components/common/styles/animations';
import { ClassIdService, CustomEventService, IdService, StyleService } from '../services';

class PageSwitcher extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.dataStorage = new DataStorage();
        this.pageIds = ['home', 'insurance', 'additional'];

        CustomEventService.event(CustomEvents.header.menuClick, (e) => {
            this.getPage(e.detail.value, false);
        }, document);

        CustomEventService.event(CustomEvents.interaction.flipBoard, (evt) => {
            const { value } = evt.detail;
            const el = ClassIdService.id('page', this.shadow);
            const isAngle = true;
            let transform = '';
            
            if (value) {
                if (isAngle) {
                    transform = 'rotate3d(1, 1, 1, 7deg)';
                } else {
                    transform = 'rotateY(180deg)';
                }
            } else {
                transform = 'rotate3d(1, 1, 1, 0deg)';
            }

            StyleService.setProperty(el, 'transform', transform);
        }, document);
    }

    getPage(name, isInit) {
        let savePage = pageNames.home;
        switch(name) {
            case pageNames.home:
            default:
                savePage = pageNames.home;
            break;
            case pageNames.insurance:
                savePage = pageNames.insurance;
            break;
            case pageNames.additional:
                savePage = pageNames.additional;
            break;
        }

        this.dataStorage.save(SaveRoutes.currentPage, savePage);

        this.resetPageActive();

        const activePage = IdService.id(savePage, this.shadow);
        if (isInit) {
             setTimeout(() => {
                activePage?.setAttribute('active', 'true');
            }, 200);
        } else {
            activePage?.setAttribute('active', 'true');
        }
    }

    closePageOpener() {
        const el = ClassIdService.id('heightHolder', this.shadow);
        setTimeout(() => { el.remove(); }, 1000);
    }

    resetPageActive() {
        this.pageIds.forEach((item) => {
            const container = IdService.id(item, this.shadow);
            container.setAttribute('active', 'false');
        });
    }

    getSavedPage() {
        let _page = pageNames.home;
        const saved = this.dataStorage.getItem(SaveRoutes.currentPage);
        if (saved) {
            _page = pageNames[saved];
        }
        return _page;
    }
    
    connectedCallback() {
        this.render();
        this.getPage(this.getSavedPage(), true);
        this.closePageOpener();
    }

    disconnectedCallback() {
        CustomEventService.removeFromContext(CustomEvents.header.menuClick, document);
        CustomEventService.removeFromContext(CustomEvents.interaction.flipBoard, document);
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                ${fadeInAnimation}

                .page {
                    display: flex;
                    width: 100vw;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px;
                    animation: fadeIn ${Animations.pageInitFadeIn}s;

                    @media (max-width: 768px) {
                        margin-top: 60px;
                    }
                }  

                .heightHolder {
                    height: 400px;
                }

            </style>

            <main class="page">
                <index-page id="${pageNames.home}"></index-page>
                <insurance-page id="${pageNames.insurance}"></insurance-page>
                <additional-page id="${pageNames.additional}"></additional-page>
                <div class="heightHolder"></div>
            </main> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('page-switcher', PageSwitcher);
}
