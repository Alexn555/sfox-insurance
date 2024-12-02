import { IdService } from '../../services';

// @ts-nocheck
class AccountsPage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.active = this.getAttribute('active') || 'false';
    }
    
    static get observedAttributes() { 
        return ['active']; 
    }

    connectedCallback() {
        this.shadow.innerHTML = `
            <style>
                .account {
                    background-color: white;
                }
                .banner {
                    padding-bottom: 10px;
                }
            </style>
            <home-account></home-account>
            <section class="banner">
                <home-banners></home-banners>
            </section>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const el = IdService.id('base-home', this.shadow);
        el?.setAttribute('active', newValue);
    }
}

if ('customElements' in window) {
	customElements.define('home-accounts-page', AccountsPage);
}
