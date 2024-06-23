import {  PackThemes } from '../../../theme/enums';

export const TextFileViewerTheme = {
    [PackThemes.common]: {
        wrapper: {
            background: '#dcdcdc'
        },
        container: {
            border: 'black'
        },
        loading: {
            background: 'white',
            text: 'black',
            border: 'blue',
        },
        menu: {
            background: '#dcdcdc',
            item: {
                bck: 'white',
                bckActive: '#f0f0f0',
                border: 'blue',
                tipBg: 'black',
                tipText: 'white'
            }
        },
    }
};