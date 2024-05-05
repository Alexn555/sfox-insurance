export class NumberService {
    static randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static isValidNumber(value) {
        return /^\d+$/.test(value);
    }
    
    static sample(indexes) {
        return this.randomInteger(0, indexes.length - 1);
    }
}