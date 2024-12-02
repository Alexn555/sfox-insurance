import { IdService } from '../services';

class SafePage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.active = this.getAttribute('active') || 'false';
    }

    static get observedAttributes() { 
        return ['active']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const el = IdService.id('base-additional', this.shadow);
        el?.setAttribute('active', newValue);
    }
    
    connectedCallback() {
        this.shadow.innerHTML = `
            <base-page id="base-additional" title="Safe">
                <safe-tabs></safe-tabs>
            </base-page> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('safe-page', SafePage);
}