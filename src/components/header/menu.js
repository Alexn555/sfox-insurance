import { theme } from '../../theme/theme';
import { CustomEvents } from '../../components/common/settings';
import { imageMap } from '../../components/common/assets';
import { CustomEventService } from '../../services';

class HeaderMenu extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
        this.shadow.addEventListener('click', this.toggleMenuItem.bind(this));
        this.shadow.addEventListener('mouseover', this.setOverlay.bind(this));
        this.shadow.addEventListener('mouseout', this.removeOverlay.bind(this));
        this.render();
    }

    disconnectedCallback() {
        this.shadow.removeEventListener('click', null);
        this.shadow.removeEventListener('mouseover', null);
        this.shadow.removeEventListener('mouseout', null);
    }

    setOverlay() {
        CustomEventService.send(CustomEvents.header.menuOverlay);
    }
     
    removeOverlay() {
        CustomEventService.send(CustomEvents.header.menuOverlayRemove);
    }

    toggleMenuItem(evt) {
        const { target } = evt;
        const item =  target.id;
        const selectedItem = this.setSelected(item);
        
        CustomEventService.send(CustomEvents.header.menuClick, item);
        
        const searchCl = this.shadow.querySelectorAll('.header-menu-item');
    
        if (searchCl && searchCl.length > 0) {
            searchCl[0].setAttribute('class', 'header-menu-item');
            searchCl[1].setAttribute('class', 'header-menu-item');
            searchCl[2].setAttribute('class', 'header-menu-item');
            const selected = searchCl[selectedItem];
            if (selected) {
                selected.setAttribute('class', 'header-menu-item header-menu-item-active');
            }
        }
    }

    setSelected(item) {
        let index = 0;
        switch (item) {
            case 'home':
                index = 0;
                break;
            case 'insurance':
                index = 1;
                break;
            case 'additional':
                index = 2;
                break;
        }
        return index;
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .header-menu {
                    display: grid;
                    width: 100vw;
                    height: 52px;
                    grid-template-columns: 33% 33% 33%;
                    color: #913a83;
                    user-select: none;
                    z-index: 102;

                    @media (max-width: 768px) {
                        grid-template-columns: 100%;
                        background-color: ${theme.header.menu.background};
                        height: fit-content;
                    }
                }
                .header-menu-item {
                    border: 1px solid ${theme.header.menu.line};
                    border-bottom: none;
                    text-align: center;
                    align-items: center;
                    cursor: pointer;
                    padding-top: 8px;

                    & img {
                        @media (max-width: 768px) {
                            display: none;
                        }
                    }

                    @media (max-width: 768px) {
                        text-align: left;
                        align-items: center;
                        font-weight: bold;
                        padding: 0 0px 10px 20px;
                    }
                }
                .header-menu-item-active {
                    color: ${theme.header.menu.item.active};

                    & img {
                        filter: invert(0.5) sepia(1) saturate(5) hue-rotate(360deg);
                    }
                }
            </style>
            <div class="header-menu"> 
                <div 
                    class="header-menu-item"
                    id="home"
                    onmouseover="this.setOverlay()" 
                    onmouseout="this.removeOverlay()" 
                    onclick="this.toggleMenuItem(event)">
                        <img src="./${imageMap.menuHome}" alt="home" /> <br />
                        Home
                </div>
                <div 
                    class="header-menu-item" 
                    id="insurance"
                    onmouseover="this.setOverlay()" 
                    onmouseout="this.removeOverlay()" 
                    onclick="this.toggleMenuItem(event)">
                        <img src="./${imageMap.menuInsurance}" alt="insurance" /> <br />
                        Everyday performance
                 </div>
                 <div 
                    class="header-menu-item" 
                    id="additional"
                    onmouseover="this.setOverlay()" 
                    onmouseout="this.removeOverlay()" 
                    onclick="this.toggleMenuItem(event)">
                        <img src="./${imageMap.menuAdditional}" alt="Additional" /> <br />
                        Additional
                </div>
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('header-menu', HeaderMenu);
}
