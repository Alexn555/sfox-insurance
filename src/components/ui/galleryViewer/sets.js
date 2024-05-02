import { Cursors } from '../../../enums';

export const GallerLoadHolders = {
    Simple: 'simpla',
    Advenced: 'advenced'
};

export const GalleryImgViewerEnums = {
    open: '1',
    close: '0'
};

export const GallerySet = {
    defaultSearch: 'art',
    showLabel: true,
    saveId: 'gallery-save-search',
    searchEvent: 'gallery-search-open',
    searchSavedInit: 'gallery-saved-init',
    searchSave: true,
    searchEnabled: true,
    pageCursor: Cursors.normal, // Cursors.pointer
    holderLoad: GallerLoadHolders.Simple,
    thumbCursor: Cursors.normal,
    thumbsOpenable: GalleryImgViewerEnums.open, 
    minimumSearch: 3, // chars
    perPage: 4, // all - without pagination
    total: 20
};