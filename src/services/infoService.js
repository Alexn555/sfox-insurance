import { simulateDelay } from './utils';
import mockDisclaimerData from '../data/mocks/disclaimer';

export default class InfoService {

    getDisclaimer() {
        return simulateDelay(1000).then(() => { return mockDisclaimerData; });
    }

}