import EnvService from '../../../services/api/envService';

export const ContentSwSides = {
    left: 'left',
    right: 'right',
    top: 'top'
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
    },
    text: {
        id: 'text',
        source: path+'file.png'
    },
    video: {
        id: 'video',
        source: path+'video.png'
    }
};