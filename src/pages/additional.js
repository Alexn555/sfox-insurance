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
            <style>
                .additional {
                    margin: 10px;
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
                .content {
                    background-color: white;
                }
                .banner {
                    padding-bottom: 10px;
                }
            </style>
            <div class="additional">
                <page-title label="Additional"></page-title>
                <additional-tabs></additional-tabs>
            </div> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('additional-page', AddiationalPage);
}
