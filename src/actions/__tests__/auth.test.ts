import { ILoginCredential } from "../../types";
import userStub from "../../test/fixture/user";
import userStore from "../../stores/userStore";
import requestStore from "../../stores/requestStore";
import { login, logout } from "../authAction";
import loginUser from "../../test/fixture/loginUser";

const credential: ILoginCredential = userStub;

jest.mock("../../stores/routerStore");

describe("login", () => {
  beforeAll(() => {
    window.localStorage.clear();
    userStore.clearUser();
    jest.clearAllMocks();
  });
  afterEach(() => {
    window.localStorage.clear();
    userStore.clearUser();
    jest.clearAllMocks();
  });

  it("should set authenticated of userStore to true", done => {
    login(credential).then(() => {
      expect(userStore.authenticated).toBeTruthy();
      done();
    });
  });

  it("should call setRequestInProgress twice", done => {
    const spy = jest.spyOn(requestStore, "setRequestInProgress");
    login(credential).then(() => {
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, "USER", true);
      expect(spy).toHaveBeenNthCalledWith(2, "USER", false);
      done();
    });
  });

  it("should call window setItem and create a token", done => {
    const spy = jest.spyOn(window.localStorage.__proto__, "setItem");
    login(credential).then(() => {
      expect(spy).toHaveBeenCalledTimes(2); /// TOFIX: why is this called twice?????
      expect(window.localStorage.getItem("token")).toBeTruthy();
      done();
    });
  });
});

describe("logout", () => {
  beforeEach(done => {
    loginUser(credential);
    done();
  });
  afterEach(() => {
    window.localStorage.clear();
    userStore.clearUser();
    jest.clearAllMocks();
  });
  it("should call localStorage.removeItem('token')", done => {
    const spy = jest.spyOn(window.localStorage.__proto__, "removeItem");
    logout();
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  });

  it("should call userStore.clearUser()", done => {
    const spy = jest.spyOn(userStore, "clearUser");
    logout();
    expect(spy).toHaveBeenCalledTimes(1);
    done();
  });
});
