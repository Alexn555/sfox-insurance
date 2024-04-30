// Gif loading icon (c) cons8.com/preloaders

import { theme } from '../../../theme/theme';
import { CustomEventService, IdService, LoggerService, StyleService } from '../../../services';
import { CustomWindowEvents } from '../../../settings';
import { styleErrors } from '../../../components/common/styles/errors';
import { randomInteger } from '../../../services/utils';
import { gmVwGames } from './games';
import { BoolEnums } from '../../../enums';
import { ContentSwSides, LabelIcons } from '../contentSwitcher/enums';
import { PackIds } from '../../../theme/enums';
import { LoadingIcons } from './enums';

class GameViewer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.id = this.getAttribute('id') || 'game-viewer';
        this.displayLabel = this.getAttribute('display-label') || BoolEnums.bFalse;
        this.side = this.getAttribute('side') || ContentSwSides.right;
        this.currentIndex = 0;
        this.games = gmVwGames;
        this.gamesAmount = this.games.length;
        this.sessionId = randomInteger(0, 200);
        this.theme = theme[PackIds.gameViewer];
    }
    
    connectedCallback() {
        this.render();
        this.$container = IdService.id(this.id, this.shadow);
        this.$loading = IdService.id('loading', this.shadow);
        this.$error = IdService.id('error', this.shadow);
        this.$cntSwitcher = IdService.id('gameContentSwitcher', this.shadow);

        this.activateGame(0);
        CustomEventService.event(CustomWindowEvents.contentSwitcher.pageClick, (e) => {
            this.currentIndex = e.detail.value;
            this.activateGame(this.currentIndex - 1);
        });
    }

    disconnectedCallback() {
        CustomEventService.removeList([CustomWindowEvents.contentSwitcher.pageClick]);
    }

    activateGame(index) {
        if (index < 0 || index > this.gamesAmount) {
            LoggerService.error('GameViewer index out of games boundaries');
            this.$error.innerText = 'Error Index for game not found';
            return;
        }

        const game = this.games[index];
        this.toggleContentLoaded(false);
        this.setLoading(randomInteger(1, 3), game.title, () => {
           let html = this.setGame(game, this.sessionId); 
           this.$container.innerHTML = html;
           this.toggleContentLoaded(true);
        });
    }

    toggleContentLoaded(toggle) {
        this.$cntSwitcher.setAttribute('disable-actions', toggle ? BoolEnums.bFalse : BoolEnums.bTrue);
    }

    setLoading(timeout = 1, title, onComplete) {
        this.$loading.innerHTML =`
            <div class="loading-content">
              <div>Loading</div>
              <img src="${LoadingIcons.game.source}" alt="" />
              <div>${title}</div>
            </div>`;
        StyleService.setDisplay(this.$loading, true);
        setTimeout(() => {
            this.$loading.innerHTML = '';
            StyleService.setDisplay(this.$loading, false);
            onComplete();
        }, timeout * 1000);
    }

    setLabel(title) {
        return this.displayLabel === BoolEnums.bTrue ? `<h2>${title}</h2>` : '';
    }

    setGame(game, sessionId) {
        return `${this.setLabel(game.title)}
            <iframe 
                src="${game.link}?session=${sessionId}${game.params}"
                title="${game.title}"
                width="${game.w}"
                height="${game.h}">
            </iframe>
        `;
    }

    getGameLabels() {
        return JSON.stringify(this.games.map(game => game.title));
    }

    render() {
        this.shadow.innerHTML = `
            <style>
              .game-viewer-wrapper {
                position: relative;
                background-color: ${this.theme.wrapper.background};
                text-align: center;
              }

              #loading {
                position: absolute;
                text-align: center;
                background-color: ${this.theme.loading.background};
                top: 240px;
                width: 50%;
                heigth: 10px;
                color: ${this.theme.loading.text};
                border: 1px solid ${this.theme.loading.border};
                z-index: 2;
              }

              .loading-content {
                & div {
                    display: inline-block;
                    padding: 0 4px 0 4px;
                    transform: translateY(-26px);
                }
              }

              #error {
                ${styleErrors.commonText}
                padding: 4px;
              }

              #${this.id} {
                border: 1px solid ${this.theme.container.border};
                min-width: 500px;
                min-height: 500px;
              }  
            </style>
            <div class="game-viewer-wrapper">
                <div id="error"></div>
                <div id="loading"></div>
                <content-switcher 
                  id="gameContentSwitcher"
                  per-page="1" 
                  labels='${this.getGameLabels()}'
                  side="${this.side}"
                  icon-type="${LabelIcons.game.id}"
                  total="${this.gamesAmount}"
                  disable-actions="${BoolEnums.bFalse}"
                >
                    <div id="${this.id}"> </div>
                </content-switcher>
            <div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('game-viewer', GameViewer);
}
