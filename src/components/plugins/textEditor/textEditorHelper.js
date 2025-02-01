import { HTMLService, StyleService } from '../../../services';
import { ArrayService, JSONService } from '../../../services/utils';
import { LoadingIcons, SaveEvts } from './enums';

export class TextEditorHelper {
    
    static setLoading(timeout = 1, name, $loading, onComplete) {
        HTMLService.html($loading, `
            <div class="loading-content">
              <div>Loading</div>
              <img src="${LoadingIcons.text.source}" alt="" />
              <div>${name}</div>
            </div>`);

        StyleService.setDisplay($loading, true);
        setTimeout(() => {
            HTMLService.html($loading, '');
            StyleService.setDisplay($loading, false);
            onComplete();
        }, timeout * 1000);
    }

    static getSaveObjIndex(id, savedArray) {
        return savedArray.findIndex(file => file.id === id);
    }

    static saveFile(evt, value, saved, textObject, sets, errEl, onArrayFound) {
        let savedArray = [];
        if (ArrayService.minLength(saved)) {
            savedArray = saved;
        }

        let saveObj = { 
            id: textObject.id,
            name: evt === SaveEvts.name ? this.validateText(evt, value, sets, errEl) : textObject.name,
            content: evt === SaveEvts.content ? this.validateText(evt, value, sets, errEl) : textObject.content
        };

       let foundIndex = TextEditorHelper.getSaveObjIndex(textObject.id, savedArray);
        if (foundIndex > -1) {
            savedArray[foundIndex] = saveObj;
        } else {
            savedArray.push(saveObj);
        }
        
        onArrayFound(savedArray);
    }

    static getFileObject(saved, file) {
        let textObject = {};
        if (saved && ArrayService.minLength(saved)) {
            let foundIndex = TextEditorHelper.getSaveObjIndex(file.id, saved);
            textObject = foundIndex > -1 ? saved[foundIndex] : file;
        } else {
            textObject = file;
        }
        textObject['rows'] = file.rows;
        textObject['cols'] = file.cols;
        return textObject;
    }

    static validateText(evt, value, sets, errEl) {
        let error = '';
        let allowed = 0;
        let nameMin = sets.name.min;
        let nameMax = sets.name.max;
        let contentMax = sets.content.max;
        if (evt === SaveEvts.name) {
            if (!ArrayService.minLength(value, nameMin)) {
                error = `Your File name cannot be less than ${nameMin} chars`;
                allowed = nameMin;
            }
            if (ArrayService.minLength(value, nameMin) && value.length > nameMax) {
                error = `Your File name cannot be longer than ${nameMax} chars`;
                allowed = nameMax;
            }
        }
        if (evt === SaveEvts.content && ArrayService.minLength(value, 0) && value.length > contentMax) {
            error = `Your File content cannot be bigger than ${contentMax} chars`;
            allowed = contentMax;
        }
        if (error !== '') {
            HTMLService.html(errEl, `<b>${error}</b>`);
            setTimeout(() => { 
                HTMLService.html(errEl, '');
            }, 2000);
            return value ? value.substr(0, allowed) : '';
        }

        return value;
    }

    static getTextLabels(files = []) {
        return JSONService.set(files.map(file => file.name));
    }
     
    static getTextIcons(files) {
        return JSONService.set(files.map(file => file.icon));
    }
}