// @ts-nocheck
import LoggerService from '../../services/loggerService';

export class CookieService {
    static setCookie(name, value, age = 7200) { // 2 hours
        document.cookie = `${name}=${value};max-age=${age}`;
    }

    onRemoved(cookie) {
        LoggerService.log(`Removed cookie: ${cookie}`);
    }
      
    onError(error) {
        LoggerService.warn(`Error remove cookie: ${error}`);
    }
      
    static remove(name, cbRemoved = this.onRemoved, cbError = this.onRemoved) {
        const removing = browser.cookies.remove({
          name: name,
        });
        removing.then(cbRemoved, cbError);
    }
}