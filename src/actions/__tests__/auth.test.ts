import api from "../../api";
import { ILoginCredential } from "src/types";

describe("user", () => {
  afterEach(() => {
    window.localStorage.removeItem("token");
  });
  it("should login successfully", done => {
    const credential: ILoginCredential = {
      username: "crystal",
      password: "11d%#@as22d"
    };
    api.post("/auth/login", credential).then(res => {
      const { user, token } = res.data;
      expect(user.username).toBe("crystal");
      expect(token).toBeTruthy();
      done();
    });
  });
});
