import { BoolEnums } from '../../../enums';
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
        }
    }
};