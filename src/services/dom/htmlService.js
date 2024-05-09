import LoggerService from "../loggerService";

export class HTMLService {
    static text(el, val) {
        if (typeof val === 'string') {
          el.innerText = val;   
        } else {
            LoggerService.error('html service text value not provided');
        }
    }

    static html(el, val) {
        if (typeof val === 'string') {
            el.innerHTML = val;   
        } else {
            LoggerService.error('html service html value not provided');
        }
    }
}