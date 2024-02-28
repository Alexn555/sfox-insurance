import { pageNames } from "../components/common/settings";

class PageSwitcher extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.pageName = pageNames.home;
        this.page = '';
        this.getPage(this.pageName);

        document.addEventListener('header-menu-click', (evt) => {
            // @ts-ignore
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
        }
        this.render();
    }
    
    connectedCallback() {
        this.render();
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
