export class JSONService {
    static set(obj, escapeQuotes) {
        return !escapeQuotes ? JSON.stringify(obj) : JSONService.escapeJSON(JSON.stringify(obj));
    }

    static escapeJSON(str) {
        return str.replace(/'/g,'`');
    }

    static getArray(arrStr) {
        if (arrStr) {
            let array = JSON.parse(arrStr);
            return array && array['length'] !== undefined && array.length > 0 ? array : [];  
        }
        return [];
    }

    static getObj(str) {
        if (str) {
           let obj = JSON.parse(str);
           return obj && obj !== null ? obj : {};  
        }
        return {};   
    }
}