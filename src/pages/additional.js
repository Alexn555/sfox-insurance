class AddiationalPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <base-page title="Additional">
                <additional-tabs></additional-tabs>
            </base-page> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('additional-page', AddiationalPage);
}
