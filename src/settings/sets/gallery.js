import { Cursors } from '../../enums';

export const GallerySet = {
    defaultSearch: 'art',
    showLabel: true,
    saveId: 'gallery-save-search',
    searchEvent: 'gallery-search-open',
    searchSavedInit: 'gallery-saved-init',
    searchSave: true,
    searchEnabled: true,
    pageCursor: Cursors.normal, // Cursors.pointer
    thumbsOpenable: '1',
    minimumSearch: 3, // chars
    perPage: 4, // all - without pagination
    total: 20
};