import { setStyle } from "./styles/footer";
import { FooterBoard } from '../../settings';
import { RenderService } from '../../services/helpers';

class Footer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }
    
    connectedCallback() {
        this.shadow.innerHTML = `
            <style>
                ${setStyle()}
            </style>
            <footer class="footer"> 
                <split-line height="2"></split-line>
                <div class="footer-main">
                    ${RenderService.showComponent(FooterBoard.contact.enabled, '<footer-contact></footer-contact>')}
                    ${RenderService.showComponent(FooterBoard.links.enabled, `   
                        <footer-link-section 
                            id="quicklinks"
                            title="QuickLinks"
                            url="sfoxinsurance.org/quicklinks"
                            links='["Calculators", "Prices", "Terms of Service", "Privacy and security"]'
                        > 
                        </footer-link-section>
                        <footer-link-section
                            id="join"
                            title="Join SFoxInsurance"
                            url="sfoxinsurance.org/join"
                            links='["Client programs", "Jobs", "Business customers", "Investments"]'
                        >
                        </footer-link-section>
                        <footer-link-section 
                            id="tools"
                            title="Tools"
                            url="sfoxinsurance.org/tools"
                            links='["Everyday insurance", "Loans", "Insurance", "Cards", "Stocks"]'
                        >
                        </footer-link-section>           
                    `)}
                </div>
                ${RenderService.showComponent(FooterBoard.dislaimer.enabled, '<footer-disclaimer></footer-disclaimer>')}
            </footer>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('footer-section', Footer);
}
