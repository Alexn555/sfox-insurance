import { SettingsChecker } from '../../../services/helpers/settingsChecker';
import { IdService, StyleService, HTMLService } from '../../../services';
import { CarouselSetIds } from './enums';
import { BannerCarouselSets } from './sets';

export class BannerCarouelHelper {
    static getId(id = CarouselSetIds.banner) {
        return SettingsChecker.getId(id, CarouselSetIds, BannerCarouselSets);
    }

    static setError($error, msg, ctx) {
        this.toggleStatusCl('status', 'error', ctx);
        HTMLService.html($error, msg);
        setTimeout(() => { HTMLService.html($error, ''); }, 2000);
    }
  
    static toggleStatusCl(id, status, ctx) {
        const el = IdService.id(id, ctx);
        if (el) {
            StyleService.removeAndAddClass(el, ['error', 'success'], status);
        }
    }

    static getSceneSizes(items, itemSet) {
        let amount = items.length;
        let w = amount > 0 ? (amount + 1) * itemSet.w : itemSet.w;
        return { w, h: itemSet.h };
    }
}