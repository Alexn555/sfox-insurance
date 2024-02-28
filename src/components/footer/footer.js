import { setStyle } from "./styles/footer";

class Footer extends HTMLElement {
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
                ${setStyle()}
            </style>
            <section class="footer"> 
                <split-line height="4"></split-line>
                <div class="footer-main">
                    <footer-contact></footer-contact>
                    <footer-link-section 
                        title="QuickLinks"
                        links='["Calculators", "Prices", "Terms of Service", "Privacy and security"]'
                    > 
                    </footer-link-section>
                    <footer-link-section
                        title="Join SFoxInsurance"
                        links='["Client programs", "Jobs", "Business customers", "Investments"]'
                    >
                    </footer-link-section>
                    <footer-link-section 
                        title="Tools"
                        links='["Everyday insurance", "Loans", "Insurance", "Cards", "Stocks"]'
                    >
                    </footer-link-section>
                </div>
                <footer-disclaimer><footer-disclaimer>
            </section>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('footer-section', Footer);
}
