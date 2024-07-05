import { ReviewerSetIds } from '../../plugins/reviewer/sets';

const commonSets = {
    input: '10px',
    item: {
        padding: '10px',
        border: 'none',
        borderColumn: '1px dashed #dcdcdc'
    }
};

export const radioGroupSets = {
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