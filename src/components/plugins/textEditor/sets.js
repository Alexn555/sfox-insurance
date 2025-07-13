import { BoolEnums, Cursors } from '../../../enums';
import { ContentSwSides } from '../contentSw/enums';

export let TextEditorSetEnums = {
    textEditorPage: 'textEditorPage' // must match 
};

export let TextEditorSettings = {
    textEditorPage: {
        displayLabel: BoolEnums.bFalse,
        side: ContentSwSides.right,
        name: {
            min: 1,
            max: 20 // chars
        },
        content: {
            max: 20000 // chars
        },
        menu: {
            enabled: true,
            previewEnabled: true,
            tipToggleHighlight: true,
            item: {
                tooltip: true,
                randomBorder: false,
                cursor: Cursors.pointer
            }
        }
    }
};