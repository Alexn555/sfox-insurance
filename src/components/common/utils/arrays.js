import { randomInteger } from './number';

export const getOptionFromString = (key, index) => {
    if (index === -1) {
        return JSON.parse(key);
    }
    return JSON.parse(key)[index];
}

export const getRandomItemFromList = (list) => {
    return list[randomInteger(0, list.length - 1)];
}