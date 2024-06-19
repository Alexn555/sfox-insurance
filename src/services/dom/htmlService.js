import LoggerService from "../loggerService";

export class HTMLService {
    static text(el, val) {
        if (typeof val === 'string') {
          el.innerText = val;   
        } else {
            LoggerService.error(`html service el ${el} text value not provided`);
        }
    }

    static html(el, val, isAppend = false) {
        if (typeof val === 'string') {
            if (isAppend) {
                el.innerHTML += val;   
            } else {
                el.innerHTML = val;   
            }
        } else {
            LoggerService.error(`html service el ${el} html value not provided`);
        }
    }

    static removeItems(parentObj) {
        while (parentObj.firstChild) {
          parentObj.removeChild(parentObj.lastChild);
        }
    }
}