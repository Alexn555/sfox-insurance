import { themeMain1 } from './main1';
import { themeBlue } from './blue';
import { themeBlack } from './black';
import { themeRed } from './red';
import { themeYellow } from './yellow';
import { Themes } from './enums';
import ThemePackHandler from './themePackHandler';

export let theme = themeMain1;
theme = ThemePackHandler.addPlugins(theme, Themes.main1, true);

export const changeTheme = (themeId) => {
    theme = themeMain1;
    let curTheme = Themes.main1;
    switch(themeId) {
        case Themes.main1:
            default:
                theme = themeMain1;
                curTheme = Themes.main1;
                break;
        case Themes.blue:
                theme = themeBlue;
                curTheme = Themes.blue;
            break;
        case Themes.black:
                theme = themeBlack;
                curTheme = Themes.black;
            break;
        case Themes.red:
                theme = themeRed;
                curTheme = Themes.red;
            break;
        case Themes.yellow:
                theme = themeYellow;
                curTheme = Themes.yellow;
            break;
    }
    theme = ThemePackHandler.addPlugins(theme, curTheme, true);          
}