const template = document.createElement('template');
template.innerHTML = `
    <style>
        .content {
            background-color: white;
        }
        .banner {
            padding-bottom: 10px;
        }
    </style>
    <base-page title="Everyday performance">
        <insurance-tabs></insurance-tabs>
        <div class="banner">
            <insurance-banner></insurance-banner>
        </div>
    </base-page> 
`;

class InsurancePage extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.appendChild(template.content.cloneNode(true));
    }
}

if ('customElements' in window) {
	customElements.define('insurance-page', InsurancePage);
}
