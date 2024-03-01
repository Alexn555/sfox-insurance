import { theme } from '../../theme/theme';
import { fadeInAnimation } from '../../components/common/styles/animations';
import DataStorage from '../../services/storage';
import BannerService from '../../services/bannerService';

class BankingBanner extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.bannerService = new BannerService();
        this.dataStorage = new DataStorage();
        this.bannerData = this.dataStorage.getItem('performanceBanner') || '';
        this.dataFadeIn = this.dataStorage.getItem('performanceBanner') ? '0s' : '1s';
    }
    
    async connectedCallback() {
        // cache data
        if (this.dataStorage.getItem('performanceBanner')) {
            this.render();
        } else {
            this.bannerData = await this.bannerService.getPerformance();
            this.dataStorage.setItem('performanceBanner', this.bannerData);
            setTimeout(() => { this.render(); }, 500);
        }
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                ${fadeInAnimation}

                .banner {
                    margin-top: 10px;
                    background-color: ${theme.page.insurance.banner.background};
                    padding: 16px;
                    animation: fadeIn ${this.dataFadeIn};

                    @media (max-width: 768px) {
                        grid-template-columns: 100%;
                        width: 96vw;
                    }

                    a {
                        color: ${theme.page.insurance.banner.content.link};;
                        text-decoration: none;
                    }
                }

                .content {
                    display: grid;
                    grid-template-columns: 25% 75%;
                    background-color: ${theme.page.insurance.banner.content.background};
                    padding: 20px;

        
                    @media (max-width: 1220px) {
                        grid-template-columns: 30% 70%;
                    }
                    @media (max-width: 768px) {
                        grid-template-columns: 100%;
                    }
                }

                .content-circle {
                    position: relative;
                    display: flex;
                    height: 200px;
                    width: 200px;
                    background-color: ${theme.page.insurance.banner.content.circle};
                    border-radius: 50%;
                    justify-content: center;
                    align-items: center;
                    
                    & div {
                        color: white;
                        font-size: 24px;
                        font-weight: bold;
                    }

                    &:after {
                        content: '';
                        border-bottom: 1px dashed rgb(177, 177, 177);
                        border-right: 1px dashed rgb(177, 177, 177);
                        background-color: ${theme.page.insurance.banner.content.circle};
                        position: absolute;
                        left: 90px;
                        bottom: -10px;
                        width: 20px;
                        height: 20px;
                        transform: rotate(45deg);
                    }
                }

                .content-main-more {
                    display: grid;
                    grid-template-columns: 50% 50%;
                    padding: 10px 0 0 2px;

                    a {
                        position: relative;
                        color: #257886;
                        padding-left: 10px;
                        text-decoration: none;
                        vertical-align: middle;
                        display: table-cell;
                        height: 36px;

                        &:before {
                            --point-size: 6px;
                            content: "";
                            position: absolute;
                            border-left: var(--point-size) solid #257886;
                            border-top: var(--point-size) solid transparent;
                            border-bottom: var(--point-size) solid transparent;
                            top: 12px;
                            left: 0;
                        }
                    }

                    & div:nth-child(2) {
                        justify-self: end;
                    }
                }
            </style>
            <div class="banner">
                <div class="content">
                   <div class="content-circle">
                       <div>Hello world!</div>
                   </div>
                   <div class="content-main">
                        <h3>Welcome to SFoxInsurance!</h3>
                        <p>
                          ${this.bannerData}
                        </p>
                        <div class="content-main-more">
                            <div>
                               <a href="#more">Read more</a>
                            </div>
                            <div>
                                <action-button label="Go"></action-button>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('banking-banner', BankingBanner);
}
