// @ts-nocheck
import { theme } from '../../theme/theme';
import { JSONService } from '../../services/utils';

class HomeTabs extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'closed'});
      this.theme = theme.page.tabs;
      this.$menu = [
        { id: 'tab-menu-search', label: 'Start' },
        { id: 'tab-menu-welcome', label: 'Welcome' },
        { id: 'tab-menu-features', label: 'Features' },
        { id: 'tab-menu-accounts', label: 'Accounts', sideBtn: false }
      ];
      this.$slots = [
        { id: 'start', name: 'start' },
        { id: 'welcome', name: 'welcome' },
        { id: 'features', name: 'features' },
        { id: 'accounts', name: 'accounts' }
      ];
    }
    
    connectedCallback() {
      this.shadow.innerHTML = `
        <tab-selector
          id="start"
          theme='${JSONService.set(theme.page.tabs)}'
          stls='${JSONService.set({
            width: '100%',
            height: '280px', 
            padding: '0',
            margin: '0' 
          })}'
          menu='${JSONService.set(this.$menu)}'
          slots='${JSONService.set(this.$slots)}'
        >
          <div slot="${this.$slots[0].name}">
            <start-page></start-page>
          </div> 

          <div slot="${this.$slots[1].name}">
            <welcome-page></welcome-page>
          </div> 

          <div slot="${this.$slots[2].name}">
            <features-page></features-page>
          </div>
          
          <div slot="${this.$slots[3].name}">
            <home-accounts-page></home-accounts-page>
          </div> 
        </tab-selector>
      `;
    }
}

if ('customElements' in window) {
	customElements.define('home-tabs', HomeTabs);
}
