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
        let el = IdService.id('base-reader', this.shadow);
        el?.setAttribute('active', newValue);
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
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