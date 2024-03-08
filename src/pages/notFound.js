class NotFoundPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <base-page title="Page not found">
                <p>Please return to initial page</p>                
            </base-page> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('not-found-page', NotFoundPage);
}
