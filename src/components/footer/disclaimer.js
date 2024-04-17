import { theme } from '../../theme/theme';
import { fadeInAnimation } from '../../components/common/styles/animations';
import InfoService from '../../services/page/infoService';

class FooterDisclaimer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.disclaimerData = '';
    }
    
    async connectedCallback() {
        this.disclaimerData = await InfoService.getDisclaimer();
        setTimeout(() => { this.render(); }, 500);
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                ${fadeInAnimation}

                .footer-disclaimer {
                    display: flex;
                    width: 100vw;
                    height: 140px;
                    background-color: ${theme.footer.disclaimer.background};
                    align-items: center;
                    justify-content: center;
                    color: ${theme.footer.disclaimer.text};
                    font-size: smaller;
                    animation: fadeIn 1s;

                    @media (max-width: 768px) {
                        height: 200px;
                    }

                    & div {
                        width: 60vw;
                        text-align: center;

                        @media (max-width: 768px) {
                            width: 90vw;
                        }
                    }
                }
            </style>
            <div class="footer-disclaimer"> 
                <div>
                  ${this.disclaimerData}
                </div>
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('footer-disclaimer', FooterDisclaimer);
}
