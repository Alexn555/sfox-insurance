import { ServerService } from '../helpers';
import performanceBannerData from '../../data/mocks/performance';
import DataStorage from '../storage';

export default class BannerService {
    constructor () {
        this.dataStorage = new DataStorage();
    }
    
    getSavedData(savedBannerDataId) {
        return this.dataStorage.getItem(savedBannerDataId);
    }

    getPerformance(savedBannerDataId) {
        let data = performanceBannerData;

        return ServerService.simulateDelay(1000).then(() => { 
            const savedData = this.dataStorage.getItem(savedBannerDataId);
            let isSaved = false;
            if (savedData) {
                data = savedData;
            } else {
                this.dataStorage.save(savedBannerDataId, data);
                setTimeout(() => { isSaved = true; }, 1000);
            }
            return { data, isSaved }; 
        });
    }

}