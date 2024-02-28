// @ts-nocheck
import { theme } from '../theme/theme';

class AppSettings extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.theme = 'main1';
    }
    
    connectedCallback() {
        this.render();

        const thm = this.shadow.querySelector(`#themeMain`);
        thm.onclick = (() => {
            this.setTheme('main1');
        });
        const thm5 = this.shadow.querySelector(`#themeBlue`);
        thm5.onclick = (() => {
           this.setTheme('blue');
        });
        const thm2 = this.shadow.querySelector(`#themeBlack`);
        thm2.onclick = (() => {
            this.setTheme('black');
        });
        const thm3 = this.shadow.querySelector(`#themeRed`);
        thm3.onclick = (() => {
            this.setTheme('red');
        });
        const thm4 = this.shadow.querySelector(`#themeYellow`);
        thm4.onclick = (() => {
           this.setTheme('yellow');
        });


        const elClose = this.shadow.querySelector(`#close`);
            elClose.onclick = (() => {
            elClose.className += ' close';
            document.dispatchEvent(new CustomEvent('settings-close', { bubbles: false, cancelable: false }));
        });
    }

    setTheme(theme = 'main1') {
        this.theme = theme;
        document.dispatchEvent(new CustomEvent('settings-theme-changed', { detail:{ value: this.theme }, bubbles: false, cancelable: false }));
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                @keyframes closeAnimation{
                    0%{
                      opacity: 1;
                      transform: rotateX(90deg);
                    }
                    50%{
                      opacity: 0.5;
                      transform: rotateX(0deg);
                    }
                    100%{
                      display: none;
                      opacity: 1;
                      transform: rotateX(90deg);
                    }
                  }
                  
                 .settings {
                    background-color: ${theme.layout.background};
                    padding: 0 0 0 50px;
                 }

                 .close {
                    animation-name: closeAnimation;
                    animation-duration: 2000ms;
                    animation-fill-mode: forwards;
                 }

                .settings-list {
                    & div {
                        display: inline-block;
                        padding: 10px;
                    }
                }
            </style>
            <div class="settings">
                <h2>Main Settings</h2>
                <div class="settings-list">
                    <div>
                        <action-button id="themeMain" label="Main Theme" type="action" />
                    </div>
                    <div>
                        <action-button id="themeBlue" label="Blue Theme" type="action" />
                    </div>
                    <div>
                        <action-button id="themeBlack" label="Black Theme" type="action" />
                    </div>
                    <div>
                        <action-button id="themeRed" label="Red Theme" type="action" />
                    </div>
                    <div>
                        <action-button id="themeYellow" label="Yellow Theme" type="action" />
                    </div>
                    <div>
                        <action-button id="close" label="Close" type="passive" />
                    </div>
                </div> 
            </div> 
        `;
    }
}


if ('customElements' in window) {
	customElements.define('main-settings', AppSettings);
}
