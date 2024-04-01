export default class LoggerService {
    static log() {
        for(let i=0; i < arguments.length; i++ ) {
            console.log(arguments[i]);
        }
    }

    static error() {
        for(let i=0; i < arguments.length; i++ ) {
            console.error(arguments[i]);
        }
    }
}
