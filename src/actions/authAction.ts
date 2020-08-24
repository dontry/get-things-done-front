import { userStore, routerStore } from "../stores";
import { ILoginCredential, RequestType, IRegisterProfile } from "../types";
import { persistanceService } from "../classes/PersistanceService";
import api from "../api";

const requestType = RequestType.USER;

export function register(profile: IRegisterProfile) {
  return api.post("/register", profile).then(() => {
    routerStore.push("/login");
  });
}

export function login(credential: ILoginCredential) {
  return api.post("/login", credential).then(res => {
    const { data } = res;
    const { user, access_token, access_token_expires_at } = data;
    userStore.mergeUser(user);
    persistanceService.setItem("access_token", access_token);
    persistanceService.setItem("access_token_expires_at", access_token_expires_at);
    routerStore.push("/home/inbox");
  });
}

export function logout() {
  userStore.clearUser();
  persistanceService.removeItem("token");
}
