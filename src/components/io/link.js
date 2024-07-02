import { theme } from '../../theme/theme';
import { getCommonButton } from '../../styles';
import { LinkTypes, LinkVariants } from '../common/ui';

class ActionButton extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.label = this.getAttribute('label') || 'Go';
        this.buttonType = this.getAttribute('type') || 'action';
        this.variant = this.getAttribute('variant') || '';
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

    setAdditional() {
        let addStyle = '';
        if (this.variant === LinkVariants.thinText) {
            addStyle = 'font-weight: normal;';
        }
        return addStyle;
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
                    ${this.setAdditional()}
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
