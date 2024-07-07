export const Reviews = [
    { 
        id: '1', 
        name: 'How did you liked accommodation?', 
        required: true,
        answers: [
            { val: 1, label: 'bad' },
            { val: 2, label: 'normal' },
            { val: 3, label: 'good' },
            { val: 4, label: 'very good' }
        ]
    },
    { 
        id: '2', 
        name: 'Is this website have decent amount of plugins?', 
        required: false,
        answers: [
            { val: 1, label: 'yes' },
            { val: 2, label: 'no' },
        ]
    },
    { 
        id: '3', 
        name: 'In scale 1 - 5 (bad - good) how would you rate those plugins?', 
        required: false,
        answers: [
            { val: 1, label: '1' },
            { val: 2, label: '2' },
            { val: 3, label: '3' },
            { val: 4, label: '4' },
            { val: 5, label: '5' },
        ]
    },
    { 
        id: '4', 
        name: 'Are serivces handly for this engine?', 
        required: false,
        answers: [
            { val: 1, label: 'yes' },
            { val: 2, label: 'no' },
        ]
    },
];