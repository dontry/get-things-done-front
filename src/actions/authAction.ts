import { requestStore, userStore, routerStore, errorStore } from "../stores";
import { ILoginCredential, RequestType, IRegisterProfile, ErrorType } from "../types";
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
      errorStore.setError(ErrorType.NETWORK, error.data.message);
    });
}

export function logout() {
  userStore.clearUser();
  window.localStorage.removeItem("token");
  routerStore.push("/login");
}
