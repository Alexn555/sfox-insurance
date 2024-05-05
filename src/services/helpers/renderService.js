import StyleService from '../../services/dom/styleService';
import { IdService } from '../dom/idService';

export class RenderService {
    static showComponent(isEnabled, template) {
        if (isEnabled) {
            return template;
        }
        return '';
    }

    static toggleButton(id, context, timeout = 2000) {
        const el = IdService.id(id, context);
        el.setAttribute('disabled', '');
        setTimeout(() => {  el.removeAttribute('disabled'); }, timeout);
    }
    
    static toggleDisplay(id, context, timeout = 2000) {
        const el = IdService.id(id, context);
        StyleService.setProperty(el, 'display', 'none');
        setTimeout(() => { StyleService.setProperty(el, 'display', 'block'); }, timeout);
    }
}