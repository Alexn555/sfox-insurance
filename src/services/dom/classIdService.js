import LoggerService from '../../services/loggerService';
import { CommonEvents } from '../../settings';

export class ClassIdService {
    static id(query, ctx) {
        if (!ctx) {
            LoggerService.error('ClassIdService class .'+query+' not provided!');
        }
        return ctx.querySelector('.'+query);
    }

    static idAll(query, ctx) {
        return ctx.querySelectorAll('.'+query);
    }

    static idAndClick(id, ctx, callback) {
        let el = this.id(id, ctx);
        el.addEventListener(CommonEvents.click, callback);
        return el;
    }

    static remove(el, evt = CommonEvents.click) {
        el.removeEventListener(evt, null);
    }

    static removeList(els) {
        if (els && els['length'] !== undefined && els.length > 0) {
            els.forEach((el) => {
                el.removeEventListener(CommonEvents.click, null); 
            }); 
        }
    }
}