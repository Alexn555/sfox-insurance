export class ServerService {
    static simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}