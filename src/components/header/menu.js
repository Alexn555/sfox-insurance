import { theme } from '../../theme/theme';

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

    setOverlay() {
        document.dispatchEvent(new CustomEvent('header-menu-overlay', { bubbles: true, cancelable: false }));
     }
     
    removeOverlay() {
        document.dispatchEvent(new CustomEvent('header-menu-overlay-remove', { bubbles: true, cancelable: false }));
     }
     

    toggleMenuItem(evt) {
        const { target } = evt;
        const item =  target.id;
        const selectedItem = item === 'home' ? 0 : 1;
        document.dispatchEvent(new CustomEvent('header-menu-click', { detail: {value: item}, bubbles: true, cancelable: false }));
        
        const searchCl = this.shadow.querySelectorAll('.header-menu-item');
    
        if (searchCl && searchCl.length > 0) {
            searchCl[0].setAttribute('class', 'header-menu-item');
            searchCl[1].setAttribute('class', 'header-menu-item');
            const selected = searchCl[selectedItem];
            if (selected) {
                selected.setAttribute('class', 'header-menu-item header-menu-item-active');
            }
        }
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .header-menu {
                    display: grid;
                    width: 100vw;
                    height: 52px;
                    grid-template-columns: 50% 50%;
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
                        <img src="./assets/home.svg" alt="home" /> <br />
                        Home
                </div>
                <div 
                    class="header-menu-item" 
                    id="insurance"
                    onmouseover="this.setOverlay()" 
                    onmouseout="this.removeOverlay()" 
                    onclick="this.toggleMenuItem(event)">
                        <img src="./assets/wallet.svg" alt="insurance" /> <br />
                        Everyday performance
                    </div>
            </div>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('header-menu', HeaderMenu);
}
