import { imageMap } from '../../components/common/assets';

class HeaderLogo extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .header-logo {
                    margin: 8px 0 4px 20px;
                    user-select: none;
                }
            </style>
            <div class="header-logo"> 
                <img src="./${imageMap.logo}" width="160" height="35" alt="SFoxInsurance" />
            </div>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('header-logo', HeaderLogo);
}
