import EnvService from '../../../services/api/envService';

let path = `${EnvService.getRoot()}assets/games/`;
let safePath = `${EnvService.getRoot()}assets/games2/`;

export let GameLabelIcons = {
    wordgame: {
        source: path+'wordgame.png'
    },
    asnake: {
        source: path+'asnake.png'
    },
    blackjack: {
        source: path+'blackjack.png'
    },
    barslot: {
        source: path+'barslot.png'
    }
};

export let SafeGameIcons = {
    destinationBall: {
        source: safePath+'destinationball.jpg'
    },
    dual1: {
        source: safePath+'dual1.jpg'
    },
    nottretank: {
        source: safePath+'nottretank.jpg'
    },
    tictoevue: {
        source: safePath+'tictoevue.jpg'
    },
    parkingcar: {
        source: safePath+'parkingcar.jpg'
    }
};
