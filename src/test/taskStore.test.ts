import { TaskStore } from "../stores/taskStore";
import { mockData } from "./fixture/tasks";
import { ITask } from "../types";

const taskList: ITask[] = Object.values(mockData.tasks);

describe("taskStore", () => {
  let taskStore: TaskStore;
  beforeEach(() => {
    taskStore = new TaskStore();
  });

  it("should add List", () => {
    taskStore.addTaskList(taskList);
    expect(taskStore.tasks.size).toBeGreaterThan(2);
  });

  it("should add a task", () => {
    const task = taskList[0];
    taskStore.addTask(task);
    const res = taskStore.getTaskById(task.id);
    expect(res!.id).toBe(task.id);
  });

  it("should delete a task by Id", () => {
    taskStore.addTaskList(taskList);
    const firstTask = taskList[0];
    taskStore.deleteTaskById(firstTask.id);
    const res = taskStore.getTaskById(firstTask.id);
    expect(res).toBeUndefined();
  });

  it("should update a task by Id", () => {
    taskStore.addTaskList(taskList);
    const firstTask: ITask = taskList[0];
    const updatedFirstTask: ITask = {
      ...firstTask,
      title: "new title"
    };
    taskStore.updateTaskById(firstTask.id, updatedFirstTask);
    const res = taskStore.getTaskById(firstTask.id);
    expect(res!.title).toBe("new title");
  });

  it("should get tasks in inbox", () => {
    taskStore.addTaskList(taskList);
    const res = (taskStore as any).inboxTasks;
    expect(res.length).toBeGreaterThan(0);
  });

  it("should get tasks in plan", () => {
    taskStore.addTaskList(taskList);
    const res = (taskStore as any).planTasks;
    expect(res.length).toBeGreaterThan(0);
  });

  it("should get tasks in next", () => {
    taskStore.addTaskList(taskList);
    const res = (taskStore as any).nextTasks;
    expect(res.length).toBeGreaterThan(0);
  });
});
