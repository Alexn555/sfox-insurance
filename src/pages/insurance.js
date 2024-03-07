const template = document.createElement('template');
template.innerHTML = `
<style>
    .insurance {
        margin: 10px;
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
    .content {
        background-color: white;
    }
    .banner {
        padding-bottom: 10px;
    }
</style>
<div class="insurance">
    <page-title label="Everyday performance"></page-title>
    <insurance-tabs></insurance-tabs>
    <div class="banner">
        <insurance-banner></insurance-banner>
    </div>
</div> 
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
