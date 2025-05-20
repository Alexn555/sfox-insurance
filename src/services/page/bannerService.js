// @ts-nocheck
import { ServerService } from '../helpers';
import performanceBannerData from '../../data/mocks/performance';

export default class BannerService {
    getSavedData(savedBannerDataId) {
        return window.DataStorage.getItem(savedBannerDataId);
    }

    getPerformance(savedBannerDataId) {
        let data = performanceBannerData;
        return ServerService.simulateDelay(1000).then(() => { 
            const savedData = window.DataStorage.getItem(savedBannerDataId);
            let isSaved = false;
            if (savedData) {
                data = savedData;
            } else {
                window.DataStorage.save(savedBannerDataId, data);
                setTimeout(() => { isSaved = true; }, 1000);
            }
            return { data, isSaved }; 
        });
    }
}