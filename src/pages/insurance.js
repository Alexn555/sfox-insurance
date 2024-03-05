import { TextSizes } from '../components/common/settings';
import { theme } from '../theme/theme';

const template = document.createElement('template');
template.innerHTML = `
<style>
    .insurance {
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

        @media (max-width: 768px) {
            font-size: ${TextSizes.page.title.mobile}px;
            padding: 10px;
        }   
    }
    .content {
        background-color: white;
    }
    .banner {
        padding-bottom: 10px;
    }
</style>
<div class="insurance">
    <h2 class="title">Everyday performance</h2>
    <insurance-tabs></insurance-tabs>
    <div class="banner">
        <insurance-banner></insurance-banner>
    </div>
</div> 
`;

class InsurancePage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.appendChild(template.content.cloneNode(true));
    }
}

if ('customElements' in window) {
	customElements.define('insurance-page', InsurancePage);
}
