import EnvService from '../../../services/api/envService';

const path = `${EnvService.getRoot()}assets/texteditor/`;

// (c) freepik.com/icons
export const MenuIcons = {
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