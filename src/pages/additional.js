import { IdService } from '../services';

class AddiationalPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.active = this.getAttribute('active') || 'false';
    }

    static get observedAttributes() { 
        return ['active']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        IdService.id('base-additional', this.shadow)?.setAttribute('active', newValue);
    }
    
    connectedCallback() {
        this.shadow.innerHTML = '<base-page id="base-additional" title="Additional">'+
            ' <additional-tabs></additional-tabs> '+
            '</base-page>'; 
    }
}

if ('customElements' in window) {
	customElements.define('additional-page', AddiationalPage);
}
