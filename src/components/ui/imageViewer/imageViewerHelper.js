import LoggerService from '../../../services/loggerService';
import { ImageViewerSettings, ImageViewerIds } from '../../../settings/';

export class ImageViewerHelper {
    static getId(id = ImageViewerIds.writer) {
        let cont = ImageViewerSettings[id];
        if (!cont) {
            cont = ImageViewerSettings[ImageViewerIds.common];
            LoggerService.warn(`ImageViewer container not found id:"${id}", using common id`);
        }
        return cont;
    }
}