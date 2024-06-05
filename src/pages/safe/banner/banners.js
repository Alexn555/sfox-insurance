import EnvService from '../../../services/api/envService';
import { GameBanners2  } from './banners2';

const rootPath = `${EnvService.getRoot()}assets/games/`;

export const BannerItemSet = {
    w: 200,
    h: 200
};

export const GameBanners = [
    { 
        id: 'banner1',
        label: 'Action game shows snake',
        desc: 'Action game description',
        image: `${rootPath}asnake.png`
    },
    { 
        id: 'banner2',
        label: 'Middle game shows BlackJack',
        desc: 'Blackjack game description',
        image: `${rootPath}blackjack.png`
    },
    { 
        id: 'banner3',
        label: 'Wordgame banner shows words',
        desc: 'Wordgame showcase',
        image: `${rootPath}wordgame.png`
    },
    { 
        id: 'banner4',
        label: 'Barslot banner shows slots',
        desc: 'Barslot one of slots',
        image: `${rootPath}barslot.png`
    }
];

export const Banners = GameBanners.concat(GameBanners2);