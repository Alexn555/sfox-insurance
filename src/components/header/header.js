// @ts-nocheck
import { GlobalSizes } from '../../components/common/settings.js';

class Header extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.addEventListener('click', this.toggleMenu.bind(this));
        window.addEventListener('resize', this.updateSize.bind(this));

        document.addEventListener('header-menu-overlay', () => {
            const overlay = this.shadow.querySelector('.header-overlay');
            if (overlay) {
                overlay.style.display = 'block';
            }
        });

        document.addEventListener('header-menu-overlay-remove', () => {
            const overlay = this.shadow.querySelector('.header-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        });
    }

    updateSize() {
        const isMobile = window.innerWidth < GlobalSizes.mobileMax;
        const toggleItem = this.shadow.querySelector('.menu-toggle');
        toggleItem.style.display = isMobile ? 'none' : 'block';
    }
    
    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        document.removeEventListener('header-menu-overlay');
        document.removeEventListener('header-menu-overlay-remove');
    }

    toggleMenu() {
       const isMobile = window.innerWidth < GlobalSizes.mobileMax;
       if (isMobile) {
            const toggleItem = this.shadow.querySelector('.menu-toggle');
            const toggleIcon = this.shadow.querySelector('.toggle-icon');
            const isMenuOpen = toggleItem.style.display === 'none';
            toggleItem.style.display = isMenuOpen ? 'block' : 'none';
            toggleIcon.src = isMenuOpen ? './assets/close.png' : './assets/hambuger.png' ;
        } else {
            toggleItem.style.display = 'block';
        }
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .header {
                    position: block;
                    width: 100vw;
                    height: 112px;
                    background-color: white;
                    z-index: 100;

                    @media (max-width: 768px) {
                        position: fixed;
                        height: 60px;
                    }
                }
                .header-overlay {
                    display: none; 
                    position: fixed;
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #9e8b88;
                    opacity: 0.5;
                }
                .logo-menu {
                    position: relative;
                    z-index: 100;
                }
                .logo-menu-toggle {
                    display: none;
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    top: 6px;
                    right: 30px;

                    @media (max-width: 768px) {
                        display: block;
                    }
                }
            </style>
            <section class="header"> 
                <split-line height="10"></split-line>
                <div class="logo-menu">
                    <header-logo></header-logo>
                    <div class="logo-menu-toggle">
                        <a href="#toggle" onclick="this.toggleMenu()">
                            <img class="toggle-icon" src="./assets/hambuger.png" />
                        </a>
                    </div>
                </div>

                <div class="menu-toggle">
                    <header-menu></header-menu>
                </div>

                <div class="header-overlay"></div>
            </section>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('header-section', Header);
}
