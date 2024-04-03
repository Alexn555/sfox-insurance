export default class GlobalsService {
    static getRoot() {
        return process.env.PUBLIC_URL;
    }

    static getFlickrAPIKey() {
        return process.env.FLICKR_API_KEY;
    }
}