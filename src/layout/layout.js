// @ts-nocheck
import { Animations, CommonEvents, CustomEvents, PageStructure } from '../settings';
import { ClassIdService, CustomEventService, StyleService } from '../services';
import { MobileService } from '../services/utils';
import { RenderService } from '../services/helpers';
import { theme } from '../theme/theme';
import DataStorage from '../services/storage';
import { HeaderBoard, FooterBoard } from '../settings';

class Layout extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        CustomEventService.event(CommonEvents.resize, this.updateSize.bind(this), window);
        CustomEventService.event(CustomEvents.settings.moveLayout, (e) => {
            this.moveLayout(e.detail.value);
        }, document);

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
        this.laytOffsetSettings = MobileService.isMobile() ? '60' : '0';
    }

    moveLayout(settingsToggle) {
        const container = ClassIdService.id('layout', this.shadow);
        const top = settingsToggle ? `-${PageStructure.settings.height + PageStructure.settings.layoutOffset}` : this.laytOffsetSettings;
        StyleService.setProperties(container, [
            { property: 'transform', value: `translateY(${top}px)` },
            { property: 'transitionDuration', value: `${this.animationDuration}s` },
        ])
        CustomEventService.send(CustomEvents.settings.toggle, settingsToggle);
        
        setTimeout(() => {
            StyleService.setProperty(container, 'transform', 'translateY(0)');
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

                ${RenderService.showComponent(HeaderBoard.board.enabled, '<header-section></header-section>')}

                <page-switcher></page-switcher>

                ${RenderService.showComponent(FooterBoard.board.enabled, '<footer-section></footer-section>')}
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('main-layout', Layout);
}
