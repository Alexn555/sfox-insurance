import { theme } from '../../theme/theme';
import { Banners } from '../../components/common/settings';

class HomeBanners extends HTMLElement {
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
                .banners {
                    margin-top: 10px;
                    background-color: ${theme.page.home.banners.background};
                    display: grid;
                    grid-template-columns: 33% 33% 33%;

                    @media (max-width: 768px) {
                        grid-template-columns: 100%;
                        width: 96vw;
                    }

                    a {
                        color: ${theme.page.home.banners.link};
                        text-decoration: none;
                    }
                }

                .two-lines {
                    margin-top: -10px;
                }

                .list-points {
                    list-style: none;
                    & li {
                        position: relative;
                        padding-bottom: 10px;
                    }
 
                    & li:before{
                        content: '';
                        position: absolute;
                        border-right: 2px solid ${theme.page.home.banners.itemBorder};
                        border-bottom: 2px solid ${theme.page.home.banners.itemBorder};
                        width: 10px;
                        height: 10px;
                        top: calc(50% - 4px);
                        left: -20px;
                        transform: translateY(-50%) rotate(-45deg);
                    }
                }
            </style>
            <div class="banners">
                <div>
                    <home-banner title="Open" title-color="${Banners.Accounts.main}">
                        <p>
                           <b>One of core values of SFoxInsurance</b>
                           <p class="two-lines">Lorem ipsum dolor sil amet, consectetur adipicing elit.</p>
                        </p>
                    </home-banner>
                </div>
                <div>
                    <home-banner title="Caring" title-color="${Banners.Accounts.main}">
                        <p>Cum enim libero quisquam return. Dotorum fuga magnam nemo quae voluptas
                        voluplates voluplatum. </p>
                        <p><a href="#readmore">Read more</a></p>
                    </home-banner>
                </div>
                <div>
                <home-banner title="Simple" title-color="${Banners.Accounts.main}">
                    <ul class="list-points">
                        <li>
                            Lorem ipsum dolor sit amet, consectetur adipicing elit.
                        </li>
                        <li>
                            Lorem ipsum dolor sit amet, consectetur adipicing elit.
                        </li>
                    </ul>
                </home-banner>
                </div>
            </div>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('home-banners', HomeBanners);
}
