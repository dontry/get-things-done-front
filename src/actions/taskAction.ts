import { useEffect } from "react";
import requestStore from "../stores/requestStore";
import { useQuery } from "react-query";
import taskStore from "../stores/taskStore";
import api from "../api";
import { ITask } from "../types";
import Task from "../classes/Task";
import { RequestType } from "../types";
import _ from "lodash";

const requestType = RequestType.TASK;

export function fetchAllTasks() {
  const { isLoading, data } = useQuery("tasks", () => api.get("/tasks").then(res => res.data));
  useEffect(() => {
    requestStore.setRequestInProgress(requestType, isLoading);
      taskStore.addTaskList(data);
  }, [isLoading, data]);
}

export function updateTaskById(id: string, payload: ITask) {
  requestStore.setRequestInProgress(requestType, true);
  return api
    .put(`/tasks/${id}`, payload)
    .then(res => {
      const task = res.data;
      taskStore.updateTaskById(id, task);
      requestStore.setRequestInProgress(requestType, false);
    })
    .catch(error => {
      requestStore.setRequestInProgress(requestType, false);
    });
}

export function createTask(payload: Task): Promise<void> {
  requestStore.setRequestInProgress(requestType, true);
  return api
    .post(`/tasks`, payload)
    .then(res => {
      const task = res.data;
      taskStore.addTask(task);
      requestStore.setRequestInProgress(requestType, false);
    })
    .catch(error => {
      requestStore.setRequestInProgress(requestType, false);
    });
}

export function deleteTask(id: string) {
  requestStore.setRequestInProgress(requestType, true);
  return api
    .delete(`/tasks/${id}`)
    .then(res => {
      console.log(`deletTask: ${JSON.stringify(res.data)}`);
      if (!_.isEmpty(res.data)) {
        taskStore.deleteTaskById(id);
        requestStore.setRequestInProgress(requestType, false);
      }
    })
    .catch(error => {
      requestStore.setRequestInProgress(requestType, false);
    });
}
