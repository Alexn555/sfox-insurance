import EnvService from '../../../services/api/envService';

let rootPath = `${EnvService.getRoot()}/assets/intro/`;

export let StartItemInfo = {
    home: {
        label: 'Home',
        description: 'Home Page shows Start page, Features and Accounts (table) example.',
        image: `${rootPath}home.jpg`,
        w: 200,
        h: 100
    },
    performance: {
        label: 'Performance',
        description: 'Performance Page shows Form features (slider, inputs) example.',
        image: `${rootPath}performance.jpg`,
        w: 200,
        h: 100
    },
    additional: {
        label: 'Additional',
        description: 'Additional Page shows Various interesting pages.',
        image: `${rootPath}additional.jpg`,
        w: 200,
        h: 100
    },
    safe: {
        label: 'Safe',
        description: 'Safe Page shows game and other pages.',
        image: `${rootPath}home.jpg`,
        w: 200,
        h: 100
    },
    reader: {
        label: 'Reader',
        description: 'Reader Page shows contact game and other pages.',
        image: `${rootPath}home.jpg`,
        w: 200,
        h: 100
    },
    additionalMore: {
        pages: [
            { label: 'Game', description: 'Game page using GameViewer' },
            { label: 'Map', description: 'Map page using OpenStreetMap iframe' },
            { label: 'Writer', description: 'Write page using ImageViewer' },
            { label: 'Gallery', description: 'Gallery page using GalleryViewer' },
            { label: 'Account', description: 'Account page using login, account features' }
        ]
    }
};