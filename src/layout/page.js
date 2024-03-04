// @ts-nocheck
import { pageNames } from "../components/common/settings";

class PageSwitcher extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.pageName = pageNames.home;
        this.page = '';
        this.getPage(this.pageName);

        document.addEventListener('header-menu-click', (evt) => {
            this.getPage(evt.detail.value);
        });
    }

    getPage(name) {
        switch(name) {
            case pageNames.home:
            default:
                this.page = '<index-page></index-page';
            break;
            case pageNames.insurance:
                this.page = '<insurance-page></insurance-page>';
            break;
            case pageNames.additional:
                this.page = '<additional-page></additional-page>';
            break;
        }
        this.render();
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
                    transform-style: preserve-3d;

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
