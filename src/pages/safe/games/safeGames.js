import { SafeGameIcons } from '../../../components/plugins/gameViewer/icons';

let host = 'https://alexn555-racing.com/projects/';

export let gmSfGames = [
    { 
        id: 'destinationBall', 
        title: 'Destination Ball', 
        link: host+'html5games/destinationball/',
        params: '&player=1&mode=real',
        icon: SafeGameIcons.destinationBall,
        w: 550,
        h: 530
    },
    {
        id: 'dual1',
        title: 'Dual1',
        link: host+'html5games/xdual1/',
        params: '&player=1&mode=real',
        icon: SafeGameIcons.dual1,
        w: 600,
        h: 500
    },
    {
        id: 'nottretank',
        title: 'Nottretank',
        link: host+'html5games/nolettank',
        params: '&player=1&mode=real',
        icon: SafeGameIcons.nottretank,
        w: 600,
        h: 500
    },
    {
        id: 'tictoevue',
        title: 'TictoeVue',
        link: host+'vue-tictac-toe/',
        params: '&player=1&mode=real',
        icon: SafeGameIcons.tictoevue,
        w: 600,
        h: 500
    },
    {
        id: 'parkingcar',
        title: 'Parkingcar',
        link: host+'html5games/parkingcar',
        params: '&player=1&mode=real',
        icon: SafeGameIcons.parkingcar,
        w: 600,
        h: 500
    }
];