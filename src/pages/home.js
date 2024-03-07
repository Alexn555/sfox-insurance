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
                .home {
                    width: 70vw;

                    @media (max-width: 768px) {
                        grid-template-columns: 100%;
                        width: 100vw;
                    }

                    @media (min-width: 768px) {
                        grid-template-columns: 100%;
                        width: 80vw;
                    }
                    @media (min-width: 1220px) {
                        grid-template-columns: 100%;
                        width: 70vw;
                    }
                }
                .account {
                    background-color: white;
                }
                .banner {
                    padding-bottom: 10px;
                }
            </style>
            <div class="home">
                <page-title label="Accounts"></page-title>
                <home-account></home-account>
                <div class="banner">
                    <home-banners></home-banners>
                </div>
            </div> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('index-page', IndexPage);
}
