// @ts-nocheck
import { theme } from '../../theme/theme';
import { TextSizes } from '../../components/common/settings';
import { ButtonTypes } from '../../components/common/ui';
import DataStorage from '../../services/storage';
import { SaveObjects } from '../../components/common/saves';

class SettignsTextSize extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.dataStorage = new DataStorage();
        this.textSizePrcnt = TextSizes.settings.default;
    }
    
    connectedCallback() {
        this.render();
        this.setTextSizeOnInit();
        this.setTextSizeHandler();   
    }

    setTextSizeHandler() {  
        const textMinus = this.shadow.getElementById('textMinus');
        const textPlus = this.shadow.getElementById('textPlus');
        textMinus.onclick = (() => {
           this.toggleTextSize('dw');
        });
        textPlus.onclick = (() => {
            this.toggleTextSize('up');
        });
    }

    setTextSizeOnInit() {
        const savePercentage = this.dataStorage.getItem(SaveObjects.settings.textSize) || 100;
        if (savePercentage) {
            this.textSizePrcnt = parseInt(savePercentage, 10);
            this.setBodyTextSize(this.textSizePrcnt);
        }
    }

    toggleTextSize(direction = 'dw') {
        const { min, max, step} = TextSizes.settings;
        if (direction === 'up') {
            this.textSizePrcnt += this.textSizePrcnt < max ? step : 0;
        } else {
            this.textSizePrcnt -= this.textSizePrcnt > min ? step : 0;
        }
        this.setBodyTextSize(this.textSizePrcnt);
        this.dataStorage.save(SaveObjects.settings.textSize, this.textSizePrcnt);
    }

    setBodyTextSize(size = TextSizes.settings.default) {
        const body = document.querySelector('body');
        const indicator = this.shadow.getElementById('indicator');
        indicator.innerHTML = `<b>${size}</b>`;
        body.style.fontSize = `${size}%`;
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .text-size {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 190px;
                    height: 60px;
                    border: 1px solid ${theme.settings.textSize.border};
                }
                .text-size-list {
                    & div {
                        display: inline-block;
                        padding: 10px;
                    }
                }
                #indicator {
                    background-color: ${theme.settings.textSize.indicator};
                }
            </style>
            <div class="text-size">
                <div class="text-size-list">
                    <div>
                        <action-button id="textMinus" label="A-" type="${ButtonTypes.highlight}" />
                    </div>
                    <div id="indicator"></div>
                    <div>
                        <action-button id="textPlus" label="A+" type="${ButtonTypes.highlight}" />
                    </div>
                </div> 
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('settings-text-size', SettignsTextSize);
}
