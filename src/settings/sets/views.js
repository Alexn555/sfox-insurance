export const ImageViewerIds = {
    common: 'common',
    writer: 'writer'
};

export const ImageViewerSettings = {
    errorCase: 'error',
    propertyAmount: 7,
    common: { // default, non-specific
        // searchListNum: 0 - fist item, 1 - 2 items, [num] - integer items, 'all' - all items
        searchListNum: 0,
        draggable: true,
        zoomEnable: true,
        originalLink: true,
        zoom: {
           min: 0.4,
           max: 3,
           keyboard: true
        }
    },
    writer: { // writer - id
        searchListNum: 0,
        draggable: true,
        zoomEnable: true,
        originalLink: true,
        zoom: {
            min: 0.4,
            max: 3,
            keyboard: true
        }
    }
};