import { theme } from '../../theme/theme';
import ScreenQuery from '../../styles/query';
import { CustomEvents, MouseEvents } from '../../settings';
import { imageMap } from '../../components/common/assets';
import { HeaderMenuLinks } from '../../enums/menuLinks';
import { ClassIdService, CustomEventService, IdService } from '../../services';
import { ArrayService } from '../../services/utils';

class HeaderMenu extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});

        CustomEventService.event(CustomEvents.header.changeActivePage, (e) => {
            const selectedItem = e.detail.value;
            this.toggleMenuItem(selectedItem); 
        });
    }
    
    connectedCallback() {
        this.render();
        this.initForm();
        this.shadow.addEventListener(MouseEvents.mouseover, this.setOverlay.bind(this));
        this.shadow.addEventListener(MouseEvents.mouseout, this.removeOverlay.bind(this));
    }

    initForm() {
        this.$home = IdService.idAndClick('home', this.shadow, () => {
            this.toggleMenuItem(HeaderMenuLinks.Home);
        });
        this.$insurance = IdService.idAndClick('insurance', this.shadow, () => {
            this.toggleMenuItem(HeaderMenuLinks.Insurance);
        });
        this.$additional = IdService.idAndClick('additional', this.shadow, () => {
            this.toggleMenuItem(HeaderMenuLinks.Additional);
        });
    }

    disconnectedCallback() {
        CustomEventService.removeFromContext(MouseEvents.mouseover, this.shadow);
        CustomEventService.removeFromContext(MouseEvents.mouseout, this.shadow);
        IdService.removeList([this.$home, this.$insurance, this.$additional]);
    }

    setOverlay() {
        CustomEventService.send(CustomEvents.header.menuOverlay);
    }
     
    removeOverlay() {
        CustomEventService.send(CustomEvents.header.menuOverlayRemove);
    }

    toggleMenuItem(evt) {
        const item = evt;
        const selectedItem = this.setSelected(item);
        CustomEventService.send(CustomEvents.header.menuClick, item);
        this.setHighlighted(selectedItem);
    }

    setHighlighted(selectedItem) {
        const searchCl = ClassIdService.idAll('header-menu-item', this.shadow);
        if (ArrayService.minLength(searchCl)) {
            searchCl.forEach((item, index) => {
                searchCl[index].setAttribute('class', 'header-menu-item');
            });
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

                    ${ScreenQuery.mobile(`
                        grid-template-columns: 100%;
                        background-color: ${theme.header.menu.background};
                        height: fit-content;
                    `)}
                }
                .header-menu-item {
                    border: 1px solid ${theme.header.menu.line};
                    border-bottom: none;
                    text-align: center;
                    align-items: center;
                    cursor: pointer;
                    padding-top: 8px;

                    & img {
                        ${ScreenQuery.mobile(`
                            display: none;
                        `)}
                    }

                    ${ScreenQuery.mobile(`
                        text-align: left;
                        align-items: center;
                        font-weight: bold;
                        padding: 0 0px 10px 20px;
                    `)}
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
                    id="home">
                        <img src="./${imageMap.menuHome}" alt="home" /> <br />
                        Home
                </div>
                <div 
                    class="header-menu-item" 
                    id="insurance">
                        <img src="./${imageMap.menuInsurance}" alt="insurance" /> <br />
                        Everyday performance
                 </div>
                 <div 
                    class="header-menu-item" 
                    id="additional">
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
