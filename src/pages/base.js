// @ts-nocheck
import { IdService, StyleService } from '../services';
import { StringService } from '../services/utils';

class BasePage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.title = this.getAttribute('title') || '';
        this.active = this.getAttribute('active') || false;
    }
    
    static get observedAttributes() { 
        return ['active']; 
    }

    connectedCallback() {
        this.render();
        this.el = IdService.id('container', this.shadow);
        this.setInit();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.el) {
            StyleService.setDisplay(this.el, StringService.isBoolean(newValue));
        }
    }

    setInit() {
        StyleService.setDisplay(this.el, false);
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                #container {
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
            </style>
            <div id="container">
                <page-title title="${this.title}"></page-title>
                <slot></slot>
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('base-page', BasePage);
}
