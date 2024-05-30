// @ts-nocheck
import { theme } from '../../theme/theme';
import commonTabStyle from '../../pages/common/tabsStyle';
import { AdditionalPage } from '../../settings';
import { IdService, StyleService } from '../../services';
import { BoolEnums } from '../../enums';

class AdditionalTabs extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({mode: 'closed'});
      this.theme = theme.page.tabs;
    }
    
    connectedCallback() {
      this.render();
      this.initForm();
    }

    initForm() {
      this.$tabGame = IdService.id('game', this.shadow);
      this.$game = IdService.id('gameContent', this.shadow);
      this.$tabMap = IdService.id('map', this.shadow);
      this.$tabWriterForm = IdService.id('writerForm', this.shadow);
      this.$tabGallery = IdService.id('gallery', this.shadow);
      this.$tabAccount = IdService.id('account', this.shadow);
      this.initButtons();
    }

    initButtons() {
      const { game, mapLink, writer, gallery, account } = AdditionalPage.tabLinks;

      this.$btnGame = IdService.idAndClick(game, this.shadow, () => {
        this.openTab('game', this.$tabGame);
      });
      this.$btnMap = IdService.idAndClick(mapLink, this.shadow, () => {
        this.openTab('map', this.$tabMap);
      });
      this.$btnWriter = IdService.idAndClick(writer, this.shadow, () => {
        this.openTab('writerForm', this.$tabWriterForm);
      });
      this.$btnGallery = IdService.idAndClick(gallery, this.shadow, () => {
        this.openTab('gallery', this.$tabGallery);
      });
      this.$btnAccount = IdService.idAndClick(account, this.shadow, () => {
        this.openTab('account', this.$tabAccount);
      });
    }

    disconnectedCallback() {
      IdService.removeList([this.$btnGame, this.$btnMap, this.$btnWriter, this.$btnGallery, this.$btnAccount]);
    }

    openTab(evt, selected) {
      this.$game.setAttribute('visible', BoolEnums.bFalse);

      StyleService.setDisplayMultiple([this.$tabGame, this.$tabMap, 
        this.$tabWriterForm, this.$tabGallery, this.$tabAccount], false);
  
      if (selected !== null) {
        StyleService.setDisplay(selected, true);
        this.$game.setAttribute('visible', evt === 'game' ? BoolEnums.bTrue : BoolEnums.bFalse);
      }
    }

    render() {
      const { game, mapLink, writer, gallery, account } = AdditionalPage.tabLinks;
        this.shadow.innerHTML = `
            <style>
              ${commonTabStyle(this.theme)}

              #writerForm {
                display: block;
              }
            </style>
            <div class="tab">
              <button id="${game}">Game</button>
              <button id="${mapLink}">Map</button>
              <button id="${writer}">Writer content</button>
              <button id="${gallery}">Gallery</button>
              <button id="${account}">Account</button>
            </div>
            
            <div id="game" class="tabcontent">
              <game-page id="gameContent"></game-page>
            </div>

            <div id="map" class="tabcontent">
              <map-page></map-page>
            </div>   
            
            <div id="writerForm" class="tabcontent">
              <writer-form></writer-form>
            </div> 

            <div id="gallery" class="tabcontent">
              <gallery-page></gallery-page>
            </div> 
            
            <div id="account" class="tabcontent">
              <account-page></account-page>
            </div> 
        `;
    }
}

if ('customElements' in window) {
	customElements.define('additional-tabs', AdditionalTabs);
}
