// @ts-nocheck
import { GlobalSizes } from '../../components/common/settings';
import { theme } from '../../theme/theme';

class FooterLinkSection extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.title = this.getAttribute('title') || 'Section';
        this.addEventListener('click', this.toggleContent.bind(this));
        window.addEventListener('resize', this.updateSize.bind(this));

        const rowLinks = this.getAttribute('links');
        this.links = [];
        this.linksContent = '';
        this.contentOpen = false;

        if (rowLinks && rowLinks.length > 0) {
            this.links = JSON.parse(rowLinks);
            for (let i = 0; i < this.links.length; i++) {
                this.linksContent += `<div class="link-item">
                  <a href="https://SFoxInsurance.org/${this.links[i]}">${this.links[i]}</a>
                </div>`;
            }
        }
    }

    updateSize() {
        const isMobile = window.innerWidth < GlobalSizes.mobileMax;
        if (!isMobile) {
            const content = this.shadow.querySelectorAll('.link-content');
            content.forEach((contentItem) => {
                contentItem.style.display = 'block';
            });
        }
    }
    
    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        this.removeEventListener('click', null);
        window.removeEventListener('resize', null);
    }

    toggleContent() {
        const isMobile = window.innerWidth < GlobalSizes.mobileMax;
        this.contentOpen = !this.contentOpen;
        const content = this.shadow.querySelector('.link-content');
    
        if (isMobile && content) {
            content.style.display = !this.contentOpen ? 'none' : 'block';
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
                    right: 30px;

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
            <div class="footer-link-section"> 
                <div class="link-title">
                    ${this.title}
                    <div class="toggle-content">
                        <div class="toggle-arrow" onclick="this.toggleContent()">
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
            </div>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('footer-link-section', FooterLinkSection);
}
