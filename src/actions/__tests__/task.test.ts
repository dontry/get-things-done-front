import api from "../../api";
import { ITask } from "../../types";

describe("fetch all tasks", () => {
  it("should return tasks", done => {
    api.get("/v1/tasks").then(res => {
      const tasks: ITask[] = res.data;
      expect(tasks.length).toBeGreaterThan(10);
      expect(tasks).toMatchSnapshot();
      done();
    });
  });
});
