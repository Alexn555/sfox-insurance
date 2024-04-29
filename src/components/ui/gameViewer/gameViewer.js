// Gif loading icon (c) cons8.com/preloaders

import { CustomEventService, IdService, LoggerService, StyleService } from '../../../services';
import { CustomWindowEvents } from '../../../settings';
import { styleErrors } from '../../../components/common/styles/errors';
import EnvService from '../../../services/api/envService';
import { randomInteger } from '../../../services/utils';
import { gmVwGames } from './games';

class GameViewer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.id = this.getAttribute('id') || 'game-viewer';
        this.displayLabel = this.getAttribute('display-label') || '0';
        this.side = this.getAttribute('side') || 'right';
        this.currentIndex = 0;
        this.games = gmVwGames;
        this.gamesAmount = this.games.length;
        this.sessionId = randomInteger(0, 200);
    }
    
    connectedCallback() {
        this.render();
        this.$container = IdService.id(this.id, this.shadow);
        this.$loading = IdService.id('loading', this.shadow);
        this.$error = IdService.id('error', this.shadow);

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
        this.setLoading(2, game.title, () => {
           let html = this.setGame(game.title, game.link, this.sessionId, game.w, game.h); 
           this.$container.innerHTML = html;
        });
    }

    setLoading(timeout = 1, title, onComplete) {
        this.$loading.innerHTML =`
            <div class="loading-content">
              <div>Loading</div>
              <img src="${EnvService.getRoot()}assets/gameviewer/loading.gif" alt="" />
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
        return this.displayLabel === '1' ? `<h2>${title}</h2>` : '';
    }

    setGame(title, link, session = '', w = 550, h = 500) {
        return `${this.setLabel(title)}
            <iframe 
                src="${link}?session=${session}"
                title="${title}"
                width="${w}"
                height="${h}">
            </iframe>
        `;
    }

    render() {
        this.shadow.innerHTML = `
            <style>
              .game-viewer-wrapper {
                position: relative;
                background-color: #dcdcdc;
                text-align: center;
              }

              #loading {
                position: absolute;
                text-align: center;
                background-color: white;
                top: 240px;
                width: 50%;
                heigth: 10px;
                border: 1px solid blue;
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
                border: 1px solid black;
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
                  side="${this.side}"
                  total="${this.gamesAmount}"
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
