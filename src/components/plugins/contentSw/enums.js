import EnvService from '../../../services/api/envService';

export let ContentSwSides = {
    left: 'left',
    right: 'right',
    top: 'top'
};

export let LabelModes = {
    labels: 'labels',
    numeric: 'numeric'
};

let path = `${EnvService.getRoot()}assets/contentsw/`;

export let LabelIcons = {
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