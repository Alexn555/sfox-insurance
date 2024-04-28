export default class LoggerService {
    static log() {
        for(let i=0, c = arguments.length; i < c; i++ ) {
            console.log(arguments[i]);
        }
    }

    static warn() {
        for(let i=0, c = arguments.length; i < c; i++ ) {
            console.warn(arguments[i]);
        }
    }

    static error() {
        for(let i=0, c = arguments.length; i < c; i++ ) {
            console.error(arguments[i]);
        }
    }
}
