// @ts-nocheck
import usersData from '../../data/mocks/users.json';
import { LoginSets } from '../../settings';
import { EncryptService } from '../helpers';
import LoggerService from '../loggerService';

export class UserService {
    static getLoginData(user) {
        if (user) {
            let data = usersData.users;
            let foundIndex = data.map(found => found.username).indexOf(user.username);
            if (foundIndex > -1) {
                let inputPwd = `${user.password}${LoginSets.salt}`;
                let decodedPwd = EncryptService.decodeBase64Str(data[foundIndex].password);
                if (decodedPwd === inputPwd) {
                    return data[foundIndex];
                }
                LoggerService.warn(`LoginService user "${user.username}" with password not found!`);
                return null;
            }
            return null;
        }
    }
}