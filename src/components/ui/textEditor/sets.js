import { BoolEnums, Cursors } from '../../../enums';
import { ContentSwSides } from '../contentSw/enums';

export const TextEditorSetEnums = {
    textEditorPage: 'textEditorPage' // must match 
};

export const TextEditorSettings = {
    textEditorPage: {
        displayLabel: BoolEnums.bFalse,
        side: ContentSwSides.right,
        name: {
            min: 1,
            max: 20 // chars
        },
        content: {
            max: 2000 // chars
        },
        menu: {
            enabled: true,
            previewEnabled: true,
            item: {
                tooltip: true,
                randomBorder: false,
                cursor: Cursors.pointer
            }
        }
    }
};