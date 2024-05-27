import { SettingsChecker } from '../../../services/helpers/settingsChecker';
import { CarouselSetIds } from './enums';
import { BannerCarouselSets } from './sets';

export class BannerCarouelHelper {
    static getId(id = CarouselSetIds.banner) {
        return SettingsChecker.getId(id, CarouselSetIds, BannerCarouselSets);
    }
}