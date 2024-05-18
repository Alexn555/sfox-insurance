import { LoggerService } from '../services';
import { ObjectService } from '../services/utils';
import { Themes, PackThemes } from './enums';
import { theme } from './theme';

export default class ThemeHelper {
    static handlePack(pack, id, curTheme = Themes.main1) {
        const defaultTheme = PackThemes.common;
        if (pack) {
            const themes = [Themes.main1, Themes.blue, Themes.black, Themes.red, Themes.yellow];
            for (let i = 0, c = themes.length; i < c; i++) {
                if (themes[i] === curTheme && pack[themes[i]]) {
                    return pack[themes[i]];
                }
            }
            if (pack[defaultTheme]) {
                if (ObjectService.objectPropertyAmount(pack[defaultTheme]) > 0) {
                    return pack[defaultTheme];
                } else {
                    LoggerService.error(`Theme pack ${id} has no items in default theme!`);
                    return {};
                }
            } 
        } 
        LoggerService.error(`Theme pack ${id} does not have theme!`);
        return {};     
    }

    static get(packId) {
        let found = false;
        if (packId) {
            found = theme[packId] !== null || theme[packId] !== undefined;
        } 
        if (!found) {
            LoggerService.error(`Check pack id #${packId} is not found`);
            return {};
        }
        return theme[packId];
    }
}