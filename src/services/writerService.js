import RestAPI from './restApi';

export default class WriterService {

    getContent() {
      const useRestAPI = true;
      if (useRestAPI) {
         return RestAPI.get('/todos/1', '');
      } else {
         return fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => console.log(json));
      }
   }
}