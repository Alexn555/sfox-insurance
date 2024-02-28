import { theme } from '../../theme/theme';

class ActionButton extends HTMLElement {
    constructor(cb) {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.label = this.getAttribute('label') || 'Go';
        this.buttonType = this.getAttribute('type') || 'action';
        this.cb = cb;
    }
    
    connectedCallback() {
        this.render();
    }

    onBtnClick() {
        this.cb();
    }

    setColor() {
        const { button: btn } = theme.ui;
        let color = btn.default;
        switch(this.buttonType) {
            case 'action':
            default:
                color = btn.action;
            break;
            case 'passive':
                color = btn.passive;
            break;
        }
        return color;
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .action-button {
                    background-color: ${this.setColor()};
                    text-align: center;
                    color: white;
                    border-radius: 4px;
                    width: fit-content;
                    padding: 10px;
                    user-select: none;
                    cursor: pointer;
                    font-weight: bold;
                }
            </style>
            <div class="action-button" onclick="this.onBtnClick()">
                ${this.label}
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('action-button', ActionButton);
}
