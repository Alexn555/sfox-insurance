import {  PackThemes, Themes } from '../../../theme/enums';

const commonTheme = {
    wrapper: {
        background: 'white'
    },
    name: {
        background: '#dcdcdc',
        text: 'black'
    },
    arrow: {
        background: 'black'
    },
    content: {
        background: 'white',
    }
};

export const ReviewerTheme = {
    [PackThemes.common]: commonTheme,
    [Themes.main1]: {
        wrapper: {
           background: commonTheme.wrapper.background
        },
        name: {
            background: '#debad0',
            text: commonTheme.name.text
        },
        arrow: {
            background: commonTheme.arrow.background
        },
        content: {
            background: commonTheme.content.background
        }
    },
    [Themes.blue]: {
        wrapper: {
           background: commonTheme.wrapper.background
        },
        name: {
            background: '#8cb8db',
            text: commonTheme.name.text
        },
        arrow: {
            background: commonTheme.arrow.background
        },
        content: {
            background: commonTheme.content.background
        }
    },
    [Themes.black]: {
        wrapper: {
           background: commonTheme.wrapper.background
        },
        name: {
            background: '#282c2e',
            text: 'white'
        },
        arrow: {
            background: commonTheme.arrow.background
        },
        content: {
            background: commonTheme.content.background
        }
    },
    [Themes.red]: {
        wrapper: {
           background: commonTheme.wrapper.background
        },
        name: {
            background: '#de5b5b',
            text: 'white'
        },
        arrow: {
            background: commonTheme.arrow.background
        },
        content: {
            background: commonTheme.content.background
        }
    },
    [Themes.yellow]: {
        wrapper: {
           background: commonTheme.wrapper.background
        },
        name: {
            background: '#e8bd3c',
            text: commonTheme.name.text,
        },
        arrow: {
            background: commonTheme.arrow.background
        },
        content: {
            background: commonTheme.content.background
        }
    }
};