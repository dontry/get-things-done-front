import api from "../index";
import { ITask } from "src/types";
import loginUser from "../../test/fixture/loginUser";
import initializeRouter from "../../test/fixture/initializeRouter";

describe("api", () => {
  beforeAll(done => {
    if ((process.env.NODE_ENV as string) === "local") {
      initializeRouter();
      loginUser().then(() => {
        done();
      });
    } else {
      done();
    }
  });
  afterAll(() => {
    window.localStorage.removeItem("token");
  });
  it("should return string", done => {
    api.get("/hello").then(res => {
      const { data } = res;
      expect(typeof data).toBe("string");
      done();
    });
  }, 10000);

  it("should return all tests", done => {
    api.get("/tasks").then(res => {
      const tasks: ITask[] = res.data;
      expect(tasks.length).toBeGreaterThan(0);
      done();
    });
  }, 100000);
});
