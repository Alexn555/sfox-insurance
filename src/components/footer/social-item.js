class FooterSocialItem extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.url = this.getAttribute('url') || 'https://facebook.com/sfoxinsurance';
        this.imgName = this.getAttribute('image-name') || 'facebook';
        this.imgAlt = this.getAttribute('image-alt') || 'facebook';
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .social-item {
                    display: inline-block;
                    padding-right: 6px;
                }
            </style>
            <div class="social-item">
                <a href="${this.url}">
                    <img src="./assets/social/${this.imgName}.svg"
                        target="_blank" 
                        rel="noopener noreferrer"
                        alt="${this.imgAlt}" 
                    />
                </a>
            </div>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('footer-social-item', FooterSocialItem);
}
