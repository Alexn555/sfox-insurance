export const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sample = (indexes) => {
    return randomInteger(0, indexes.length - 1);
}