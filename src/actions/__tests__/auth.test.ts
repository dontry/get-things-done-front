import { ILoginCredential } from "../../types";
import userStub from "../../test/fixture/user";
import userStore from "../../stores/userStore";
import requestStore from "../../stores/requestStore";
import { login, logout } from "../authAction";
import loginUser from "../../test/fixture/loginUser";
import mockStorage from "../../test/fixture/mockStorage";
import { persistanceService } from "../../classes/PersistanceService";

const credential: ILoginCredential = userStub;

jest.mock("../../stores/routerStore");

describe("login", () => {
  beforeAll(() => {
    mockStorage();
    persistanceService.clear();
    userStore.clearUser();
    jest.clearAllMocks();
  });
  afterEach(() => {
    persistanceService.clear();
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

  it("should call storage setItem and create a token", done => {
    const spy = jest.spyOn(persistanceService, "setItem");
    login(credential).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(persistanceService.getItem("token")).toBeTruthy();
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
    persistanceService.clear();
    userStore.clearUser();
    jest.clearAllMocks();
  });
  it("should call localStorage.removeItem('token')", done => {
    // spy window.localStorage
    // const spy = jest.spyOn(window.localStorage.__proto__, "removeItem");
    const spy = jest.spyOn(persistanceService, "removeItem");
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
