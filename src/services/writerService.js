import RestAPI from './restApi';
import LoggerService from './loggerService';
import { randomInteger } from './utils';

export default class WriterService {

    getContent() {
      const useRestAPI = true;
      const ids = [2, 6, 8, 11, 13, 16, 20, 31, 32];
      const index = randomInteger(0, ids.length - 1);
      if (useRestAPI) {
         return RestAPI.get('/posts/' + ids[index], '');
      } else {
         return fetch(`https://jsonplaceholder.typicode.com/posts/${ids[index]}`)
            .then(response => response.json())
            .then(json => LoggerService.log(json));
      }
   }
}