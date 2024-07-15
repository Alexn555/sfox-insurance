import { EncryptService } from '../helpers';

export default class EnvService {
    static getRoot() {
        return process.env.PUBLIC_URL;
    }

    static getAccountSalt() {
        return process.env.ACCOUNT_SALT;
    }

    static getFlickrAPIKey() {
        return EncryptService.decodeBase64Str(process.env.FLICKR_API_KEY);
    }
    
    static getTheMovieDBAPIKey() {
        return EncryptService.decodeBase64Str(process.env.THEMOVIEDB_API_KEY);
    }
}