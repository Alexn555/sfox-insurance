// Info icon svg (c) css.gg/info
import { IdService } from '../../services';
import EnvService from '../../services/api/envService';

// @ts-nocheck
class SafeWelcomePage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.active = this.getAttribute('active') || 'false';
    }
    
    static get observedAttributes() { 
        return ['active']; 
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const el = IdService.id('base-home', this.shadow);
        el?.setAttribute('active', newValue);
    }

    showLogo() { 
        return `
            <p>
                <img src="${EnvService.getRoot()}/assets/intro/info.svg" width="64" height="64" alt="Cater" />
            </p>
        `;
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .welcome {
                    text-align: center;
                    padding-bottom: 20px;
                }
            </style>
            <div class="welcome">
                <h3>Welcome Page</h3>
                ${this.showLogo()}
                <p>
                    Welcome to <b>SFox Engine's Safe page</b> - Safe section. <br />
                    This page demonstrates some features
                </p>
                <p>
                    <b>SafeKing Game</b> <br />
                    A small game to show how we can create WebComponents game <br />
                    The game is about guessing Safe combination and if user wins <br />
                    User gets the award
                </p>
                <p>
                    <b>Pages in progress</b>
                    New pages for this section will be added 
                </p>
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('safe-welcome-page', SafeWelcomePage);
}