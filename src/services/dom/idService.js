import LoggerService from '../../services/loggerService';
import { CommonEvents } from '../../settings';

export class IdService {
    static id(id, context) {
        if (!context) {
            LoggerService.error(`IdService #${id} context not provided!`);
        }
        return context.getElementById(id);
    }

    static idAndClick(id, ctx, callback) {
        let el = this.id(id, ctx);
        el.addEventListener(CommonEvents.click, callback);
        return el;
    }

    static event(el, evt, callback) {
        el.addEventListener(evt, callback);
    }

    static remove(el, evt = CommonEvents.click) {
        el?.removeEventListener(evt, null);
    }

    static removeById(id, ctx) {
        this.remove(this.id(id, ctx));
    }

    static removeListId(ids, ctx) {
        if (ids && ids['length'] !== undefined && ids.length > 0) {
            ids.forEach((id) => {
                this.removeById(id, ctx);
            }); 
        }
    }

    static removeList(els) {
        if (els && els['length'] !== undefined && els.length > 0) {
            els.forEach((el) => {
                el.removeEventListener(CommonEvents.click, null); 
            }); 
        }
    }
}