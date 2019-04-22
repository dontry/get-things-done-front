import api from "../../api";
import * as taskAction from "../taskAction";
import taskStore from "../../stores/taskStore";
import requestStore from "../../stores/requestStore";
import { ITask } from "../../types";
import loginUser from "../../test/fixture/loginUser";
import initializeRouter from "../../test/fixture/initializeRouter";

describe("fetch all tasks", () => {
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
  it("should return tasks", done => {
    api.get("/tasks").then(res => {
      const tasks: ITask[] = res.data;
      expect(tasks.length).toBeGreaterThan(0);
      done();
    });
  });
  it("should update taskStore", done => {
    taskAction.fetchAllTasks().then(() => {
      expect(taskStore.tasks.size).toBeGreaterThan(0);
      done();
    });
  });
  it("should update requestStore twice", done => {
    const spy = jest.spyOn(requestStore, "setRequestInProgress");
    taskAction.fetchAllTasks().then(() => {
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, "TASK", true);
      expect(spy).toHaveBeenNthCalledWith(2, "TASK", false);
      done();
    });
  });
});
