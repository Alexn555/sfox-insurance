import { theme } from '../../theme/theme';
import ScreenQuery from '../../styles/query';
import { imageMap } from '../../components/common/assets';

class DownloadButtons extends HTMLElement {
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
                .download {
                    font-size: 12px;
                    text-align: right;

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
      
                    ${ScreenQuery.mobile('padding-right: 20px')}
                }         
            </style>
            <div class="download">
                <span>
                    <a href="#download-pdf">
                    <img src="./${imageMap.pdfIcon}" alt="pdf"/>
                        <span>PDF</span>
                    </a>
                </span>
                <span>
                    <a href="#download-pdf">
                    <img src="./${imageMap.pdfIcon}" alt="xsl" />
                        <span>XSL</span>
                    </a>
                </span>    
            </div>       
        `;
    }
}


if ('customElements' in window) {
	customElements.define('download-buttons', DownloadButtons);
}
