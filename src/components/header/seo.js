// @ts-nocheck
import { SEO } from '../../settings';

class SEOHelmet extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }
    
    connectedCallback() {
        this.setSEOInformation();
    }

    setSEOInformation() {
        if (SEO.enabled){
            const el = document.querySelector('head');
            const content = `
                <meta name="author" content="${SEO.author}" />
                <meta
                name="description"
                content="${SEO.description}" 
                />
            `;
            el.insertAdjacentHTML('beforeend', content);
        }
    }
}

if ('customElements' in window) {
	customElements.define('seo-helmet', SEOHelmet);
}
