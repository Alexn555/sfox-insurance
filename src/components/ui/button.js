import { theme } from '../../theme/theme';
import { ButtonTypes } from '../../components/common/ui';

class ActionButton extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.id = this.getAttribute('id') || '';
        this.label = this.getAttribute('label') || 'Go';
        this.buttonType = this.getAttribute('type') || 'action';
        const handle = this.getAttribute('handle-click');
        
        if (handle !== '') {
            const cbFunc = `(function ${handle})`;
            this.callbackClick = eval(cbFunc);
        }
    }
    
    connectedCallback() {
        this.render();
        const handler = this.shadow.getElementById(this.id);
        handler.onclick = (() => {
            this.callbackClick();
        });
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
                    border: none;
                    width: fit-content;
                    font-size: 14px;
                    padding: 10px;
                    user-select: none;
                    cursor: pointer;
                    font-weight: bold;

                    &:focus { 
                        outline: none;
                        box-shadow: none;
                    }
                }
            </style>
            <button class="action-button">
                ${this.label}
            </button>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('action-button', ActionButton);
}
