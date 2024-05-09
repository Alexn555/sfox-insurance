import LoggerService from "../loggerService";

export class HTMLService {
    static text(el, val) {
        if (typeof val === 'string') {
          el.innerText = val;   
        } else {
            LoggerService.error(`html service el ${el} text value not provided`);
        }
    }

    static html(el, val) {
        if (typeof val === 'string') {
            el.innerHTML = val;   
        } else {
            LoggerService.error(`html service el ${el} html value not provided`);
        }
    }
}