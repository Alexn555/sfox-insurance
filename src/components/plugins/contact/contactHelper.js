// @ts-nocheck
import { HTMLService, StyleService, } from '../../../services';
import { ValidatorService } from '../../../services/utils';

export class ContactHelper {
    static showError(el, msg, tm = 1) {
        StyleService.toggleClass(el, 'error', true);
        HTMLService.html(el, msg);
        setTimeout(() => { HTMLService.html(el, ''); }, tm * 1000);
    }

    static validateFields(saveObj, setsEmail) {
        let message = saveObj.message.trim();
        let isValid = saveObj.name !== '' && saveObj.email !== '' && message.length > 0;
        isValid = setsEmail ? ValidatorService.validateEmail(saveObj.email) : isValid;
        return isValid;
    }
    
    static showMsgCounter(id, val, setAllowed, setsMax) {
        let html = '';
        if (setAllowed) {
          html = `<div id="${id}">${val} / ${setsMax}</div>`;
        }
        return html;
      }
    
    static updateMsgCounter(el, val, setsMax) {
        HTMLService.html(el, val + ' / ' + setsMax);
    }
}