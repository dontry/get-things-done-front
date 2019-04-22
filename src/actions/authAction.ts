import requestStore from "@stores/requestStore";
import userStore from "@stores/userStore";
import api from "src/api";
import { ILoginCredential, RequestType, IRegisterProfile } from "src/types";
import { routerStore } from "src/stores";

const requestType = RequestType.USER;

export function login(credential: ILoginCredential) {
  requestStore.setRequestInProgress(requestType, true);
  return api.post("/auth/login", credential).then(res => {
    const { data } = res;
    const { user, token } = data;
    userStore.mergeUser(user);
    window.localStorage.setItem("token", token);
    requestStore.setRequestInProgress(requestType, false);
  });
}

export function register(profile: IRegisterProfile) {
  requestStore.setRequestInProgress(requestType, true);
  return api.post("/auth/register", profile).then(res => {
    routerStore.push("/login");
  });
}
