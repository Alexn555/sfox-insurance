import { CommonEvents } from '../../settings';

export class IdService {
    static id(id, context) {
        return context.getElementById(id);
    }

    static idAndClick(id, context, callback) {
        const el = this.id(id, context);
        el.addEventListener(CommonEvents.click, callback);
        return el;
    }

    static event(el, evt, callback) {
        el.addEventListener(evt, callback);
    }

    static customEvent(evt, callback, context = document) {
        context.addEventListener(evt, callback);
    }

    static remove(el, evt = CommonEvents.click) {
        el?.removeEventListener(evt, null);
    }

    static removeById(id, context) {
        this.remove(this.id(id, context));
    }

    static removeListId(ids, context) {
        if (ids && ids.length > 0) {
            ids.forEach((id) => {
                this.removeById(id, context);
            }); 
        }
    }

    static removeCustomEvents(evts, context = document) {
        if (evts && evts.length > 0) {
            evts.forEach(() => {
                context.removeEventListener(evts, null); 
            }); 
        }
    }

    static removeList(els) {
        if (els && els.length > 0) {
            els.forEach((el) => {
                el.removeEventListener(CommonEvents.click, null); 
            }); 
        }
    }
}