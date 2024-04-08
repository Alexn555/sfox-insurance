import { theme } from '../../theme/theme';
import { getCommonButton } from '../../styles';
import { LinkTypes } from '../../components/common/ui';

class ActionButton extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.label = this.getAttribute('label') || 'Go';
        this.buttonType = this.getAttribute('type') || 'action';
        this.addCl = '';
    }
    
    connectedCallback() {
        this.render();
    }

    setColor() {
        const { button: btn } = theme.ui;
        let color = btn.default;
        switch(this.buttonType) {
            case LinkTypes.transparentButton:
                color = 'transparent';
                this.addCl = 'link';
            break;
        }
        return color;
    }

    render() {
        const styles = getCommonButton();
        this.shadow.innerHTML = `
            <style>
                .link {
                    color: black !important;
                    text-decoration: underline;
                }

                .action-link {
                    background-color: ${this.setColor()};
                    ${styles.main}
                    ${styles.hover}
                }
            </style>
            <button class="action-link ${this.addCl}">
                ${this.label}
            </button>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('action-link', ActionButton);
}
