import { GameLabelIcons } from '../../../components/plugins/gameViewer/icons';

let host = 'https://alexn555-racing.com/projects/';

export let gmVwGames = [
    { 
        id: 'wordGame', 
        title: 'Word Game', 
        link: host+'html5games/wordgame/sfox_index.html',
        params: '&player=1&mode=real',
        icon: GameLabelIcons.wordgame,
        w: 550,
        h: 530
    },
    {
        id: 'ASnake',
        title: 'ASnake',
        link: host+'html5games/asnake/index.html',
        params: '&player=1&mode=real',
        icon: GameLabelIcons.asnake,
        w: 600,
        h: 500
    },
    {
        id: 'BlackJack',
        title: 'Blackjack',
        link: host+'html5games/blackjack/sfox_index.html',
        params: '&player=1&mode=real',
        icon: GameLabelIcons.blackjack,
        w: 600,
        h: 500
    },
    {
        id: 'Barslot',
        title: 'Barslot',
        link: host+'html5games/barslot/index.html',
        params: '&player=1&mode=real',
        icon: GameLabelIcons.barslot,
        w: 600,
        h: 500
    }
];