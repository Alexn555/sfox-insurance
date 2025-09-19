// @ts-nocheck
import { theme } from '../../theme/theme';
import ScreenQuery from '../../styles/query';
import { HeaderBoard, CommonEvents, CustomEvents } from '../../settings';
import { CustomEventService, ClassIdService, IdService, StyleService } from '../../services';
import { MobileService } from '../../services/utils';
import { RenderService } from '../../services/helpers';
import { btnMap } from '../../components/common/assets';

class Header extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        CustomEventService.event(CommonEvents.resize, this.updateSize.bind(this), window);
        this.$c = {};
        this.$btns = {};
    }

    updateSize() {
        StyleService.setDisplay(ClassIdService.id('menu-toggle', this.shadow), !MobileService.isMobile());
    }
    
    connectedCallback() {
        this.render();
        this.$btns['toggleMenu'] = IdService.idAndClick('toggle', this.shadow, this.toggleMenu.bind(this));
        this.$c['overlay'] = ClassIdService.id('header-overlay', this.shadow);

        CustomEventService.event(CustomEvents.header.menuOverlay, () => {
            if (this.$c['overlay']) {
                StyleService.setDisplay(this.$c['overlay'], true);
            }
        });  
        CustomEventService.event(CustomEvents.header.menuOverlayRemove, () => {
            if (this.$c['overlay']) {
                StyleService.setDisplay(this.$c['overlay'], false);
            }
        });
        CustomEventService.event(CustomEvents.header.menuClick, this.toggleMenu.bind(this));
    }

    disconnectedCallback() {
        CustomEventService.removeList([CustomEvents.header.menuOverlay, 
            CustomEvents.header.menuOverlayRemove]);
        IdService.remove(this.$btns);
    }

    toggleMenu() {
       let toggleItem = ClassIdService.id('menu-toggle', this.shadow);
       if (MobileService.isMobile()) {
            let toggleIcon = ClassIdService.id('toggle-icon', this.shadow);
            let isMenuOpen = !StyleService.isDisplaying(toggleItem);
            StyleService.setDisplay(toggleItem, isMenuOpen);
            toggleIcon.src = isMenuOpen ? './'+btnMap.mobile.menuClose : './'+btnMap.mobile.menuOpen;
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

                    ${ScreenQuery.mobile(`
                        position: fixed;
                        height: 60px;
                    `)}
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
                    
                    ${ScreenQuery.mobile(`
                        display: block;
                    `)}
                }
            </style>
            <header class="header">
                <split-line height="10"></split-line>
                <div class="logo-menu">
                    ${RenderService.showComponent(HeaderBoard.logo.enabled, '<header-logo></header-logo>')}
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
