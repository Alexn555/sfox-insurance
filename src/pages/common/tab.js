// @ts-nocheck
import { theme } from '../../theme/theme';

class CommonTab extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'closed'});
      this.id = this.getAttribute('id') || '';
    }
    
    connectedCallback() {
      this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <style> 
                .tabcontent {
                  display: none;
                  padding: 6px 12px;
                  background-color: white;
                  border: 1px solid ${theme.page.tabs.border};
                  border-top: none;
                }
            </style>
            <div id="${this.id}" class="tabcontent">
              <slot></slot>
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('common-tab', CommonTab);
}
