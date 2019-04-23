import requestStore from "../stores/requestStore";
import userStore from "../stores/userStore";
import routerStore from "../stores/routerStore";
import api from "../api";
import { ILoginCredential, RequestType, IRegisterProfile } from "../types";

const requestType = RequestType.USER;

export function register(profile: IRegisterProfile) {
  requestStore.setRequestInProgress(requestType, true);
  return api.post("/auth/register", profile).then(res => {
    routerStore.push("/login");
  });
}

export function login(credential: ILoginCredential) {
  requestStore.setRequestInProgress(requestType, true);
  return api.post("/auth/login", credential).then(res => {
    const { data } = res;
    const { user, token } = data;
    userStore.mergeUser(user);
    window.localStorage.setItem("token", token);
    requestStore.setRequestInProgress(requestType, false);
    routerStore.push("/home/inbox/board");
  });
}

export function logout() {
  userStore.clearUser();
  window.localStorage.removeItem("token");
  routerStore.push("/login");
}
