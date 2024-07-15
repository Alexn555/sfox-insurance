import EnvService from './envService';

export default class TheMovieDBService {
    constructor() {
        this.API_KEY = EnvService.getTheMovieDBAPIKey();
        this.locale = 'en-US';
        this.page = '1';
    }

    async getGalleryPosters() {
        const host = 'https://api.themoviedb.org/';
        const response = await fetch(host + '3/movie/popular?api_key='+this.API_KEY+'&language='+this.locale+'&page='+this.page);
        const movies = await response.json();
        const posters = movies.results;
        // sizes: (c) https://themoviedb.org/talk/5aeaaf56c3a3682ddf0010de
        let headPathSm = 'https://image.tmdb.org/t/p/w185'; //w92, w154, w185
        let headPathMd = 'https://image.tmdb.org/t/p/w500';
        let images = [];
        posters.forEach(poster => {
          let itemSm = headPathSm + poster['poster_path'];
          let itemMd = headPathMd + poster['poster_path'];
          images.push({ imgSm: itemSm, imgMedium: itemMd });
        });
        return images;
    }
}