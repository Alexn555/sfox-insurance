import EnvService from "../../services/api/envService";

export let LoginSets = {
  salt: EnvService.getAccountSalt(),
  info: {
    enabled: true,
  },
};
