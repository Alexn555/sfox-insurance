import { Themes, PackThemes } from '../../../theme/enums';

export let generalNoteTheme = {
    [PackThemes.common]: {
       success: 'green',
       warning: 'orange',
       error: 'red'    
    },
    [Themes.blue]: {
        success: 'blue',
        warning: 'orange',
        error: 'red' 
    }
};