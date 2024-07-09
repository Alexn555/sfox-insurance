import { Cursors, DirectionAlignment } from '../../../enums';

export const ReviewerSetIds = {
    common: 'common',
    reviewPage: 'reviewPage',
    reviewPageMultiple: 'reviewPageMultiple',
    reviewPageAdvanced: 'reviewPageAdvanced'
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
    propertyAmount: 14,
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
        multipleAnswers: false,
        nameCursor: Cursors.normal, // Cursors.pointer
        pads: commonSets.pads,
        fonts: commonSets.fonts
    },
    [ReviewerSetIds.reviewPage]: {
        id: ReviewerSetIds.reviewPage,
        enabled: true,
        collapse: true,
        arrow: true,
        align: DirectionAlignment.column,
        contentHideOnStart: false, // true, contentAnim only can be false (similar to faq sets)
        contentAnim: true,
        numeration: false,
        message: {
            timeout: 1,
        },
        contentAnimTime: 1,
        multipleAnswers: false,
        nameCursor: Cursors.normal, // Cursors.pointer
        pads: commonSets.pads,
        fonts: commonSets.fonts
    },
    [ReviewerSetIds.reviewPageMultiple]: { // reviewer multiple answers
        id: ReviewerSetIds.reviewPage,
        enabled: true,
        collapse: true,
        arrow: true,
        align: DirectionAlignment.column,
        contentHideOnStart: false, // true, contentAnim only can be false
        contentAnim: true,
        numeration: false,
        message: {
            timeout: 1,
        },
        contentAnimTime: 1,
        multipleAnswers: true,
        nameCursor: Cursors.normal,
        pads: commonSets.pads,
        fonts: commonSets.fonts
    },
    [ReviewerSetIds.reviewPageAdvanced]: {
        id: ReviewerSetIds.reviewPageAdvanced,
        enabled: true,
        collapse: true,
        arrow: true,
        align: DirectionAlignment.row,
        contentHideOnStart: false, // true, contentAnim only can be false
        contentAnim: true,
        numeration: true,
        message: {
            timeout: 1,
        },
        contentAnimTime: 1,
        multipleAnswers: false,
        nameCursor: Cursors.normal,
        pads: commonSets.pads,
        fonts: commonSets.fonts
    }
};