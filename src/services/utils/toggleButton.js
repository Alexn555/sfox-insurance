import { IdService } from '../dom/idService';

export const toggleButton = (id, context, timeout = 2000) => {
    const el = IdService.id(id, context);
    el.setAttribute('disabled', '');
    setTimeout(() => {  el.removeAttribute('disabled'); }, timeout);
}

export const toggleDisplay = (id, context, timeout = 2000) => {
    const el = IdService.id(id, context);
    el.style.display = 'none';
    setTimeout(() => {  el.style.display = 'block'; }, timeout);
}
