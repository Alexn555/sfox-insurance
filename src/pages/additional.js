class AddiationalPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.active = this.getAttribute('active') || 'false';
    }

    static get observedAttributes() { 
        return ['active']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const el = this.shadow.getElementById('base-additional');
        el?.setAttribute('active', newValue);
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <base-page id="base-additional" title="Additional">
                <additional-tabs></additional-tabs>
            </base-page> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('additional-page', AddiationalPage);
}
