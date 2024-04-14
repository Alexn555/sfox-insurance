import GlobalsService from '../../services/globalsService';

export const LoginSets = {
   salt: GlobalsService.getAccountSalt()
};