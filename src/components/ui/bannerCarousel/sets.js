import { Cursors } from '../../../enums';

export const BannerCarouselSets = {
    errorCase: 'error',
    allLevelsCount: true,
    propertyAmount: 11,
    common: { // default, non-specific
        enableNav: true,
        enableLink: true,
        navShuffle: false,
        margin: '0 20px 0 20px',
        descHover: 1, // seconds
        label: {
            height: '15%',
            hoverH: '52%',
            nameH: '36px'
        },
        navCursor: Cursors.normal,
        linkCursor: Cursors.normal
    },
    banner: { // banner page
        enableNav: true,
        enableLink: true,
        navShuffle: false,
        margin: '0',
        descHover: 1,
        label: {
            height: '15%',
            hoverH: '52%',
            nameH: '36px'
        },
        navCursor: Cursors.normal,
        linkCursor: Cursors.pointer
    },
};