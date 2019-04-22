import api from "../../api";
import user from "./user";

function loginUser(credential = user) {
  return api.post("/auth/login", credential).then(res => {
    const { token } = res.data;
    window.localStorage.setItem("token", token);
  });
}

export default loginUser;
