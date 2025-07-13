import EnvService from '../../../services/api/envService';

let rootPath = `${EnvService.getRoot()}assets/games2/`;

export let GameBanners2 = [
    { 
        id: 'banner11',
        label: 'Destinationball punch your way',
        desc: 'Ball game description',
        image: rootPath+'destinationball.jpg'
    },
    { 
        id: 'banner12',
        label: 'Dual shooters defending room',
        desc: 'Dual shooter game',
        image: rootPath+'dual1.jpg'
    },
    { 
        id: 'banner15',
        label: 'Tank defending sorroundings',
        desc: 'Tank game against cars',
        image: rootPath+'nottretank.jpg'
    },
    { 
        id: 'banner22',
        label: 'Tictactoe with Vuejs',
        desc: 'Tictactoe game using framework Vuejs',
        image: rootPath+'tictoevue.jpg'
    },
    { 
        id: 'banner17',
        label: 'Speed up till the parking lot',
        desc: 'Parking game to show your target approaches',
        image: rootPath+'parkingcar.jpg'
    }
];