// @ts-nocheck
import { pageNames } from "../components/common/settings";
import { SaveRoutes } from '../components/common/saves';
import DataStorage from '../services/storage';

class PageSwitcher extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.dataStorage = new DataStorage();

        this.pageName = this.getSavedPage();
        this.page = '';
        this.getPage(this.pageName);

        document.addEventListener('header-menu-click', (evt) => {
            this.getPage(evt.detail.value);
        });
    }

    getPage(name) {
        let savePage = pageNames.home;
        switch(name) {
            case pageNames.home:
            default:
                this.page = '<index-page></index-page>';
                savePage = pageNames.home;
            break;
            case pageNames.insurance:
                this.page = '<insurance-page></insurance-page>';
                savePage =  pageNames.insurance;
            break;
            case pageNames.additional:
                this.page = '<additional-page></additional-page>';
                savePage =  pageNames.additional;
            break;
        }

        this.dataStorage.save(SaveRoutes.currentPage, savePage);
        this.render();
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

    render() {
        this.shadow.innerHTML = `
            <style>
                .page {
                    display: flex;
                    width: 100vw;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px;
                    transition: transform 0.8s;

                    @media (max-width: 768px) {
                        margin-top: 60px;
                    }
                }  

            </style>
            <main class="page">
                ${this.page} 
            </main> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('page-switcher', PageSwitcher);
}
