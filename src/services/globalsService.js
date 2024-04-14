import EncryptService from './encryptService';

export default class GlobalsService {
    static getRoot() {
        return process.env.PUBLIC_URL;
    }

    static getAccountSalt() {
        return process.env.ACCOUNT_SALT;
    }

    static getFlickrAPIKey() {
        return EncryptService.decodeBase64Str(process.env.FLICKR_API_KEY);
    }
}