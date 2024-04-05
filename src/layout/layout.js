// @ts-nocheck
import { Animations, CommonEvents, CustomEvents, PageStructure } from '../settings';
import { isMobile } from '../services/utils';
import { theme } from '../theme/theme';
import DataStorage from '../services/storage';
import { HeaderBoard, FooterBoard } from '../settings';
import { showComponent } from '../services/utils';
import { CustomEventService } from '../services';

class Layout extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        window.addEventListener(CommonEvents.resize, this.updateSize.bind(this));
        document.addEventListener(CustomEvents.settings.moveLayout, (evt) => {
            this.moveLayout(evt.detail.value);
        });

        this.dataStorage = new DataStorage();
        this.animationDuration = Animations.topSettings;
    }
    
    connectedCallback() {
        this.render();
        this.setLayoutOffset();
    }

    updateSize() {
        this.setLayoutOffset();
    }

    setLayoutOffset() {
        this.laytOffsetSettings = isMobile() ? '60' : '0';
    }

    moveLayout(settingsToggle) {
        const container = this.shadow.querySelector('.layout');
        const top = settingsToggle ? `-${PageStructure.settings.height + PageStructure.settings.layoutOffset}` : this.laytOffsetSettings;
        container.style.transform = `translateY(${top}px)`;

        container.style.transitionDuration = `${this.animationDuration}s`;

        CustomEventService.send(CustomEvents.settings.toggle, settingsToggle);
        
        setTimeout(() => {
            container.style.transform = `translateY(0)`;
        }, this.animationDuration * 1200);
    }

    render() {  
        this.shadow.innerHTML = `
            <style>
                .layout {
                    position: relative;
                    width: 100vw;
                    background-color: ${theme.layout.background};
                    overflow-x: hidden;
                }
            </style>
            <div class="layout">
                <load-settings></load-settings>

                ${showComponent(HeaderBoard.board.enabled, '<header-section></header-section>')}

                <page-switcher></page-switcher>

                ${showComponent(FooterBoard.board.enabled, '<footer-section></footer-section>')}
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('main-layout', Layout);
}
