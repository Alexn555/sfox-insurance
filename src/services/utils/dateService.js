export class DateService {
    static formatDate(timestamp, locale = 'fr-CH') {
        return new Date(timestamp * 1000).toLocaleDateString(locale);
    }
}