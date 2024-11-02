export class DateService {
    static getYear() {
        return new Date().getFullYear();
    }
    static generateTimestamp() {
        return new Date().getTime();
    }
    static compareWithCurrent(timestamp) {
        let current = DateService.generateTimestamp();
        let delta = current - timestamp;
        return delta;
    }
    static formatDate(timestamp, locale = 'fr-CH') {
        return new Date(timestamp * 1000).toLocaleDateString(locale);
    }
}