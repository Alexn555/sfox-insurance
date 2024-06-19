import { JSONService } from '../../services/utils';
import { ServerService } from '../helpers';
import { QuestionsBasic} from '../../pages/safe/faq/basic';
import { QuestionsAdvenced} from '../../pages/safe/faq/advenced';

export default class FAQService {
    static getBasic(tm = 1000, parse = true) {
        return ServerService.simulateDelay(tm).then(() => {
             return parse ? JSONService.set(QuestionsBasic) : QuestionsBasic; 
        });
    }
    static getAdvenced(tm = 1000, parse = true) {
        return ServerService.simulateDelay(tm).then(() => { 
            return parse ? JSONService.set(QuestionsAdvenced) : QuestionsAdvenced; 
        });
    }
}