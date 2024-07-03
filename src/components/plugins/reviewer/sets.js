import { Cursors, DirectionAlignment } from '../../../enums';

export const ReviewerSetIds = {
    common: 'common',
    reviewPage: 'reviewPage'
};

const commonSets = {
    pads: {
        item: '8px 4px',
        name: '4px',
        content: '4px'
    },
    fonts: {
        wrapper: 'smaller',
        name: '16px'
    }
};

export const ReviewSets = {
    propertyAmount: 10,
    common: {
        id: ReviewerSetIds.common,
        enabled: true,
        collapse: true,
        arrow: true,
        align: DirectionAlignment.row,
        contentHideOnStart: false,
        contentAnim: false,
        message: {
            timeout: 1,
        },
        contentAnimTime: 1, //s
        nameCursor: Cursors.normal, // Cursors.pointer
        pads: commonSets.pads,
        fonts: commonSets.fonts
    },
    reviewPage: {
        id: ReviewerSetIds.reviewPage,
        enabled: true,
        collapse: true,
        arrow: true,
        align: DirectionAlignment.row,
        contentHideOnStart: false, // true, contenAnim only can be false
        contentAnim: true,
        message: {
            timeout: 1,
        },
        contentAnimTime: 1,
        nameCursor: Cursors.normal, // Cursors.pointer
        pads: commonSets.pads,
        fonts: commonSets.fonts
    }
};