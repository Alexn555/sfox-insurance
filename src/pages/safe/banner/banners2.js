import EnvService from '../../../services/api/envService';

const rootPath = `${EnvService.getRoot()}assets/games2/`;

export const GameBanners2 = [
    { 
        id: 'banner11',
        label: 'Destinationball punch your way',
        image: `${rootPath}destinationball.jpg`
    },
    { 
        id: 'banner12',
        label: 'Dual shooters defending room',
        image: `${rootPath}dual1.jpg`
    },
    { 
        id: 'banner15',
        label: 'Tank defending sorroundings',
        image: `${rootPath}nottretank.jpg`
    },
    { 
        id: 'banner22',
        label: 'Tictactoe with Vuejs',
        image: `${rootPath}tictoevue.jpg`
    },
    { 
        id: 'banner17',
        label: 'Speed up till the parking lot',
        image: `${rootPath}parkingcar.jpg`
    }
];