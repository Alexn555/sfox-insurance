export class ObjectService {
    static objectPropertyAmount(obj) {
        return obj ? Object.keys(obj).length : 0;
    }
}