import EnvService from "../../services/api/envService";

export const LoginSets = {
  salt: EnvService.getAccountSalt(),
  info: {
    enabled: true,
  },
};
