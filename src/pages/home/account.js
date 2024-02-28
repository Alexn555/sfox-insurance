import { theme } from '../../theme/theme';

class HomeAccount extends HTMLElement {
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
                .account {
                    display: grid;
                    grid-template-columns: 100%;
                    background-color: ${theme.page.home.account.background};

                    & div:nth-child(3) {
                        grid-column: 1 / -1;
                    }
                } 

                .tbl-header {
                    display: grid;
                    grid-template-columns: 50% 50%;
                    padding: 10px 0 10px 10px;

                    a {
                       color: ${theme.page.home.account.headerLink};
                       text-decoration: none;

                       img {
                          transform: translateY(3px);
                       }
                    }
                    
                    span {
                        padding: 2px;
                    }

                    & div:nth-child(2) {
                        font-size: 12px;
                        text-align: right;
                    }
                }
            </style>
            <div class="account">   
                <div class="tbl-header">
                    <div>
                        <b>Your SFoxInsurance overview</b>
                    </div>
                    <div>
                        <span>
                            <a href="#download-pdf">
                            <img src="./assets/pdf.svg" alt="pdf"/>
                               <span>PDF</span>
                            </a>
                        </span>
                        <span>
                            <a href="#download-pdf">
                            <img src="./assets/pdf.svg" alt="xsl" />
                               <span>XSL</span>
                            </a>
                        </span>    
                    </div>
                <div>   
                <div class="tbl-content">
                    <account-table
                        col-size="5"
                        column-names='["Account", "Balance", "Insurance", "Reserved", "Case payment"]'
                        last-total-2x="true"
                        col1='["<a href=#account11224345>Frideric Gonsalez</a> KA752210022577345534","<a href=#account11224345>Nancy Cool</a> KA7552210022577350034", "Total:"]'
                        col2='["3 342 000.00", "50.90", "456.50"]'
                        col3='["20.00", "2000.00", "456.50"]'
                        col4='["725.00", "&nbsp;", "&nbsp;"]'
                        col5='["900.00 EUR", "46.00 EUR", "456.00 EUR"]'
                    />  
                </div> 
            </div>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('home-account', HomeAccount);
}
