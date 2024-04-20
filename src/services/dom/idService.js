import { CommonEvents } from '../../settings';

export class IdService {
    static id(id, context) {
        return context.getElementById(id);
    }

    static idAndClick(id, ctx, callback) {
        const el = this.id(id, ctx);
        el.addEventListener(CommonEvents.click, callback);
        return el;
    }

    static event(el, evt, callback) {
        el.addEventListener(evt, callback);
    }

    static customEvent(evt, callback, ctx = document) {
        ctx.addEventListener(evt, callback);
    }

    static remove(el, evt = CommonEvents.click) {
        el?.removeEventListener(evt, null);
    }

    static removeById(id, ctx) {
        this.remove(this.id(id, ctx));
    }

    static removeListId(ids, ctx) {
        if (ids && ids.length > 0) {
            ids.forEach((id) => {
                this.removeById(id, ctx);
            }); 
        }
    }

    static removeCustomEvents(evts, ctx = document) {
        if (evts && evts.length > 0) {
            evts.forEach(() => {
                ctx.removeEventListener(evts, null); 
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