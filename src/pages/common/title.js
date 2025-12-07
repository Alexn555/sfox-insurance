import { theme } from '../../theme/theme';
import ScreenQuery from '../../styles/query';
import { TextSizes } from '../../settings';

class PageTitle extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.title = this.getAttribute('title');
    }
    
    connectedCallback() {
        this.shadow.innerHTML = `
            <style>
                .title {
                    color: ${theme.page.common.title};
                    font-weight: bold;
                    font-size: 24px;
                    opacity: 0.3;
                    padding: 0;

                    margin-block-start: 0.5em;
                    margin-block-end: 0.3em;
                    margin-inline-start: 0px;
                    margin-inline-end: 0px;

                    ${ScreenQuery.mobile(`
                        font-size: ${TextSizes.page.title.mobile}px;
                        padding: 10px;
                    `)}
                }
            </style>
            <h2 class="title">${this.title}</h2>
        `;
    }
}


if ('customElements' in window) {
	customElements.define('page-title', PageTitle);
}