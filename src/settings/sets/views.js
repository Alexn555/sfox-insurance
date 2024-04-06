export const ImageViewerIds = {
    common: 'common',
    writer: 'writer'
};

export const ImageViewerSettings = {
    common: { // default, non-specific
        // searchListNum: 0 - fist item, 1 - 2 items, [num] - integer items, 'all' - all items
        searchListNum: 0,
        draggable: true,
        zoomEnable: true,
        originalLink: true
    },
    writer: { // writer - id
        searchListNum: 0,
        draggable: true,
        zoomEnable: true,
        originalLink: true
    }
};