// @ts-nocheck
import 'jimp';
import { createFlickr } from 'flickr-sdk';
import LoggerService from './loggerService';
import GlobalsService from './globalsService';
import { randomInteger } from './utils';

export default class FlickService {
    
    constructor() {
        this.API_KEY = GlobalsService.getFlickrAPIKey();

        const { flickr } = createFlickr(this.API_KEY);
        this.flickr = flickr;

        this.sizes = {
            sm: 'm',
            medium: 'c',
            large: 'b'
        };
    }

    async fetchImage() {
        const flickrParams = {
          text: 'formula 1',
          media: 'photos',
          per_page: '5',
          page: '1',
          extras: 'url_q, url_z, url_b, owner_name'
        };
  
        this.flickr('flickr.photos.search', flickrParams).then(async (res) => {
          const body = await res.json();
          LoggerService.log(body.photos);
          return body;
        });
    }

    async getImage(text = 'formula 1', isRandom = true, index = 0) {
        const params = { 
            method: 'flickr.photos.search',
            page: 1,
            per_page: 10
        };
        const flickURL =  `https://api.flickr.com/services/rest/?method=${params.method}&
         api_key=${this.API_KEY}&page=${params.page}&per_page=${params.per_page}&text=${text}&format=json&nojsoncallback=1`;
        
        return fetch(flickURL).then(async (res) => {
            const body = await res.json();
            let image = '';
            let imageUrl = '';
            if (body.photos && body.photos.photo.length > 0) {
                const maxNum = params.per_page === 10 ? params.per_page - 1 : params.per_page;
                const num = isRandom ? randomInteger(0, maxNum) : index;
                image = body.photos.photo[num];
                imageUrl = await this.getImageFromSource(image);
            }
            return imageUrl;
        });
    }

    async getImageFromSource(photo) {
        const imgSm = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${this.sizes.sm}.jpg`;
        const imgMedium = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${this.sizes.large}.jpg`;

        const readFile = false;
        if (readFile) {
             Jimp.read(url).then(function (image) {
                LoggerService.log(' -----> image ', image);
            }).catch(function (err) {
                LoggerService.error(' ----> image error ', err);
            });
        }
        return { imgSm, imgMedium };
    }
}