// Info icon svg (c) css.gg/info
import { IdService } from '../../services';
import EnvService from '../../services/api/envService';

// @ts-nocheck
class ReaderWelcomePage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.active = this.getAttribute('active') || 'false';
    }
    
    static get observedAttributes() { 
        return ['active']; 
    }

    connectedCallback() {
        const showLogo = () => { 
            return '<p>'+
                '   <img src="'+EnvService.getRoot()+'/assets/intro/info.svg" width="64" height="64" alt="Cater" />'+
                '</p>';
        };

        this.shadow.innerHTML = `
            <style>
                .welcome {
                    text-align: center;
                    padding-bottom: 20px;
                }
            </style>
            <div class="welcome">
                <h3>Welcome Page</h3>
                ${showLogo()}
                <p>
                    Welcome to <b>SFox Engine's Reader page</b> - Another section. <br />
                    This page demonstrates some features
                </p>
                <p>
                    <b>Contact page</b> <br />
                    A usual contact form page
                </p>
                <p>
                    <b>Pages in progress</b>
                    New pages for this section will be added 
                </p>
            </div>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let el = IdService.id('base-home', this.shadow);
        el?.setAttribute('active', newValue);
    }
}

if ('customElements' in window) {
	customElements.define('reader-welcome-page', ReaderWelcomePage);
}