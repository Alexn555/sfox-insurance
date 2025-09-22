import { IdService } from '../../services';

class ReaderPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.active = this.getAttribute('active') || 'false';
    }

    static get observedAttributes() { 
        return ['active']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        IdService.id('base-reader', this.shadow)?.setAttribute('active', newValue);
    }
    
    connectedCallback() {
       this.shadow.innerHTML = `
            <base-page id="base-reader" title="Reader">
                <reader-tabs></reader-tabs>
            </base-page> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('reader-page', ReaderPage);
}