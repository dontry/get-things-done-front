import api from "../../api";
import { ILoginCredential } from "../../types";
import userStore from "../../stores/userStore";

function loginUser(credential: ILoginCredential) {
  return api.post("/auth/login", credential).then(res => {
    const { user, token } = res.data;
    userStore.mergeUser(user);
    window.localStorage.setItem("token", token);
    return;
  });
}

export default loginUser;
