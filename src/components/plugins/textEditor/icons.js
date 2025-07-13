import EnvService from '../../../services/api/envService';

let path = `${EnvService.getRoot()}assets/texteditor/`;

// (c) freepik.com/icons
export let MenuIcons = {
    save: {
        source: path+'save.png'
    },
    bold: {
        source: path+'bold.png'
    },
    left: {
        source: path+'left.png'
    },
    center: {
        source: path+'center.png'
    }, 
    right: {
        source: path+'right.png'
    }
};