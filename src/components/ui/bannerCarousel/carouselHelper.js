import { CarouselSetIds } from './enums';
import { BannerCarouselSets } from './sets';
import { SettingsChecker } from '../helpers/settingsChecker';

export class BannerCarouelHelper {
    static getId(id = CarouselSetIds.banner) {
        return SettingsChecker.getId(id, CarouselSetIds, BannerCarouselSets);
    }
}