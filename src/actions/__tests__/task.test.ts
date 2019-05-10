import api from "../../api";
import * as taskAction from "../taskAction";
import taskStore from "../../stores/taskStore";
import requestStore from "../../stores/requestStore";
import userStore from "../../stores/userStore";
import { ITask, IUser } from "../../types";
import Task from "../../classes/Task";
import loginUser from "../../test/fixture/loginUser";
import user from "../../test/fixture/user";
import initializeRouter from "../../test/fixture/initializeRouter";
import faker from "faker";

describe("fetch all tasks", () => {
  beforeAll(done => {
    initializeRouter();
    loginUser(user).then(() => {
      done();
    });
  });

  afterAll(() => {
    userStore.clearUser();
    window.localStorage.removeItem("token");
  });
  it("should return tasks", done => {
    taskAction.fetchAllTasks().then(() => {
      expect(taskStore.tasks.size).toBeGreaterThan(0);
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

  it("should create a new task in inbox", done => {
    const user: IUser = userStore.user as IUser;
    if (!user.id) {
      throw new Error("userId is undefined");
    }

    const task = new Task({
      title: faker.lorem.words(5),
      attribute: "inbox",
      userId: user.id
    });

    const prevTaskSize = taskStore.tasks.size;
    const prevInboxTaskSize = taskStore.getSizeByAttribute("inbox");

    taskAction.createTask(task).then(() => {
      expect(taskStore.tasks.size).toBe(prevTaskSize + 1);
      expect(taskStore.inboxTasks.length).toBe(prevInboxTaskSize + 1);
      done();
    });
  });

  it("should create a new task on today", done => {
    const user: IUser = userStore.user as IUser;
    if (!user.id) {
      throw new Error("userId is undefined");
    }

    const task = new Task({
      title: faker.lorem.words(5),
      attribute: "inbox",
      userId: user.id
    });

    const prevTaskSize = taskStore.tasks.size;
    const prevTodayTaskSize = taskStore.todayTasks.length;

    taskAction.createTask(task).then(() => {
      expect(taskStore.tasks.size).toBe(prevTaskSize + 1);
      expect(taskStore.todayTasks.length).toBe(prevTodayTaskSize + 1);
      done();
    });
  });

  it("should delete a task in inbox", async done => {
    await taskAction.fetchAllTasks();
    const tasks: ITask[] = taskStore.list;
    const lastTask: ITask = tasks[tasks.length - 1];
    const prevTaskSize = taskStore.tasks.size;

    if (!lastTask.id) {
      throw new Error("lastTask id is undefined");
    }

    await taskAction.deleteTask(lastTask.id);
    expect(taskStore.tasks.size).toBe(prevTaskSize - 1);
    done();
  });
});
