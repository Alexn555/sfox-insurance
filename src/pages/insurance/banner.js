//@ts-nocheck
import { theme } from '../../theme/theme';
import ScreenQuery from '../../styles/query';
import { CommonEvents, CustomEvents } from '../../settings';
import { fadeInAnimation } from '../../components/common/styles/animations';
import { SaveObjects, SaveForms } from '../../components/common/saves';
import BannerService from '../../services/page/bannerService';
import { CustomEventService, IdService } from '../../services';

class InsuranceBanner extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.bannerService = new BannerService();
        this.savedBannerData = this.bannerService.getSavedData(SaveObjects.banners.performance);
        this.bannerData = this.savedBannerData || '';
        this.dataFadeIn = this.savedBannerData ? '0s' : '1s';
        this.isFliped = false;
        this.flipBoardId;
        this.checkInitFlipBoard();
    }
    
    async connectedCallback() {
        // cache data
        if (this.savedBannerData) {
            this.render();
            this.attachFlipBoard();
            return;
        }

        let payload = await this.bannerService.getPerformance(SaveObjects.banners.performance);
        this.bannerData = payload.data;
        this.dataFadeIn = payload.isSaved ? '0s' : '1s';
        this.render(); 
        this.attachFlipBoard();
    }

    attachFlipBoard() {
        this.flipBoardId = IdService.idAndClick('flipBoard', this.shadow, () => {
            this.flipBoard();
        });
    }

    disconnectedCallback() {
        IdService.remove(this.flipBoardId, CommonEvents.click);
    }

    checkInitFlipBoard() {
        if (window.DataStorage.getObject(SaveForms.performance.bannerFlip)) {
            this.flipBoard();
        }
    }

    flipBoard() {
        this.toggleFlip(!this.isFliped);
        window.DataStorage.save(SaveForms.performance.bannerFlip, this.isFliped);
        CustomEventService.send(CustomEvents.interaction.flipBoard, this.isFliped);
    }

    toggleFlip(toggle) {
       this.isFliped = toggle;
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

                    ${ScreenQuery.mobile('grid-template-columns: 100%;  width: 96vw;')}

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

                    ${ScreenQuery.medium('grid-template-columns: 30% 70%;')}
                    ${ScreenQuery.mobile('grid-template-columns: 100%;')}
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
                                <action-button id="flipBoard" label="Flip board"></action-button>
                            </div>
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
	customElements.define('insurance-banner', InsuranceBanner);
}
