import { BoolEnums } from '../../../enums';
import { ContentSwSides } from '../contentSw/enums';

export let GameViewerSetEnums = {
    gamePage: 'gamePage', // same as in textEditor, much match with Settings object
    safeGames: 'safeGamePage'
};

export let GameViewerSettings = {
    gamePage: {
        id: 'html5games',
        displayLabel: BoolEnums.bFalse,
        side: ContentSwSides.right,
        background: true
    },
    safeGamePage: {
        id: 'html5SafeGames',
        displayLabel: BoolEnums.bFalse,
        side: ContentSwSides.left,
        background: false
    }
};