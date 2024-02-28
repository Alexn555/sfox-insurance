import { theme } from '../theme/theme';

class Layout extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.pageName = 'home';
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .layout {
                    width: 100vw;
                    background-color: ${theme.layout.background};
                    overflow-x: hidden;
                }
            </style>
            <div class="layout">
                <header-section></header-section>

                <page-switcher></page-switcher>

                <footer-section></footer-section>
            </div> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('main-layout', Layout);
}
