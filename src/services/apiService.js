import LoggerService from './loggerService';

export default class ApiService {
    static async getWithComplete(resource = '', error = 'API Request limit reached.', timeout = 10000) {
        return Promise.race([
            fetch(resource),
            new Promise((resolve, reject) => {
              setTimeout(() => reject(new Error(error)), timeout);
            }),
          ])
          .catch((err) => LoggerService.error(err));
    }
}