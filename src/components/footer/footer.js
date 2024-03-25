import { setStyle } from "./styles/footer";
import { FooterBoard } from '../../components/common/settings';
import { showComponent } from "../../components/common/utils/";

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
            <footer class="footer"> 
                <split-line height="4"></split-line>
                <div class="footer-main">
                    ${showComponent(FooterBoard.contact.enabled, '<footer-contact></footer-contact>')}
                    ${showComponent(FooterBoard.links.enabled, `   
                        <footer-link-section 
                            title="QuickLinks"
                            url="sfoxinsurance.org/quicklinks"
                            links='["Calculators", "Prices", "Terms of Service", "Privacy and security"]'
                        > 
                        </footer-link-section>
                        <footer-link-section
                            title="Join SFoxInsurance"
                            url="sfoxinsurance.org/join"
                            links='["Client programs", "Jobs", "Business customers", "Investments"]'
                        >
                        </footer-link-section>
                        <footer-link-section 
                            title="Tools"
                            url="sfoxinsurance.org/tools"
                            links='["Everyday insurance", "Loans", "Insurance", "Cards", "Stocks"]'
                        >
                        </footer-link-section>           
                    `)}
                </div>
                ${showComponent(FooterBoard.dislaimer.enabled, '<footer-disclaimer></footer-disclaimer>')}
            </footer>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('footer-section', Footer);
}
