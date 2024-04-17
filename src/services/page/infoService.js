import { simulateDelay } from '../utils';
import mockDisclaimerData from '../../data/mocks/disclaimer';

export default class InfoService {
    static getDisclaimer() {
        return simulateDelay(1000).then(() => { return mockDisclaimerData; });
    }
}