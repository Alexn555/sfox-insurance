// @ts-nocheck
export class StringService {
    static getVersionFromPackage(version) {
        let ver = version;
        ver = ver.split('.').join("");
        const dot = '.';
        const position = 1;
        ver = [ver.slice(0, position), dot, ver.slice(position)].join('');
        return ver;
    }
    
    static capFirstLetter(str) {
        return str.charAt(0).toUpperCase()+ str.slice(1);
    }

    static getMaskSymbol(replaceSymb, pos, symb = '*', symbAmount = 4) {
        let mask = '';
        for (let i = 0; i < symbAmount; i++) {
          mask += symb;
        }
        return mask.substring(0, pos - 1) + `${replaceSymb}` + mask.substring(pos);
    }

    static getSelectedText() { // (c) JohnK, stackovelow
        if (window.getSelection) {
            return window.getSelection();
        } 
        if (window.document.getSelection) {
            return window.document.getSelection();
        } 
        if (window.document.selection) {
            return window.document.selection.createRange().text;
        }
        return '';  
    }
}