// packs
import { StartPageTheme } from '../pages/start/theme';
import { SafePageTheme } from '../pages/safe/theme';
import { generalNoteTheme } from '../components/ui/generalNote/theme';
import { paginatableContentTheme } from '../components/ui/paginatableContent/theme';
import { GalleryPageTheme } from '../pages/additional/gallery/theme';
import { ImageViewerTheme } from '../components/ui/imageViewer/theme';
import { contentSwitcherTheme } from '../components/ui/contentSw/theme';
import { GameViewerTheme } from '../components/ui/gameViewer/theme';

import { PackIds } from './enums';
import ThemeHelper from './themeHelper';

export default class ThemePackHandler {
  static addPlugins(_theme, curTheme, addPack) {
        if (addPack) {
            const packs = [
                { id: PackIds.startPage, pack: StartPageTheme },
                { id: PackIds.safePage, pack: SafePageTheme },
                { id: PackIds.generalNote, pack: generalNoteTheme },
                { id: PackIds.paginatableContent, pack: paginatableContentTheme },
                { id: PackIds.galleryPage, pack: GalleryPageTheme },
                { id: PackIds.imageViewer, pack: ImageViewerTheme },
                { id: PackIds.contentSw, pack: contentSwitcherTheme },
                { id: PackIds.gameViewer, pack: GameViewerTheme }
            ];
            packs.forEach((pack) => {
                _theme[pack.id] = ThemeHelper.handlePack(pack.pack, pack.id, curTheme);
            });
        }
        return _theme; 
    }
}