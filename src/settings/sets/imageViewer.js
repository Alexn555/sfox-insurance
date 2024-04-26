export const ImageViewerIds = {
    common: 'common',
    writer: 'writer',
    gallery: 'gallery'
};

export const ImageViewerSettings = {
    errorCase: 'error',
    allLevelsCount: true,
    propertyAmount: 9,
    common: { // default, non-specific
        // searchListNum: 0 - fist item, 1 - 2 items, [num] - integer items, ArrayEnums.All - all items
        searchListNum: 0,
        draggable: true,
        zoomEnable: true,
        originalLink: true,
        exceptionHandler: true,
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
        exceptionHandler: true,
        zoom: {
            min: 0.4,
            max: 3,
            keyboard: true
        }
    },
    gallery: {
        searchListNum: 0,
        draggable: true,
        zoomEnable: true,
        originalLink: true,
        exceptionHandler: true,
        zoom: {
            min: 0.4,
            max: 3,
            keyboard: true
        }
    }
};