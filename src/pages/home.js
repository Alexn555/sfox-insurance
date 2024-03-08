class IndexPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .account {
                    background-color: white;
                }
                .banner {
                    padding-bottom: 10px;
                }
            </style>
            <base-page title="Accounts">
                <home-account></home-account>
                <div class="banner">
                    <home-banners></home-banners>
                </div>
            </base-page> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('index-page', IndexPage);
}
