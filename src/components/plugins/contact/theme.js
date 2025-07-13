import {  PackThemes, Themes } from '../../../theme/enums';

let commonTheme = {
    wrapper: {
        background: 'white'
    },
    name: {
        background: '#dcdcdc',
        text: 'black',
    },
    content: {
        background: 'white',
    }
};

export let ContactFormTheme = {
    [PackThemes.common]: commonTheme,
    [Themes.main1]: {
        wrapper: commonTheme.wrapper,
        name: {
            background: '#debad0',
            text: commonTheme.name.text
        },
        content: commonTheme.content,
    },
    [Themes.blue]: {
        wrapper: commonTheme.wrapper,
        name: {
            background: '#8cb8db',
            text: commonTheme.name.text
        },
        content: commonTheme.content,
    },
    [Themes.black]: {
        wrapper: commonTheme.wrapper,
        name: {
            background: '#282c2e',
            text: 'white',
        },
        content: commonTheme.content,
    },
    [Themes.red]: {
        wrapper: commonTheme.wrapper,
        name: {
            background: '#de5b5b',
            text: 'white'
        },
        content: commonTheme.content,
    },
    [Themes.yellow]: {
        wrapper: commonTheme.wrapper,
        name: {
            background: '#e8bd3c',
            text: commonTheme.name.text
        },
        content: commonTheme.content,
    },
};