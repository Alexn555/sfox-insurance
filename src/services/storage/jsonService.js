export class JSONService {
    static set(obj) {
       return JSON.stringify(obj);
    }

    static getArray(arrStr) {
        if (arrStr) {
           const array = JSON.parse(arrStr);
            return array && array['length'] !== undefined && array.length > 0 ? array : [];  
        }
        return [];
    }

    static getObj(str) {
        if (str) {
           const obj = JSON.parse(str);
           return obj && obj !== null ? obj : {};  
        }
        return {};   
    }
}