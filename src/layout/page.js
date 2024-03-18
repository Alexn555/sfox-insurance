// @ts-nocheck
import { pageNames } from "../components/common/settings";
import { SaveRoutes } from '../components/common/saves';
import DataStorage from '../services/storage';
import { fadeInAnimation } from '../components/common/styles/animations';


class PageSwitcher extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.dataStorage = new DataStorage();
        this.pageIds = ['home', 'insurance', 'additional'];

        document.addEventListener('header-menu-click', (evt) => {
            this.getPage(evt.detail.value, false);
        });

        document.addEventListener('flip-board', (evt) => {
            const { value } = evt.detail;
            const el = this.shadow.querySelector('.page');
            const isAngle = true;

            if (value) {
                if (isAngle) {
                    el.style.transform = 'rotate3d(1, 1, 1, 7deg)';
                } else {
                    el.style.transform = 'rotateY(180deg)';
                }
            } else {
                el.style.transform = 'rotate3d(1, 1, 1, 0deg)';
            }
        });
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

        const activePage = this.shadow.getElementById(savePage);
        if (isInit) {
             setTimeout(() => {
                activePage?.setAttribute('active', 'true');
            }, 200);
        } else {
            activePage?.setAttribute('active', 'true');
        }
    }

    closePageOpener() {
        const el = this.shadow.querySelector('.opener');
        setTimeout(() => { el.remove(); }, 1000);
    }

    resetPageActive() {
        this.pageIds.forEach((item) => {
            const container = this.shadow.getElementById(item);
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
        document.removeEventListener('header-menu-click', null);
        document.removeEventListener('flip-board', null);
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
                    transition: transform 0.8s;
                    animation: fadeIn 2s;

                    @media (max-width: 768px) {
                        margin-top: 60px;
                    }
                }  

                .opener {
                    height: 400px;
                }

            </style>

            <main class="page">
                <index-page id="${pageNames.home}"></index-page>
                <insurance-page id="${pageNames.insurance}"></insurance-page>
                <additional-page id="${pageNames.additional}"></additional-page>
                <div class="opener"></div>
            </main> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('page-switcher', PageSwitcher);
}
