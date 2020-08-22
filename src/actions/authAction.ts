import { requestStore, userStore, routerStore } from "../stores";
import { ILoginCredential, RequestType, IRegisterProfile } from "../types";
import { persistanceService } from "../classes/PersistanceService";
import api from "../api";

const requestType = RequestType.USER;

export function register(profile: IRegisterProfile) {
  requestStore.setRequestInProgress(requestType, true);
  return api
    .post("/register", profile)
    .then(res => {
      routerStore.push("/login");
    })
    .catch(error => {
      requestStore.setRequestInProgress(requestType, false);
    });
}

export function login(credential: ILoginCredential) {
  requestStore.setRequestInProgress(requestType, true);
  return api
    .post("/login", credential)
    .then(res => {
      const { data } = res;
      const { user, access_token, access_token_expires_at } = data;
      userStore.mergeUser(user);
      persistanceService.setItem("access_token", access_token);
      persistanceService.setItem("access_token_expires_at", access_token_expires_at);
      requestStore.setRequestInProgress(requestType, false);
      routerStore.push("/home/inbox");
    })
    .catch(error => {
      requestStore.setRequestInProgress(requestType, false);
    });
}

export function logout() {
  userStore.clearUser();
  persistanceService.removeItem("token");
}
