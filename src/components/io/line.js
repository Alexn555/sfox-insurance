import { theme } from '../../theme/theme';

class SplitLine extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.height = this.getAttribute('height') || '6px';
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                .split-line {
                    --start-color: ${theme.ui.line.start};
                    --mid-color: ${theme.ui.line.mid};
                    --end-color: ${theme.ui.line.end};
                    height: ${this.height}px;
                    background-image: linear-gradient(90deg, var(--start-color) 0%, var(--mid-color) 35%, var(--end-color) 100%);
                }
            </style>
            <div class="split-line"></div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('split-line', SplitLine);
}
