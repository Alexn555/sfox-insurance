import { Cursors } from '../../../enums';

export const FAQSetIds = {
    common: 'common',
    faqPage: 'faqPage'
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

export const FAQSets = {
    propertyAmount: 6,
    common: {
        id: FAQSetIds.common,
        enabled: true,
        collapse: true,
        arrow: true,
        contentHideOnStart: false,
        nameCursor: Cursors.normal, // Cursors.pointer
        pads: commonSets.pads,
        fonts: commonSets.fonts
    },
    faqPage: {
        id: FAQSetIds.faqPage,
        enabled: true,
        collapse: true,
        arrow: true,
        contentHideOnStart: false,
        nameCursor: Cursors.normal, // Cursors.pointer
        pads: commonSets.pads,
        fonts: commonSets.fonts
    }
};