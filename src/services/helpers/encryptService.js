export class EncryptService {
    static decodeBase64Str(encodedStr) {
        let str = '';
        if (encodedStr && encodedStr.length > 0) {
            str = atob(encodedStr);
        }
        return str;
    }
    
    static encodeBase64Str(decodedStr) {
        let str = '';
        if (decodedStr && decodedStr.length > 0) {
            str = btoa(decodedStr);
        }
        return str;
    }
}