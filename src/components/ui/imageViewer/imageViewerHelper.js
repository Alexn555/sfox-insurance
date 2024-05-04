import { LoggerService } from '../../../services/';
import { MobileService, JSONService } from '../../../services/utils';
import { ImageViewerSettings, ImageViewerIds } from './sets';

export class ImageViewerHelper {

    static getId(id = ImageViewerIds.writer) {
        let cont = ImageViewerSettings[id];

        let propertiesAmount = 0;
        if (ImageViewerSettings.allLevelsCount) {
            propertiesAmount = JSONService.set(cont).match(/[^\\]":/g).length;
        } else {
            propertiesAmount = Object.keys(cont).length;
        }

        if (!cont) {
            cont = ImageViewerSettings[ImageViewerIds.common];
            LoggerService.warn(`ImageViewer container not found id:"${id}", using common id`);
        }
        if (propertiesAmount !== ImageViewerSettings.propertyAmount || 
            propertiesAmount < ImageViewerSettings.propertyAmount) {
            LoggerService.warn(`ImageViewer container with id:"${id}", currently having less [properties] than required!`);
        }
        return cont;
    }

    static updateSize(largeScreen) {
      const mobile = MobileService.isMobile();
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      let factors = mobile ? { w: 1.1, h: 1.1 } : { w: 1.1, h: 1.2 };
      if (window.innerWidth > largeScreen) {
        factors = { w: 1.5, h: 1.2 };
      }
      return { mobile, screenW, screenH, factors };
    }

    static getZommArrows(key, keys) {
        const left = key === keys.left ? '<b>[<- key]</b>': '[<- key]';
        const right = key === keys.right ? '<b>[key ->]</b>' : '[key ->]'; 
        return { left, right };
    }
}