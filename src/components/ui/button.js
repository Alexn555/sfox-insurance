import { theme } from '../../theme/theme';
import { ButtonTypes } from '../../components/common/ui';

class ActionButton extends HTMLElement {
    constructor(cb) {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.label = this.getAttribute('label') || 'Go';
        this.buttonType = this.getAttribute('type') || 'action';
    }
    
    connectedCallback() {
        this.render();
    }

    setColor() {
        const { button: btn } = theme.ui;
        let color = btn.default;
        switch(this.buttonType) {
            case ButtonTypes.action:
            default:
                color = btn.action;
            break;
            case ButtonTypes.highlight:
                color = btn.highlight;
            break;
            case ButtonTypes.passive:
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
            <div class="action-button">
                ${this.label}
            </div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('action-button', ActionButton);
}
