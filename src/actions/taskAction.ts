import requestStore from "../stores/requestStore";
import taskStore from "../stores/taskStore";
import api from "../api";
import { ITask, INewTask } from "../types";
import Task from "../classes/Task";
import { RequestType } from "../types";
import _ from "lodash";

const requestType = RequestType.TASK;

export function fetchAllTasks() {
  requestStore.setRequestInProgress(requestType, true);
  return api.get("/tasks").then(res => {
    const tasks: ITask[] = res.data;
    taskStore.addTaskList(tasks);
    requestStore.setRequestInProgress(requestType, false);
  });
}

export function updateTaskById(id: string, payload: ITask) {
  requestStore.setRequestInProgress(requestType, true);
  return api.put(`/tasks/${id}`, { task: payload }).then(res => {
    const task: ITask = res.data;
    taskStore.updateTaskById(id, task);
    requestStore.setRequestInProgress(requestType, false);
  });
}

export function createTask(payload: Task): Promise<void> {
  requestStore.setRequestInProgress(requestType, true);
  return api.post(`/tasks`, payload).then(res => {
    const task = res.data;
    console.log("new task:", task);
    taskStore.addTask(task);
    requestStore.setRequestInProgress(requestType, false);
  });
}

export function deleteTask(id: string) {
  requestStore.setRequestInProgress(requestType, true);
  return api.delete(`/tasks/${id}`).then(res => {
    console.log(`deletTask: ${JSON.stringify(res.data)}`);
    if (!_.isEmpty(res.data)) {
      taskStore.deleteTaskById(id);
      requestStore.setRequestInProgress(requestType, false);
    }
  });
}
