import { theme } from '../theme/theme';

class InsurancePage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .banking {
                    margin: 10px;
                    width: 70vw;

                    @media (max-width: 768px) {
                        grid-template-columns: 100%;
                        width: 100vw;
                    }

                    @media (min-width: 768px) {
                        grid-template-columns: 100%;
                        width: 80vw;
                    }
                    @media (min-width: 1220px) {
                        grid-template-columns: 100%;
                        width: 70vw;
                    }
                }
                .title {
                    color: ${theme.page.common.title};
                    font-weight: bold;
                    font-size: 32px;
                    padding: 0;

                    margin-block-start: 0.3em;
                    margin-block-end: 0.3em;
                    margin-inline-start: 0px;
                    margin-inline-end: 0px;
                }
                .content {
                    background-color: white;
                }
                .banner {
                    padding-bottom: 10px;
                }
            </style>
            <div class="banking">
                <h2 class="title">Everyday performance</h2>
                <banking-tabs></banking-tabs>
                <div class="banner">
                    <banking-banner></banking-banner>
                </div>
            </div> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('insurance-page', InsurancePage);
}
