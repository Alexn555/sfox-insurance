import LoggerService from '../loggerService';

export default class ApiService {
  static async getWithComplete(resource, handlerPage = '', error = 'API Request limit reached.', timeout = 10000) {
    if (!resource || resource === '') {
      LoggerService.error(`Api Service fetch from handler "${handlerPage}" resource not found!`);
      return false;
    }

    return Promise.race([
        fetch(resource),
        new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error(error)), timeout);
        }),
      ])
      .catch((err) => LoggerService.error(err));
  }
}