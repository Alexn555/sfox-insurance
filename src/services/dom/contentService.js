import LoggerService from '../loggerService';

export class ContentService {
    static removeArticles(el) {
        while (el.firstChild) {
            el.removeChild(el.lastChild);
        }
    }

    static createArticle(el, content) {
        if (!el) {
            LoggerService.error('Content service not article id provided!');
            return;
        }

        const para = document.createElement('p');
        const node = document.createTextNode(content);
        para.appendChild(node);
        el.appendChild(para);
        return el;
    }
}