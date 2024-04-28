import { LoggerService } from '../services';
import { Themes} from './enums';

export default class ThemeHelper {
    static handlePack(pack, id, curTheme = Themes.main1) {
        const defaultTheme = 'common';
        if (pack) {
            const themes = [Themes.main1, Themes.blue, Themes.black, Themes.red, Themes.yellow];
            let foundPack = null;
            for (let i = 0; i < themes.length; i++) {
                if (themes[i] === curTheme && pack[themes[i]]) {
                    foundPack = pack[themes[i]];
                    break;
                }
            }
            if (!pack[defaultTheme]) {
                LoggerService.error(`Theme pack ${id} does not have default theme!`);
                return {};
            }
            if (foundPack) {
                return foundPack;
            }
            return pack[defaultTheme];
        } 
        LoggerService.error(`Theme pack ${id} does not have default theme!`);
        return {};     
    }
}