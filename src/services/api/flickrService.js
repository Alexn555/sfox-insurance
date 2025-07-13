// @ts-nocheck
import 'jimp';
import { createFlickr } from 'flickr-sdk';
import LoggerService from '../loggerService';
import ApiService from './apiService';
import EnvService from './envService';
import { NumberService } from '../utils';

export default class FlickService {
    
    constructor() {
        this.API_KEY = EnvService.getFlickrAPIKey();

        let { flickr } = createFlickr(this.API_KEY);
        this.flickr = flickr;

        this.sizes = {
            sm: 'm',
            medium: 'c',
            large: 'b'
        };
    }

    async fetchImage() {
        let flickrParams = {
          text: 'formula 1',
          media: 'photos',
          per_page: '5',
          page: '1',
          extras: 'url_q, url_z, url_b, owner_name'
        };
  
        this.flickr('flickr.photos.search', flickrParams).then(async (res) => {
          let body = await res.json();
          LoggerService.log(body.photos);
          return body;
        });
    }

    async getImage(text = 'formula 1', isRandom = true, index = 0) {
        let params = { 
            method: 'flickr.photos.search',
            page: 1,
            per_page: 10
        };
        let flickURL = `https://api.flickr.com/services/rest/?method=${params.method}&
         api_key=${this.API_KEY}&page=${params.page}&per_page=${params.per_page}&text=${text}&format=json&nojsoncallback=1`;
   
        return ApiService.getWithComplete(flickURL, 'flickrService').then(async (res) => {
            let body = await res.json();
            let image = '';
            let imageUrl = '';
            if (body.photos && body.photos.photo.length > 0) {
                let maxNum = params.per_page === 10 ? params.per_page - 1 : params.per_page;
                let num = isRandom ? NumberService.randomInteger(0, maxNum) : index;
                image = body.photos.photo[num];
                imageUrl = await this.getImageFromSource(image);
            }
            return imageUrl; 
        });
    }

    async getImages(text = 'formula 1', per_page = 10) {
        let params = { 
            method: 'flickr.photos.search',
            page: 1,
            per_page
        };
        let flickURL = `https://api.flickr.com/services/rest/?method=${params.method}&
         api_key=${this.API_KEY}&page=${params.page}&per_page=${params.per_page}&text=${text}&format=json&nojsoncallback=1`;
   
        return ApiService.getWithComplete(flickURL, 'flickrService').then(async (res) => {
            let body = await res.json();
            let imageUrl = '';
            let images = [];
            if (body.photos && body.photos.photo.length > 0) {
                let rowIamges = body.photos.photo;
                rowIamges.forEach(async (img) => {
                  imageUrl = await this.getImageFromSource(img);
                  images.push(imageUrl);
                });
            }
            return images; 
        });
    }

    async getImageFromSource(photo) {
        let imgSm = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${this.sizes.sm}.jpg`;
        let imgMedium = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${this.sizes.large}.jpg`;

        let readFile = false;
        if (readFile) {
             Jimp.read(url).then(function (image) {
                LoggerService.log('source image ', image);
            }).catch(function (err) {
                LoggerService.error('source error ', err);
            });
        }
        return { imgSm, imgMedium };
    }
}