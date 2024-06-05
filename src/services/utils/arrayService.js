import { NumberService } from './numberService';

export class ArrayService {
    static getOptionFromString(key, index) {
        if (index === -1) {
            return JSON.parse(key);
        }
        return JSON.parse(key)[index];
    }

    static minLength(obj, min = 0) {
        return obj && obj['length'] !== undefined && obj.length > min;
    }

    static getRandomItemFromList(list, fIndex = 0, lastIndex = list.length - 1) {
        return list[NumberService.randomInteger(fIndex, lastIndex)];
    }

    // (c) ashleedawg stackoverflow
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}