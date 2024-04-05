import { randomInteger } from './number';

export const getOptionFromString = (key, index) => {
    if (index === -1) {
        return JSON.parse(key);
    }
    return JSON.parse(key)[index];
}

export const getRandomItemFromList = (list, fIndex = 0, lastIndex = list.length - 1) => {
    return list[randomInteger(fIndex, lastIndex)];
}