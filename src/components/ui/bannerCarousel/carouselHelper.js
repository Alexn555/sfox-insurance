import { CarouselSetIds } from './enums';
import { BannerCarouselSets } from './sets';
import { LoggerService, } from '../../../services';
import { JSONService } from '../../../services/utils';

export class BannerCarouelHelper {
    static getId(id = CarouselSetIds.banner) {
        let cont = BannerCarouselSets[id];

        let propertiesAmount = 0;
        if (BannerCarouselSets.allLevelsCount) {
            propertiesAmount = JSONService.set(cont).match(/[^\\]":/g).length;
        } else {
            propertiesAmount = Object.keys(cont).length;
        }

        if (!cont) {
            cont = BannerCarouselSets[CarouselSetIds.common];
            LoggerService.warn(`BannerCarousel container not found id:"${id}", using common id`);
        }
        if (propertiesAmount !== BannerCarouselSets.propertyAmount || 
            propertiesAmount < BannerCarouselSets.propertyAmount) {
            LoggerService.warn(`BannerCarousel container with id:"${id}", currently having less [properties] than required!`);
        }
        return cont;
    }
}