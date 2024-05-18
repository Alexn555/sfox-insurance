import LoggerService from '../../services/loggerService';

export class ObjectService {
    static getObject(id, obj) {
        if (obj && obj !== undefined) {
            return obj;
        }

        LoggerService.error(`Object #${id} is not defined`);
        return {};
    }

    static objectPropertyAmount(obj) {
        return obj ? Object.keys(obj).length : 0;
    }
}