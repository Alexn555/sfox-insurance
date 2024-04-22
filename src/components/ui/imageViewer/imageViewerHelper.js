import { LoggerService } from '../../../services/';
import { ImageViewerSettings, ImageViewerIds } from '../../../settings/';

export class ImageViewerHelper {

    static getId(id = ImageViewerIds.writer) {
        let cont = ImageViewerSettings[id];

        let propertiesAmount = 0;
        if (ImageViewerSettings.allLevelsCount) {
            propertiesAmount = JSON.stringify(cont).match(/[^\\]":/g).length;
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
}