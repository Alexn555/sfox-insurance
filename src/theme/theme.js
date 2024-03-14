import { themeMain1 } from './main1';
import { themeBlue } from './blue';
import { themeBlack } from './black';
import { themeRed } from './red';
import { themeYellow } from './yellow';

export let theme = themeMain1;

export const Themes = {
    main1: 'main1',
    blue: 'blue',
    black: 'black',
    red: 'red',
    yellow: 'yellow'
};

export const changeTheme = (themeId) => {
    theme = themeMain1;
    switch(themeId) {
        case Themes.main1:
            default:
                theme = themeMain1;
                break;
        case Themes.blue:
                theme = themeBlue;
            break;
        case Themes.black:
                theme = themeBlack;
            break;
        case Themes.red:
                theme = themeRed;
            break;
        case Themes.yellow:
                theme = themeYellow;
            break;
    }
}