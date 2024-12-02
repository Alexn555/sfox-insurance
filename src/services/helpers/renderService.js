import StyleService from '../../services/dom/styleService';
import { IdService, LoggerService } from '../../services';

export class RenderService {
    static showComponent(isEnabled, template) {
        if (isEnabled) {
            return template;
        }
        return '';
    }

    static modal(el, tm = 500) {
        setTimeout(() => {
            if (el) {
              el.close();
              el.showModal();
            } else {
              LoggerService.warn(`Failed to open #${el} -> modal lost focus`);
            }
        }, tm);
    }

    static toggleButton(id, context, timeout = 2000) {
        let el = IdService.id(id, context);
        el.setAttribute('disabled', '');
        setTimeout(() => {  el.removeAttribute('disabled'); }, timeout);
    }
    
    static toggleDisplay(id, context, timeout = 2000) {
        let el = IdService.id(id, context);
        StyleService.setProperty(el, 'display', 'none');
        setTimeout(() => { StyleService.setProperty(el, 'display', 'block'); }, timeout);
    }
}