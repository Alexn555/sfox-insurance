export class DateService {
    static getYear() {
        return new Date().getFullYear();
    }
    static formatDate(timestamp, locale = 'fr-CH') {
        return new Date(timestamp * 1000).toLocaleDateString(locale);
    }
}