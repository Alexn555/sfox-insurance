import EnvService from '../../../services/api/envService';
import { GameBanners2  } from './banners2';

let rootPath = `${EnvService.getRoot()}assets/games/`;

export let BannerItemSet = {
    w: 200,
    h: 300
};

export let GameBanners = [
    { 
        id: 'banner1',
        label: 'Action game shows snake',
        desc: 'Action game description',
        image: rootPath+'asnake.png'
    },
    { 
        id: 'banner2',
        label: 'Middle game shows BlackJack',
        desc: 'Blackjack game description',
        image: rootPath+'blackjack.png'
    },
    { 
        id: 'banner3',
        label: 'Wordgame banner shows words',
        desc: 'Wordgame showcase',
        image: rootPath+'wordgame.png'
    },
    { 
        id: 'banner4',
        label: 'Barslot banner shows slots',
        desc: 'Barslot one of slots',
        image: rootPath+'barslot.png'
    }
];

export let Banners = GameBanners.concat(GameBanners2);