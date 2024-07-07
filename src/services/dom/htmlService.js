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

    static appendHTML(el, val) {
        if (typeof val === 'string') {
            el.innerHTML += val;   
        } else {
            LoggerService.error(`html service el ${el} html value not provided`);
        }
    }

    static toggleMsg(el, val, tm = 1) {
        HTMLService.html(el, val);
        setTimeout(() => { HTMLService.html(el, ''); }, tm * 1000);
    }

    static removeItems(parentObj) {
        while (parentObj.firstChild) {
          parentObj.removeChild(parentObj.lastChild);
        }
    }
}