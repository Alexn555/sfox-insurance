// @ts-nocheck
import { CommonEvents } from '../../settings';
import { ClassIdService, CustomEventService, IdService, StyleService } from '../../services';
import { ArrayService, JSONService, MobileService } from '../../services/utils';
import { theme } from '../../theme/theme';

class FooterLinkSection extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.id = this.getAttribute('id') || 'section';
        this.title = this.getAttribute('title') || 'Section';
        this.url = this.getAttribute('url') || 'sfoxinsurance.org';

        CustomEventService.event(CommonEvents.resize, this.updateSize.bind(this), window);

        const rowLinks = this.getAttribute('links');
        this.links = [];
        this.linksContent = '';
        this.contentOpen = true;
        this.screenW = window.innerWidth;
        const protocol = 'https://';

        if (ArrayService.minLength(rowLinks)) {
            this.links = JSONService.getArray(rowLinks);
            for (let i = 0; i < this.links.length; i++) {
                this.linksContent += `<div class="link-item">
                  <a href="${protocol}${this.url}/${this.links[i]}">${this.links[i]}</a>
                </div>`;
            }
        }
    }

    updateSize() {
        this.screenW = window.innerWidth;
        if (!MobileService.isMobile()) {
            const content = ClassIdService.idAll('link-content', this.shadow);
            content.forEach((contentItem) => {
                StyleService.setDisplay(contentItem, true);
            });
        } else {
            const toggleBtn = ClassIdService.id('toggle-content', this.shadow);
            StyleService.setProperty(toggleBtn, 'left', `${this.getTogglePosition()}px`);
        }
    }
    
    connectedCallback() {
        this.render();
        this.$content = ClassIdService.id('link-content', this.shadow);
        this.$toggler = IdService.idAndClick(`toggler-${this.id}`, this.shadow, this.toggleContent.bind(this));
    }

    disconnectedCallback() {
        CustomEventService.removeFromContext(CommonEvents.resize, window);
        IdService.remove(this.$toggler);
    }

    getTogglePosition() {
        return `${this.screenW - 60}`;
    }

    toggleContent() {
        this.contentOpen = !this.contentOpen;
        if (MobileService.isMobile() && this.$content) {
            StyleService.setDisplay(this.$content, this.contentOpen);
        }
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .footer-link-section {
                    color: ${theme.footer.links.text};

                    @media (max-width: 768px) {
                        border-top: 1px solid #ddcdc4;
                        padding: 10px 0 10px 0;
                    }
                }
                .link-title {
                    position: relative;
                    padding: 6px 12px;
                    font-size: 16px;
                }
                .link-content {
                    margin-top: 14px;
                }
                .link-item {
                    position: relative;
                    margin-left: 12px;
                    padding: 0 6px 12px 10px;

                    &:before {
                        --point-size: 6px;
                        content: "";
                        position: absolute;
                        border-left: var(--point-size) solid ${theme.footer.links.poiner};
                        border-top: var(--point-size) solid transparent;
                        border-bottom: var(--point-size) solid transparent;
                        top: 2px;
                        left: 0;
                    }

                    & a {
                        color: ${theme.footer.links.link};
                        text-decoration: none;
                    }
                }
                .toggle-content {
                    position: absolute;
                    left: ${this.getTogglePosition()}px;

                    @media (min-width: 768px) {
                       display: none;
                    }
                }
                .toggle-arrow {
                    cursor: pointer;

                    @media (max-width: 768px) {
                        border: 1px solid black;
                        border-radius: 24px;
                        transform: translateY(-20px);
                    }        
                }
            </style>
            <section class="footer-link-section"> 
                <div class="link-title">
                    ${this.title}
                    <div class="toggle-content">
                        <div id="toggler-${this.id}" class="toggle-arrow">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M11.0001 3.67157L13.0001 3.67157L13.0001 16.4999L16.2426 13.2574L17.6568 14.6716L12 20.3284L6.34314 14.6716L7.75735 13.2574L11.0001 16.5001L11.0001 3.67157Z"
                                fill="currentColor"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="link-content">
                    ${this.linksContent}
                </div>
            </section>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('footer-link-section', FooterLinkSection);
}
