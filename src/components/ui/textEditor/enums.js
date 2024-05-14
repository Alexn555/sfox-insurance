import EnvService from '../../../services/api/envService';

const path = `${EnvService.getRoot()}assets/`;

export const LoadingIcons = {
    text: {
        source: path+'gameviewer/loading.gif'
    }
};

export const FileSaveEnums = {
    object: 'text-editor-saved-object',
};

export const SaveEvts = {
    name: 'hame',
    content: 'content'
};