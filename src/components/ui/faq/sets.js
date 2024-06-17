import { Cursors } from '../../../enums';

export const FAQSets = {
    propertyAmount: 3,
    common: {
        id: 'common',
        enabled: true,
        collapse: true,
        nameCursor: Cursors.normal, // Cursors.pointer
        pads: {
            item: '8px 4px',
            name: '4px',
            content: '4px'
        },
        fonts: {
            wrapper: 'smaller',
            name: '16px'
        }
    },
    faqPage: {
        id: 'faqPage',
        enabled: true,
        collapse: true,
        nameCursor: Cursors.normal, // Cursors.pointer
        pads: {
            item: '8px 4px',
            name: '4px',
            content: '4px'
        },
        fonts: {
            wrapper: 'smaller',
            name: '16px'
        }
    }
};