import GlobalsService from '../../services/globalsService';

export const LoginSets = {
   salt: GlobalsService.getAccountSalt(),
   info: {
      enabled: true
   }
};