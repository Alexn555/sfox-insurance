import { Cursors } from '../../../enums';

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
    propertyAmount: 3,
    common: {
        id: 'common',
        enabled: true,
        collapse: true,
        nameCursor: Cursors.normal, // Cursors.pointer
        pads: commonSets.pads,
        fonts: commonSets.fonts
    },
    faqPage: {
        id: 'faqPage',
        enabled: true,
        collapse: true,
        nameCursor: Cursors.normal, // Cursors.pointer
        pads: commonSets.pads,
        fonts: commonSets.fonts
    }
};