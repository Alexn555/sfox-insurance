import RestAPI from './restApi';
import LoggerService from './loggerService';

export default class WriterService {

    getContent() {
      const useRestAPI = true;
      if (useRestAPI) {
         return RestAPI.get('/todos/1', '');
      } else {
         return fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => LoggerService.log(json));
      }
   }
}