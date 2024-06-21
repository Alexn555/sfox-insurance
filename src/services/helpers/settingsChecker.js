import { LoggerService } from '../index';
import { JSONService } from '../storage/jsonService';

export class SettingsChecker {
    static getId(id, enumIds, sets) {
        let cont = sets[id];

        let propertiesAmount = 0;
        if (sets.allLevelsCount) {
            propertiesAmount = JSONService.set(cont).match(/[^\\]":/g).length;
        } else {
            propertiesAmount = Object.keys(cont).length;
        }

        if (!cont) {
            cont = sets[enumIds.common];
            LoggerService.warn(`Settings container not found id:"${id}", using common id`);
        }
        if (propertiesAmount !== sets.propertyAmount || 
            propertiesAmount < sets.propertyAmount) {
            LoggerService.warn(`Settings container with id:"${id}", currently having less [properties] than required!`);
        }
        return cont;
    }
}