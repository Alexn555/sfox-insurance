import { IdService } from '../services';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        .content {
            background-color: white;
        }
        .banner {
            padding-bottom: 10px;
        }
    </style>
    <base-page id="base-insurance" title="Everyday performance">
        <insurance-tabs></insurance-tabs>
        <div class="banner">
            <insurance-banner></insurance-banner>
        </div>
    </base-page> 
`;

class InsurancePage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.shadow.appendChild(template.content.cloneNode(true));
        this.active = this.getAttribute('active') || 'false';
    }

    static get observedAttributes() { 
        return ['active']; 
    }  

    attributeChangedCallback(name, oldValue, newValue) {
        let el = IdService.id('base-insurance', this.shadow);
        el?.setAttribute('active', newValue);
    }
}

if ('customElements' in window) {
	customElements.define('insurance-page', InsurancePage);
}
