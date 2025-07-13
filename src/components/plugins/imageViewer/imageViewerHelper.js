import { MobileService } from '../../../services/utils';
import { SettingsChecker } from '../../../services/helpers/settingsChecker';
import { ImageViewerSettings, ImageViewerIds } from './sets';

export class ImageViewerHelper {

    static getId(id = ImageViewerIds.writer) {
      return SettingsChecker.getId(id, ImageViewerIds, ImageViewerSettings);
    }

    static updateSize(largeScreen) {
      let mobile = MobileService.isMobile();
      let screenW = window.innerWidth;
      let screenH = window.innerHeight;
      let factors = mobile ? { w: 1.1, h: 1.1 } : { w: 1.1, h: 1.2 };
      if (window.innerWidth > largeScreen) {
        factors = { w: 1.5, h: 1.2 };
      }
      return { mobile, screenW, screenH, factors };
    }

    static getZommArrows(key, keys) {
      let left = key === keys.left ? '<b>[<- key]</b>': '[<- key]';
      let right = key === keys.right ? '<b>[key ->]</b>' : '[key ->]'; 
      return { left, right };
    }
}