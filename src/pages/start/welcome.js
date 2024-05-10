// Info icon svg (c) css.gg/info
import { IdService } from '../../services';
import EnvService from '../../services/api/envService';

// @ts-nocheck
class WelcomePage extends HTMLElement {
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
                    Welcome to <b>SFox Engine</b> - system to create casual and ecomony website. <br />
                    This Demo demonstrates most powerful Features of this engine.
                </p>
                <p>
                    Idea of this engine is give tool to build websites. <br />
                    This engine's main platform is <b>WebComponents, CSS3.</b> <br />
                    Engine uses Javascript (modern version) to rapidly build new plugins and components.
                </p>
                <p>
                    <b>History of project</b>
                    One day there was task given to me to create 2 pages. <br />
                    And those pages became 3 and now it's Medium-size creating tool for developers and businessmen. <br />
                    Engine's developer welcomes you and hope you enjoy this engine as much as I do. :)
                </p>
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('welcome-page', WelcomePage);
}