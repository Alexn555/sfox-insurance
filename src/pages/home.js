// @ts-nocheck
class IndexPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.active = this.getAttribute('active') || 'false';
    }
    
    static get observedAttributes() { 
        return ['active']; 
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const el = this.shadow.getElementById('base-home');
        el?.setAttribute('active', newValue);
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
            <base-page id="base-home" title="Accounts" active="${this.active}">
                <home-account></home-account>
                <section class="banner">
                    <home-banners></home-banners>
                </section>
            </base-page> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('index-page', IndexPage);
}
