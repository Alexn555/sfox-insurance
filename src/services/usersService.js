// @ts-nocheck
import usersData from '../data/mocks/users.json';
import EncryptService from './encryptService';
import LoggerService from './loggerService';

export class UserService {
    static getLoginData(user) {
        if (user) {
            const data = usersData.users;
            const foundIndex = data.map(found => found.username).indexOf(user.username);
            if (foundIndex > -1) {
                const decodedPwd = EncryptService.decodeBase64Str(data[foundIndex].password);
                if (decodedPwd === user.password) {
                    return data[foundIndex];
                }
                LoggerService.warn(`LoginService user "${user.username}" with password not found!`);
                return null;
            }
            return null;
        }
    }
}