import { Cursors } from '../../../enums';

export const BannerCarouselSets = {
    errorCase: 'error',
    allLevelsCount: true,
    propertyAmount: 5,
    common: { // default, non-specific
        enableNav: true,
        enableLink: true,
        navShuffle: false,
        navCursor: Cursors.normal,
        linkCursor: Cursors.normal
    },
    banner: { // banner page
        enableNav: true,
        enableLink: true,
        navShuffle: false,
        navCursor: Cursors.normal,
        linkCursor: Cursors.pointer
    },
};