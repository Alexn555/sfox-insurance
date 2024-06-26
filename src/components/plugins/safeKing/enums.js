import EnvService from '../../../services/api/envService';

export const classes = {
    active: 'active',
    normal: 'normal'
};

const rootPath = `${EnvService.getRoot()}/assets/safe/`;

/* 
(c) https://upload.wikimedia.org/wikipedia/
and (c) usmint.gov/coins/coin-medal-programs/  
(c) https://www.iconpacks.net/free-icon/golden-cup-7825.html
*/

export const textures = {
    safeBg: rootPath+'wood.jpg',
    dollar: rootPath+'twenty.png',
    coin: rootPath+'coin.jpg',
    card: rootPath+'x.gif',
    cup: rootPath+'cup.png', 
    winner: rootPath+'card',
};