import EnvService from '../../../services/api/envService';

export const classes = {
    active: 'active',
    normal: 'normal'
};

const rootPath = `${EnvService.getRoot()}/assets/safe/`;

// (c) https://upload.wikimedia.org/wikipedia/
export const textures = {
    safeBg: `${rootPath}wood.jpg`,
    dollar: `${rootPath}twenty.png`,
    card: `${rootPath}x.gif`,
    winner: `${rootPath}card`,
};