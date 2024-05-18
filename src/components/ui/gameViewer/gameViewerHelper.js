import { HTMLService, StyleService } from '../../../services';
import { JSONService } from '../../../services/utils';
import { LoadingIcons } from './enums';

export class GameViewerHelper {
    static setLoading(timeout = 1, title, $loading, onComplete) {
        HTMLService.html($loading, `
            <div class="loading-content">
              <div>Loading</div>
              <img src="${LoadingIcons.game.source}" alt="" />
              <div>${title}</div>
            </div>`);

        StyleService.setDisplay($loading, true);
        setTimeout(() => {
            HTMLService.html($loading, '');
            StyleService.setDisplay($loading, false);
            onComplete();
        }, timeout * 1000);
    }

    static getGameLabels(games = []) {
        return JSONService.set(games.map(game => game.title));
    }

    static getGameIcons(games = []) {
        return JSONService.set(games.map(game => game.icon));
    }
}