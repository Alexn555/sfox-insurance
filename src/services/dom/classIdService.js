import { CommonEvents } from '../../settings';

export class ClassIdService {
    static id(query, context) {
        return context.querySelector(`.${query}`);
    }

    static idAll(query, context) {
        return context.querySelectorAll(`.${query}`);
    }

    static idAndClick(id, context, callback) {
        const el = this.id(id, context);
        el.addEventListener(CommonEvents.click, callback);
        return el;
    }

    static remove(el, evt = CommonEvents.click) {
        el.removeEventListener(evt, null);
    }

    static removeList(els) {
        if (els && els.length > 0) {
            els.forEach((el) => {
                el.removeEventListener(CommonEvents.click, null); 
            }); 
        }
    }
}