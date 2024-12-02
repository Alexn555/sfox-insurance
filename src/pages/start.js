import { IdService } from '../services';

// @ts-nocheck
class IndexPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.active = this.getAttribute('active') || 'false';
    }
    
    static get observedAttributes() { 
        return ['active']; 
    }

    connectedCallback() {
        this.shadow.innerHTML = `
            <base-page id="base-home" title="Start Your Page" active="${this.active}">
                <home-tabs></home-tabs>
            </base-page> 
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const el = IdService.id('base-home', this.shadow);
        el?.setAttribute('active', newValue);
    }
}

if ('customElements' in window) {
	customElements.define('index-page', IndexPage);
}
