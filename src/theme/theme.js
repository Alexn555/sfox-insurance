import { themeMain1 } from './main1';
import { themeBlue } from './blue';
import { themeBlack } from './black';
import { themeRed } from './red';
import { themeYellow } from './yellow';

export let theme = themeMain1;

export const changeTheme = (themeId) => {
    theme = themeMain1;
    switch(themeId) {
        case 'main1':
            default:
                theme = themeMain1;
                break;
        case 'blue':
                theme = themeBlue;
            break;
        case 'black':
                theme = themeBlack;
            break;
        case 'red':
                theme = themeRed;
            break;
        case 'yellow':
                theme = themeYellow;
            break;
    }
}