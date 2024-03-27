// @ts-nocheck
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
        this.el = this.shadow.querySelector('.container');
        this.setInit();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const el = this.shadow.querySelector('.container');
        if (el !== null) {
            el.style.display = newValue === 'true' ? 'block' : 'none';
        }
    }

    setInit() {
        this.el.style.display = 'none';
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .container {
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
            <div class="container">
                <page-title title="${this.title}"></page-title>
                <slot></slot>
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('base-page', BasePage);
}
