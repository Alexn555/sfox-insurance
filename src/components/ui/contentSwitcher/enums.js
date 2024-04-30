import EnvService from '../../../services/api/envService';

export const ContentSwSides = {
    left: 'left',
    right: 'right'
};

export const LabelModes = {
    labels: 'labels',
    numeric: 'numeric'
};

const path = `${EnvService.getRoot()}assets/contentsw/`;

export const LabelIcons = {
    game: {
        id: 'game',
        source: path+'game.png'
    }
};