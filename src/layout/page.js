// @ts-nocheck
import { pageNames } from "../components/common/settings";

class PageSwitcher extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.pageName = pageNames.home;
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
                <wc-route path="/" title="Home" component="index-page"></wc-route>
                <wc-route path="/insurance" title="Insurance" component="insurance-page"></wc-route>
                <wc-route path="/additional" title="Additional" component="additional-page"></wc-route>
            </main> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('page-switcher', PageSwitcher);
}
