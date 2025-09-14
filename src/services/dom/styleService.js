import LoggerService from "../loggerService";
import { ArrayService } from '../utils';

export default class StyleService {
    static setDisplay(el, toggle = true, displayType = 'block') {
        if (!el) {
            LoggerService.error('Set style id: '+el+' not found');
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

    static toggleDisplay(el, visible = 'block') {
        el.style['display'] = el.style['display'] === 'none' || el.style['display'] === '' ? visible : 'none';
    }

    static setProperties(el, props) {
        if (ArrayService.minLength(props)) {
            props.forEach((prop) => {
                this.setProperty(el, prop.property, prop.value);
            });
        }
    }

    static removeAndAddClass(el, list, addCl) {
        if (ArrayService.minLength(list)) {
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
