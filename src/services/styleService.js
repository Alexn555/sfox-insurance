import LoggerService from "./loggerService";

export default class StyleService {
    static setDisplay(el, toggle = true, displayType = 'block') {
        if (!el) {
            LoggerService.error(`Set style id: "${el}" not found`);
        }
        el.style.display = toggle ? displayType : 'none';
    }

    static setDisplayMultiple(els = [], toggle = true, displayType) {
        els.forEach((el) => {
            this.setDisplay(el, toggle, displayType);
        });
    }

    static isDisplaying(el, displayType = 'block') {
        return el.style.display === displayType;
    }
}
