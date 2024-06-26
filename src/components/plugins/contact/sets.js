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
    propertyAmount: 10,
    common: {
        id: ContactIds.common,
        enabled: true,
        nameCursor: Cursors.normal,
        message: {
            cols: 50,
            rows: 6,
            timeout: 1,
        },
        fields: {
            nameMax: 20,
            emailMax: 20,
            messageMax: 1000
        },
        validateEmail: true,
        messageCounter: true,
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
        },
        fields: {
            nameMax: 20,
            emailMax: 20,
            messageMax: 1000
        },
        validateEmail: true,
        messageCounter: true,
        resetForm: true,
        pads: commonSets.pads,
        fonts: commonSets.fonts
    }
};