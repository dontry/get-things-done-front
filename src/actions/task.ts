import requestStore from "@stores/requestStore";
import taskStore from "@stores/taskStore";
import api from "src/api";
import { ITask, INewTask } from "src/types";
import { RequestType } from "src/types";

const requestType = RequestType.TASK;

export function fetchAllTasks() {
  requestStore.setRequestInProgress(requestType, true);
  api.get("/tasks").then(res => {
    const tasks: ITask[] = res.data;
    taskStore.addTaskList(tasks);
    requestStore.setRequestInProgress(requestType, false);
  });
}

export function updateTaskById(id: string, payload: ITask) {
  requestStore.setRequestInProgress(requestType, true);
  api.put(`/tasks/${id}`, { task: payload }).then(res => {
    const task: ITask = res.data;
    taskStore.updateTaskById(id, task);
    requestStore.setRequestInProgress(requestType, false);
  });
}

export function createTask(payload: INewTask) {
  requestStore.setRequestInProgress(requestType, true);
  api.post(`/tasks`, { task: payload }).then(res => {
    const task: ITask = res.data;
    taskStore.addTask(task);
    requestStore.setRequestInProgress(requestType, false);
  });
}

export function deleteTask(id: string) {
  requestStore.setRequestInProgress(requestType, true);
  api.delete(`/tasks/${id}`).then(res => {
    taskStore.deleteTaskById(id);
    requestStore.setRequestInProgress(requestType, false);
  });
}
