export let AdvReviews = [
    { 
        id: '11', 
        name: 'How did you liked recommendation?', 
        required: false,
        answers: [
            { val: 1, label: 'bad' },
            { val: 2, label: 'normal' },
            { val: 3, label: 'good' },
        ]
    },
    { 
        id: '12', 
        name: 'Is this website have decent amount of services?', 
        required: true,
        answers: [
            { val: 1, label: 'yes' },
            { val: 2, label: 'no' },
        ]
    },
    { 
        id: '13', 
        name: 'In scale 2 - 5 (bad - good) how would you rate those services?', 
        required: false,
        answers: [
            { val: 2, label: '2' },
            { val: 3, label: '3' },
            { val: 4, label: '4' },
            { val: 5, label: '5' },
        ]
    },
    { 
        id: '15', 
        name: 'Are serivces handly for this website?', 
        required: false,
        answers: [
            { val: 1, label: 'yes' },
            { val: 2, label: 'no' },
        ]
    },
];