import { Themes, PackThemes } from '../../../theme/enums';

export const bannerCarouselTheme = {
    propertyAmount: 3,
    [PackThemes.common]: {
        bck: '#f2f2f2',
        border: 'black',
        scene: {
            bck: '#4a4a4a'
        },
        banner: {
            border: 'white'
        },
        label: {
            text: 'white',
            desc: 'white',
            border: 'orange',
            opacity: 0.7
        }
    },
    [Themes.main1]: {
        bck: '#f2f2f2',
        border: 'black',
        scene: {
            bck: '#4a4a4a',
        },
        banner: {
            border: 'white'
        },
        label: {
            text: 'white',
            desc: 'white',
            border: 'orange',
            opacity: 0.7
        }
    },
};