import { LoggerService } from '../../../services';
import { JSONService } from '../../../services/storage/jsonService';
import { BannerCarouselSets } from '../bannerCarousel/sets';

export class SettingsChecker {
    static getId(id, enumIds, sets) {
        let cont = sets[id];

        let propertiesAmount = 0;
        if (sets.allLevelsCount) {
            propertiesAmount = JSONService.set(cont).match(/[^\\]":/g).length;
        } else {
            propertiesAmount = Object.keys(cont).length;
        }

        if (!cont) {
            cont = BannerCarouselSets[enumIds.common];
            LoggerService.warn(`BannerCarousel container not found id:"${id}", using common id`);
        }
        if (propertiesAmount !== BannerCarouselSets.propertyAmount || 
            propertiesAmount < BannerCarouselSets.propertyAmount) {
            LoggerService.warn(`BannerCarousel container with id:"${id}", currently having less [properties] than required!`);
        }
        return cont;
    }
}