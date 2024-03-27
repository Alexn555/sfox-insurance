import { theme } from '../../theme/theme';

class FooterContact extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .title {
                    font-size: 20px;
                    padding-bottom: 4px;
                }
                .phone {
                    color: ${theme.footer.contact.phone};
                    font-weight: bold;
                    font-size: 26px;
                    padding-bottom: 10px;
                }
                .email {
                    & a {
                        color: ${theme.footer.contact.email};
                    }
                    padding-bottom: 12px;
                }
                .address {
                    white-space: pre;
                    font-size: smaller;
                    transform: translate(-65px, -8px);
                }

                @media (max-width: 768px) {
                    .footer-contact {
                        margin-left: 10px;
                    }
                    .social {
                        margin-bottom: 6px;
                    }
                    .address {
                        transform: translate(-60px, -8px);
                    }
                }
            </style>
            <section class="footer-contact"> 
                <div class="title">Contact</div>
                <div class="phone">2 445 500</div>
                <div class="email">
                    <a href="mailto: info@sfoxinsurance.com">info@sfoxinsurance.com</a>
                </div>
                <div class="address">
                    SFoxInsurance
                    SomeRoad 32, Tallinn,
                    INC number: INC2500XC
                    Reg. number: 10062540000
                </div>
                <div class="social">
                    <footer-social-item 
                        url="https://facebook.com/sfoxinsurance" 
                        image-name="facebook"
                        image-alt="facebook"
                    >
                    </footer-social-item>
                    <footer-social-item 
                        url="https://youtube.com/sfoxinsurance" 
                        image-name="youtube"
                        image-alt="youtube"
                    >
                    </footer-social-item>
                    <footer-social-item 
                        url="https://twitter.com/sfoxinsurance" 
                        image-name="twitter"
                        image-alt="twitter"
                    >
                    </footer-social-item>
                    <footer-social-item 
                        url="https://instagram.com/sfoxinsurance" 
                        image-name="instagram"
                        image-alt="instagram"
                    >
                    </footer-social-item>
                    <footer-social-item 
                        url="https://skype.com/sfoxinsurance" 
                        image-name="skype"
                        image-alt="skype"
                    >
                    </footer-social-item>
                </div>
            </section>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('footer-contact', FooterContact);
}
