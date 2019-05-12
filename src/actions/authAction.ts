import { requestStore, userStore, routerStore } from "../stores";
import { ILoginCredential, RequestType, IRegisterProfile } from "../types";
import api from "../api";

const requestType = RequestType.USER;

export function register(profile: IRegisterProfile) {
  requestStore.setRequestInProgress(requestType, true);
  return api
    .post("/auth/register", profile)
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
    .post("/auth/login", credential)
    .then(res => {
      const { data } = res;
      const { user, token } = data;
      userStore.mergeUser(user);
      window.localStorage.setItem("token", token);
      requestStore.setRequestInProgress(requestType, false);
      routerStore.push("/home/inbox");
    })
    .catch(error => {
      requestStore.setRequestInProgress(requestType, false);
    });
}

export function logout() {
  userStore.clearUser();
  window.localStorage.removeItem("token");
}
