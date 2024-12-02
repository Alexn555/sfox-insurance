class UnknownPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }
    
    connectedCallback() {
        this.shadow.innerHTML = `
            <base-page title="Page unknown">
                <p>Please return to initial page</p>                
            </base-page> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('unknown-page', UnknownPage);
}
