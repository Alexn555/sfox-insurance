import { LoggerService } from '../services';
import { Themes} from './enums';

export default class ThemeHelper {
    static handlePack(pack, id, curTheme = Themes.main1) {
        const defaultTheme = 'common';
        if (pack) {
            const themes = [Themes.main1, Themes.blue, Themes.black, Themes.red, Themes.yellow];
            let foundPack = null;
            themes.forEach((theme) => {
                if (theme === curTheme && pack[theme]) {
                    foundPack = pack[theme];
                }
            });
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