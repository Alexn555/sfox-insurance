import { BoolEnums } from '../../../enums';
import { ContentSwSides } from '../contentSw/enums';

export const TextEditorSetEnums = {
    textEditorPage: 'textEditorPage' // must match 
};

export const TextEditorSettings = {
    textEditorPage: {
        id: 'text-editor',
        displayLabel: BoolEnums.bFalse,
        side: ContentSwSides.right,
        name: {
            max: 20 // chars
        },
        content: {
            max: 1000 // chars
        }
    }
};