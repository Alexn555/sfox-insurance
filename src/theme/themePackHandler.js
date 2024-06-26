// packs
import { StartPageTheme } from '../pages/start/theme';
import { SafePageTheme } from '../pages/safe/theme';
import { generalNoteTheme } from '../components/plugins/generalNote/theme';
import { paginatableContentTheme } from '../components/plugins/paginatableContent/theme';
import { GalleryPageTheme } from '../pages/additional/gallery/theme';
import { bannerCarouselTheme } from '../components/plugins/bannerCarousel/theme';
import { ImageViewerTheme } from '../components/plugins/imageViewer/theme';
import { FAQViewerTheme } from '../components/plugins/faq/theme';
import { ReviewerTheme } from '../components/plugins/reviewer/theme';
import { ContactFormTheme } from '../components/plugins/contact/theme';
import { TextFileViewerTheme } from '../components/plugins/textEditor/theme';
import { contentSwitcherTheme } from '../components/plugins/contentSw/theme';
import { GameViewerTheme } from '../components/plugins/gameViewer/theme';

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
                { id: PackIds.faqViewer, pack: FAQViewerTheme },
                { id: PackIds.reviewer, pack: ReviewerTheme },
                { id: PackIds.contactForm, pack: ContactFormTheme },
                { id: PackIds.contentSw, pack: contentSwitcherTheme },
                { id: PackIds.bannerCarousel, pack: bannerCarouselTheme },
                { id: PackIds.textViewer, pack: TextFileViewerTheme },
                { id: PackIds.gameViewer, pack: GameViewerTheme }
            ];
            packs.forEach((pack) => {
                _theme[pack.id] = ThemeHelper.handlePack(pack.pack, pack.id, curTheme);
            });
        }
        return _theme; 
    }
}