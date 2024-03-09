class UnknownPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
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
