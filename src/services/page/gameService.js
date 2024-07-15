import { JSONService } from '../../services/utils';
import { gmVwGames } from '../../pages/additional/games/games';
import { gmSfGames } from '../../pages/safe/games/safeGames';
import { ServerService } from '../helpers';

export default class GameService {
    static getGamePageGames(tm = 1000) {
        return ServerService.simulateDelay(tm).then(() => {
            return JSONService.set(gmVwGames);
        });
    }

    static getSafeGames(tm = 1000) {
        return ServerService.simulateDelay(tm).then(() => {
            return JSONService.set(gmSfGames);
        });
    }
}