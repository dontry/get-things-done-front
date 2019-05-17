import api from "../index";
import { ITask, ILoginCredential } from "../../types";
import loginUser from "../../test/fixture/loginUser";
import initializeRouter from "../../test/fixture/initializeRouter";
import userStub from "../../test/fixture/user";
import userStore from "../../stores/userStore";
import mockStorage from "../../test/fixture/mockStorage";
import { persistanceService } from "../../classes/PersistanceService";

describe("login", () => {
  beforeAll(() => {
    mockStorage();
    userStore.clearUser();
    persistanceService.clear();
  });

  it("should login successfully", done => {
    const credential: ILoginCredential = userStub;
    api.post("/auth/login", credential).then(res => {
      const { user, token } = res.data;
      expect(user.username).toBe(userStub.username);
      expect(token).toBeTruthy();
      done();
    });
  });
});

describe("tasks", () => {
  beforeAll(done => {
    persistanceService.clear();
    userStore.clearUser();
    jest.clearAllMocks();

    initializeRouter();
    loginUser(userStub).then(() => {
      done();
    });
  });

  afterAll(() => {
    persistanceService.clear();
    userStore.clearUser();
    jest.clearAllMocks();
  });

  it("should return string", done => {
    api.get("/hello").then(res => {
      const { data } = res;
      expect(typeof data).toBe("string");
      done();
    });
  }, 10000);

  it("should return all tasks", done => {
    api.get("/tasks").then(res => {
      const tasks: ITask[] = res.data;
      expect(tasks.length).toBeGreaterThan(0);
      done();
    });
  }, 100000);
});
