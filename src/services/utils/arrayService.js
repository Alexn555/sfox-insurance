import { NumberService } from './numberService';
import { StringService } from './stringService';

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

    // (c) https://www.30secondsofcode.org/js/s/pluck-values-from-object-array/
    static pluck = (arr, key, mode = '') => arr.map((i) => { 
      return mode === 'upper' ? StringService.capFirstLetter(i[key]) : i[key];
    });

    // (c) https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    static shuffle(arr) {
      let nw = arr.slice();
      for (let i = nw.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [nw[i], nw[rand]] = [nw[rand], nw[i]];
      }
      return nw;
    }

    static getRandomItemFromList(list, fIndex = 0, lastIndex = list.length - 1) {
        return list[NumberService.randomInteger(fIndex, lastIndex)];
    }

    static addOrSplice(saveObj, val) {
        if (!saveObj) {
          saveObj = [];
        }

        let found = saveObj.indexOf(val);
        if (found < 0) {
          saveObj.push(val);
        } else {
          saveObj.splice(found, 1);
        }
        return saveObj;
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