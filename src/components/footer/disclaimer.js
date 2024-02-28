import { theme } from '../../theme/theme';

class FooterDisclaimer extends HTMLElement {
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
                .footer-disclaimer {
                    display: flex;
                    width: 100vw;
                    height: 140px;
                    background-color: ${theme.footer.disclaimer.background};
                    align-items: center;
                    justify-content: center;
                    color: ${theme.footer.disclaimer.text};
                    font-size: smaller;

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
                  This is a website of companies offering financial services - SFoxInsurance, SFoxInsurance Liising.
                  
                  Before entering into any agreement read and conditions of respective service. Consult a specialist, where necessary.
                  SFoxInsurance does not provide a credit advisory service for the purposes of the Insurance Intermediates Act.
                  The borrower makes the decision of taking out a loan, who accesses the suitability of the loan product and contractual terms to his/her personal
                  loan interest, need and financial situation on the basis of the information and warnings presented by the bank
                  and is responsible for the consequences related to concluding the agreement.
                </div>
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('footer-disclaimer', FooterDisclaimer);
}
