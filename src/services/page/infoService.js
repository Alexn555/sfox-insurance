import { ServerService } from '../helpers';
import mockDisclaimerData from '../../data/mocks/disclaimer';

export default class InfoService {
    static getDisclaimer() {
        return ServerService.simulateDelay(1000).then(() => { return mockDisclaimerData; });
    }
}