import { ReviewerSetIds } from '../../plugins/reviewer/sets';

let commonSets = {
    input: '10px',
    item: {
        padding: '10px',
        border: 'none',
        borderColumn: '1px dashed #dcdcdc'
    }
};

export let radioGroupSets = {
    common: commonSets,
    [ReviewerSetIds.reviewPage]: {
        input: '10px',
        item: {
            padding: '10px',
            border: 'none',
            borderColumn: '1px dashed #dcdcdc'
        }
    },
    [ReviewerSetIds.reviewPageAdvanced]: {
        input: '10px',
        item: {
            padding: '10px',
            border: 'none',
            borderColumn: '1px dashed #dcdcdc'
        }
    }
};