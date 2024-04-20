// @ts-nocheck
import { HeaderBoard, CommonEvents, CustomEvents } from '../../settings';
import { ClassIdService, IdService, StyleService } from '../../services';
import { isMobile } from '../../services/utils';
import { btnMap } from '../../components/common/assets';
import { theme } from '../../theme/theme';
import { showComponent } from '../../services/utils';

class Header extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        window.addEventListener(CommonEvents.resize, this.updateSize.bind(this));
    }

    updateSize() {
        const toggleItem = ClassIdService.id('menu-toggle', this.shadow);
        StyleService.setDisplay(toggleItem, !isMobile());
    }
    
    connectedCallback() {
        this.render();
        this.initForm();
    }

    initForm() {
        //this.shadow.addEventListener(CommonEvents.click, this.toggleMenu.bind(this));
        this.$toggleMenu = IdService.idAndClick('toggle', this.shadow, this.toggleMenu.bind(this));

        this.$overlay = ClassIdService.id('header-overlay', this.shadow);
        document.addEventListener(CustomEvents.header.menuOverlay, () => {
            if (this.$overlay) {
                StyleService.setDisplay(this.$overlay, true);
            }
        });

        document.addEventListener(CustomEvents.header.menuOverlayRemove, () => {
            if (this.$overlay) {
                StyleService.setDisplay(this.$overlay, false);
            }
        });
    }

    disconnectedCallback() {
        IdService.removeCustomEvents([CustomEvents.header.menuOverlay, 
            CustomEvents.header.menuOverlayRemove]);
        IdService.remove(this.$toggleMenu);
    }

    toggleMenu() {
       if (isMobile()) {
            const toggleItem = ClassIdService.id('menu-toggle', this.shadow);
            const toggleIcon = ClassIdService.id('toggle-icon', this.shadow);
            const isMenuOpen = !StyleService.isDisplaying(toggleItem);
            StyleService.setDisplay(toggleItem, isMenuOpen);
            toggleIcon.src = isMenuOpen ? `./${btnMap.mobile.menuClose}` : `./${btnMap.mobile.menuOpen}` ;
        } else {
            StyleService.setDisplay(toggleItem, true);
        }
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .header {
                    position: block;
                    width: 100vw;
                    height: 112px;
                    background-color: ${theme.header.background};
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
                    background-color: ${theme.header.overlayBg};
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
            <header class="header">
                <split-line height="10"></split-line>
                <div class="logo-menu">
                    ${showComponent(HeaderBoard.logo.enabled, '<header-logo></header-logo>')}
                    <div class="logo-menu-toggle">
                        <a id="toggle" href="#toggle">
                            <img class="toggle-icon" src="./${btnMap.mobile.menuOpen}" />
                        </a>
                    </div>
                </div>

                <div class="menu-toggle">
                    <header-menu></header-menu>
                </div>

                <div class="header-overlay"></div>
            </header>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('header-section', Header);
}
