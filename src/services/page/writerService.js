import RestAPI from '../api/restApi';
import LoggerService from '../loggerService';
import { NumberService } from '../utils';

export default class WriterService {
    getContent() {
      const useRestAPI = true;
      const ids = [2, 6, 8, 11, 13, 16, 20, 31, 32];
      const index = NumberService.sample(ids);
      if (useRestAPI) {
         return RestAPI.get('/posts/' + ids[index], '');
      } else {
         return fetch(`https://jsonplaceholder.typicode.com/posts/${ids[index]}`)
            .then(response => response.json())
            .then(json => LoggerService.log(json));
      }
   }
}