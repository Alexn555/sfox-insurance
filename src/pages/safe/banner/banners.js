import EnvService from '../../../services/api/envService';

const rootPath = `${EnvService.getRoot()}assets/contentsw/games/`;

export const BannerItemSet = {
    w: 200,
    h: 200
};

export const Banners = [
    { 
        id: 'banner1',
        label: 'Action game shows snake',
        image: `${rootPath}asnake.png`
    },
    { 
        id: 'banner2',
        label: 'Middle game shows BlackJack',
        image: `${rootPath}blackjack.png`
    },
    { 
        id: 'banner3',
        label: 'Wordgame banner shows words',
        image: `${rootPath}wordgame.png`
    },
    { 
        id: 'banner4',
        label: 'Barslot banner shows slots',
        image: `${rootPath}barslot.png`
    }
];