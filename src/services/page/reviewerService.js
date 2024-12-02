import { JSONService } from '../utils';
import { ServerService } from '../helpers';
import { Reviews } from '../../pages/reader/reviewer/reviews';
import { AdvReviews } from '../../pages/reader/reviewer/advReviews';

export default class ReviewerService {
    static getBasic(tm = 1000, parse = true) {
      return ServerService.simulateDelay(tm).then(() => {
        return parse ? JSONService.set(Reviews) : Reviews; 
      });
    }

    static getAdv(tm = 1000, parse = true) {
      return ServerService.simulateDelay(tm).then(() => {
        return parse ? JSONService.set(AdvReviews) : AdvReviews; 
      });
    }

    static async getContent(page = 0) {
      let content;
      switch (page) {
        case 0:
        default:
          content = await ReviewerService.getBasic();
        break;
        case 1: 
          content = await ReviewerService.getAdv();
        break;
      }
      return content;
    }
}