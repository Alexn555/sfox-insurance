import { JSONService } from '../../services/utils';
import { ServerService } from '../helpers';
import { QuestionsBasic} from '../../pages/safe/faq/basic';
import { QuestionsAdvanced} from '../../pages/safe/faq/advanced';

export default class FAQService {
    static getBasic(tm = 1000, parse = true) {
        return ServerService.simulateDelay(tm).then(() => {
             return parse ? JSONService.set(QuestionsBasic) : QuestionsBasic; 
        });
    }
    static getAdvenced(tm = 1000, parse = true) {
        return ServerService.simulateDelay(tm).then(() => { 
            return parse ? JSONService.set(QuestionsAdvanced) : QuestionsAdvanced; 
        });
    }
}