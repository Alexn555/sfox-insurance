// packs
import { generalNoteTheme } from '../components/ui/generalNote/theme';
import { paginatableContentTheme } from '../components/ui/paginatableContent/theme';
import { GalleryPageTheme } from '../pages/additional/gallery/theme';
import { ImageViewerTheme } from '../components/ui/imageViewer/theme';
import ThemeHelper from './themeHelper';

export default class ThemePackHandler {
  static addPlugins(_theme, curTheme, addPack) {
        if (addPack) {
            const packs = [
                { id: 'generalNote', pack: generalNoteTheme },
                { id: 'paginatableContent', pack: paginatableContentTheme },
                { id: 'galleryPage', pack: GalleryPageTheme },
                { id: 'imageViewer', pack: ImageViewerTheme },
            ];
            packs.forEach((pack) => {
                _theme[pack.id] = ThemeHelper.handlePack(pack.pack, pack.id, curTheme);
            });
        }
        return _theme; 
    }
}