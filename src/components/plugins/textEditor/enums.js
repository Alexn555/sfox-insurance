import EnvService from '../../../services/api/envService';

let path = `${EnvService.getRoot()}assets/`;

export let LoadingIcons = {
    text: {
        source: path+'gameviewer/loading.gif'
    }
};

export let FileSaveEnums = {
    object: 'text-editor-saved-object',
};

export let SaveEvts = {
    name: 'hame',
    content: 'content'
};

export let MenuButtons = {
    save: {
        id: 'save',
        tip: 'Saves name and content'
    },
    paragraph: {
        id: 'paragraph',
        tip: 'Creates paragraph of selected text'
    },
    bold: {
        id: 'bold',
        tip: 'Highlightes selected text bold'
    },
    italic: {
        id: 'italic',
        tip: 'Highlightes selected text italic'
    },
    underline: {
        id: 'underline',
        tip: 'Underlines selected text'
    },
    left: {
        id: 'left',
        tip: 'Left align with paragraph'
    },
    center: {
        id: 'center',
        tip: 'Center align with paragraph'
    },
    right: {
        id: 'right',
        tip: 'Right align with paragraph'
    },
    tipToggle: {
        id: 'tipToggle',
        tip: 'Toggles tip'
    },
    preview: {
        id: 'preview',
        tip: 'Preview html or Edit text'
    }
};