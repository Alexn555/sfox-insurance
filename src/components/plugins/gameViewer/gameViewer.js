// @ts-nocheck
// Gif loading icon (c) cons8.com/preloaders
import { ThemeHelper } from '../../../theme/theme';
import { CustomEventService, IdService, LoggerService, HTMLService } from '../../../services';
import { NumberService, JSONService, ObjectService } from '../../../services/utils';
import { CustomWindowEvents } from '../../../settings';
import { GameViewerHelper } from './gameViewerHelper';
import { styleErrors } from '../../common/styles/errors';
import { BoolEnums } from '../../../enums';
import { GameViewerSetEnums, GameViewerSettings } from './sets';
import { LabelIcons } from '../contentSw/enums';
import { PackIds } from '../../../theme/enums';

class GameViewer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.id = this.getAttribute('id') || 'game-viewer';
        this.games = this.getAttribute('games') || '[]';
        this.setsId = this.getAttribute('setsId') || GameViewerSetEnums.gamePage;
        this.sets = ObjectService.getObject('gameViewer', GameViewerSettings[this.setsId]);
        this.displayLabel = this.sets.displayLabel;
        this.side = this.sets.side;
        this.currentIndex = 0;
        this.gamesAmount = 0;
        this.contentSwid = 'gameContentSw';
        this.sessionId = NumberService.randomInteger(0, 200);
        this.theme = ThemeHelper.get([PackIds.gameViewer]);
        this.setGames();
    }
    
    connectedCallback() {
        this.render();
        this.$container = IdService.id(this.id, this.shadow);
        this.$loading = IdService.id('loading', this.shadow);
        this.$error = IdService.id('error', this.shadow);
        this.$cntSwitcher = IdService.id('gameContentSw', this.shadow);

        this.activateGame(0);
        CustomEventService.event(`${CustomWindowEvents.contentSw.pageClick}-${this.contentSwid}`, (e) => {
            this.currentIndex = e.detail.value;
            this.activateGame(this.currentIndex - 1);
        });
    }

    disconnectedCallback() {
        CustomEventService.removeList([`${CustomWindowEvents.contentSw.pageClick}-${this.contentSwid}`]);
    }

    activateGame(index) {
        if (index < 0 || index > this.gamesAmount) {
            LoggerService.error('GameViewer index out of games boundaries');
            HTMLService.text(this.$error, 'Error Index for game not found');
            return;
        }

        const game = this.games[index];
        this.toggleContentLoaded(false);

        GameViewerHelper.setLoading(NumberService.randomInteger(1, 3), game.title, this.$loading, () => {   
           let html = this.setGame(game, this.sessionId); 
           HTMLService.html(this.$container, html);
           this.toggleContentLoaded(true);
        });
    }

    toggleContentLoaded(toggle) {
        this.$cntSwitcher.setAttribute('disable-actions', toggle ? BoolEnums.bFalse : BoolEnums.bTrue);
    }

    setGames() {
        if (this.games) {
            this.games = JSONService.getArray(this.games);
            this.gamesAmount = this.games && this.games.length > 0 ? this.games.length : 0;
        }
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

    render() {
        this.shadow.innerHTML = `
            <style>
              .game-viewer-wrapper {
                position: relative;
                background-color: ${this.sets.background ? this.theme.wrapper.background : 'none'};
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
                <content-sw
                  id="${this.contentSwid}"
                  per-page="1" 
                  labels='${GameViewerHelper.getGameLabels(this.games)}'
                  side="${this.side}"
                  individual-icons='${GameViewerHelper.getGameIcons(this.games)}'
                  use-ind-icons="${BoolEnums.bTrue}"
                  icon-type="${LabelIcons.game.id}"
                  total="${this.gamesAmount}"
                  disable-actions="${BoolEnums.bFalse}"
                  styles="${this.contentSwid}"
                >
                    <div id="${this.id}"> </div>
                </content-sw>
            <div>
        `;
    }
}

if ('customElements' in window) {
	customElements.define('game-viewer', GameViewer);
}
