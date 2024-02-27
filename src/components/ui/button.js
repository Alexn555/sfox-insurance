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
        let color = '#ee7023';
        switch(this.buttonType) {
            case 'action':
            default:
                color = '#913a83';
            break;
            case 'passive':
                color = '#31a3ae';
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
