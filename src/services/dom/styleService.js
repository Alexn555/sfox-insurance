import LoggerService from "../loggerService";

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

    static toggleClass(el, className, toggle) {
        if (toggle) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    }

    static setProperty(el, property, value) {
        el.style[property] = value;
    }

    static setProperties(el, props) {
        if (props && props.length > 0) {
            props.forEach((prop) => {
                this.setProperty(el, prop.property, prop.value);
            });
        }
    }

    static removeAndAddClass(el, list, addCl) {
        if (list && list.length > 0) {
            list.forEach((item) => {
                el.classList.remove(item);
            });
            el.classList.add(addCl);
        }
    }

    static setActive(els = [], selected, className = '') {
        els.forEach((el, index) => {
            el.classList.remove(className);
            if (index === selected) {
                el.classList.add(className);
            }
        });
    }

    static isDisplaying(el, displayType = 'block') {
        return el.style.display === displayType;
    }
}
