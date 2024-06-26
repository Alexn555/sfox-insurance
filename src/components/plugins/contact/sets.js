import { Cursors } from '../../../enums';

export const ContactIds = {
    common: 'common',
    readerContactPage: 'readerContactPage'
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

export const ContactSets = {
    propertyAmount: 7,
    common: {
        id: ContactIds.common,
        enabled: true,
        nameCursor: Cursors.normal,
        message: {
            cols: 50,
            rows: 6,
            timeout: 1,
            maxSize: 1000
        },
        validateEmail: true,
        resetForm: false,
        pads: commonSets.pads,
        fonts: commonSets.fonts
    },
    readerContactPage: {
        id: ContactIds.readerContactPage,
        enabled: true,
        nameCursor: Cursors.normal,
        message: {
            cols: 50,
            rows: 6,
            timeout: 1,
            maxSize: 1000
        },
        validateEmail: true,
        resetForm: true,
        pads: commonSets.pads,
        fonts: commonSets.fonts
    }
};