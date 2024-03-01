// @ts-nocheck
import { GlobalSizes, Animations } from '../components/common/settings';
import { theme } from '../theme/theme';

class Layout extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        document.addEventListener('settings-close', this.closeSettings.bind(this));
        window.addEventListener('resize', this.updateSize.bind(this));
        this.screenW = window.innerWidth;
        this.settingsToggle = true;
        this.ontainer = this.shadow.querySelector('.layout');
        this.animationDuration = Animations.topSettings;
        this.loadingNotice = '';
    }
    
    connectedCallback() {
        this.render();
        this.setLayoutOffset(true);
        
        const el = this.shadow.querySelector('#settingsOpen');
        const container = this.shadow.querySelector('.layout');

        el.addEventListener('click', () => {
           this.toggleNotice(this.settingsToggle);
           this.moveLayout(container);
        });
    }

    updateSize() {
        this.screenW = window.innerWidth;
        this.setLayoutOffset();
    }

    setLayoutOffset(isInit = false) {
        const isMobile = window.innerWidth < GlobalSizes.mobileMax;
        this.laytOffsetSettings = isMobile ? '60' : '0';
        if (isInit) {
            this.setToggle(false);
            this.moveLayout(this.shadow.querySelector('.layout'));
        }
    }

    moveLayout(container) {
        const top = this.settingsToggle ? '-140' : this.laytOffsetSettings;
        container.style.transform = `translateY(${top}px)`;

        container.style.transitionDuration = `${this.animationDuration}s`;

        document.dispatchEvent(new CustomEvent('settings-toggle', { 
            detail: { value: this.settingsToggle },
            bubbles: false, cancelable: false 
        }));

        setTimeout(() => {
            container.style.transform = `translateY(0)`;
         }, this.animationDuration * 1200);

        this.setToggle(!this.settingsToggle);
    }

    closeSettings() {
        this.setToggle(true);
        this.moveLayout(this.shadow.querySelector('.layout'));
    }

    setToggle(toggle) {
        this.settingsToggle = toggle;
    }

    toggleNotice(isClose) {
        const elDialog = this.shadow.querySelector('dialog');
        if (!isClose) {
            elDialog.showModal();
            setTimeout(() => { elDialog.close(); }, Animations.topSettings * 1000);
        }
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

                /* {this.screenW - 100}px - to avoid shifting when overlay shows */
                .settingsBtn {
                    position: absolute;
                    left: ${this.screenW - 100}px; 
                    top: 16px;
                    z-index: 2000;
                    opacity: 0.3;

                    &:hover {
                        opacity: 1;
                    }

                    @media (max-width: 768px) {
                        top: 60px;
                    }
                }
            </style>
            <div class="layout">
                <div class="settingsBtn">                
                    <action-button label="Settings" id="settingsOpen" type="action"> </action-button>
                </div>
                <dialog>
                    Loading settings...
                </dialog>

                <header-section></header-section>

                <page-switcher></page-switcher>

                <footer-section></footer-section>
            </div> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('main-layout', Layout);
}
