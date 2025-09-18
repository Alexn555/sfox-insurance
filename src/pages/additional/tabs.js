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
      this.$tab = [];
      this.$btns = [];
    }
    
    connectedCallback() {
      this.render();
      this.$game = IdService.id('gameContent', this.shadow);

      this.$tab['game'] = IdService.id('game', this.shadow);
      this.$tab['map'] = IdService.id('map', this.shadow);
      this.$tab['writerform'] = IdService.id('writerForm', this.shadow);
      this.$tab['gallery'] = IdService.id('gallery', this.shadow);
      this.$tab['account'] = IdService.id('account', this.shadow);
      this.initButtons();
    }

    initButtons() {
      let { game, mapLink, writer, gallery, account } = AdditionalPage.tabLinks;

      this.$btnGame = IdService.idAndClick(game, this.shadow, () => {
        this.openTab('game', this.$tab['game']);
      });
      this.$btnMap = IdService.idAndClick(mapLink, this.shadow, () => {
        this.openTab('map', this.$tab['map']);
      });
      this.$btnWriter = IdService.idAndClick(writer, this.shadow, () => {
        this.openTab('writerForm', this.$tab['writerform']);
      });
      this.$btnGallery = IdService.idAndClick(gallery, this.shadow, () => {
        this.openTab('gallery', this.$tab['gallery']);
      });
      this.$btnAccount = IdService.idAndClick(account, this.shadow, () => {
        this.openTab('account', this.$tab['account']);
      });
    }

    disconnectedCallback() {
      IdService.removeList([this.$btnGame, this.$btnMap, this.$btnWriter, this.$btnGallery, this.$btnAccount]);
    }

    openTab(evt, selected) {
      this.$game.setAttribute('visible', BoolEnums.bFalse);

      StyleService.setDisplayMultiple([this.$tab['game'], this.$tab['map'], 
        this.$tab['writerform'], this.$tab['gallery'], this.$tab['account']], false);
  
      if (selected !== null) {
        StyleService.setDisplay(selected, true);
        this.$game.setAttribute('visible', evt === 'game' ? BoolEnums.bTrue : BoolEnums.bFalse);
      }
    }

    render() {
      let { game, mapLink, writer, gallery, account } = AdditionalPage.tabLinks;
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
