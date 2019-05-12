import { requestStore, userStore, routerStore, messageStore } from "../stores";
import { ILoginCredential, RequestType, IRegisterProfile, MessageType } from "../types";
import api from "../api";

const requestType = RequestType.USER;

export function register(profile: IRegisterProfile) {
  requestStore.setRequestInProgress(requestType, true);
  return api.post("/auth/register", profile).then(res => {
    routerStore.push("/login");
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
      if (error.data) {
        messageStore.setError(MessageType.NETWORK, error.data.message);
      } else {
        messageStore.setError(MessageType.NETWORK, error.message);
      }
    });
}

export function logout() {
  userStore.clearUser();
  window.localStorage.removeItem("token");
}
