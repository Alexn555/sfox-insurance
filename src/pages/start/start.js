import { IdService } from '../../services';

// @ts-nocheck
class StartPage extends HTMLElement {
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

    render() {
        this.shadow.innerHTML = `
            <style>
                .start {
                    background-color: white;
                }
                .welcome {
                    text-align: center;
                }
            </style>
            <div class="welcome">
                <h3>Start Portal Page</h3>
                <p>
                    In progress
                </p>
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('start-page', StartPage);
}
