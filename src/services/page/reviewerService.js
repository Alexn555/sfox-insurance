import { JSONService } from '../utils';
import { ServerService } from '../helpers';
import { Reviews } from '../../pages/reader/reviewer/reviews';

export default class ReviewerService {
    static getBasic(tm = 1000, parse = true) {
        return ServerService.simulateDelay(tm).then(() => {
             return parse ? JSONService.set(Reviews) : Reviews; 
        });
    }
}