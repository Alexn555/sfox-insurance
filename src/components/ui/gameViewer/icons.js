import EnvService from '../../../services/api/envService';

const path = `${EnvService.getRoot()}assets/contentsw/games/`;

export const GameLabelIcons = {
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
