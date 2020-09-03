import { useEffect, useRef } from 'react';
import { useMutation, usePaginatedQuery, queryCache, useQuery } from 'react-query';
import requestStore from '../stores/requestStore';
import taskStore from '../stores/taskStore';
import { apiService } from '../api';
import { ITask, INewTask } from '../types';
import _ from 'lodash';

const initialFetchTasksData = {
  items: [],
  next: '',
  previous: '',
  pageCount: 0
};

export function useFetchTasksByCategory(category: string, paginationParams: string = `page=1&limit=15`) {
  const currentQueryKey = ['tasks', category, paginationParams];
  const { status, error, resolvedData, isFetching } = usePaginatedQuery(
    ['tasks', category, paginationParams],
    (key, _category, _paginationParams) => {
      return apiService.get(`/${key}?category=${_category}&${_paginationParams}`).then(res => res.data);
    },
    {
      initialData: initialFetchTasksData,
      initialStale: () => !queryCache.getQueryData(['tasks', category, paginationParams]),
    }
  );

  const { items, next, previous, pageCount } = resolvedData;
  useEffect(() => {
    if (status === 'success') {
      taskStore.addTaskList(items);
      requestStore.setCurrentQueryKey(currentQueryKey);
    }
  }, [status, items]);

  return { items, next, previous, pageCount, status, error, isFetching };
}

export function useFetchTasksByProjectId(projectId: string, paginationParams: string = `page=1&limit=100`) {
  const { status, error, isFetching, resolvedData } = usePaginatedQuery(
    [`tasks`, projectId, paginationParams],
    (key, _projectId, _paginationParams) => {
      return apiService.get(`/${key}/project/${_projectId}?${_paginationParams}`).then(res => res.data);
    },
    {
      initialData: initialFetchTasksData,
      initialStale: () => !queryCache.getQueryData(projectId),
    }
  );

  const { items, next, previous, pageCount } = resolvedData || {
    items: [],
    next: '',
    previous: '',
    pageCount: 0
  };

  useEffect(() => {
    if (status === 'success') {
      taskStore.addTaskList(items);
      requestStore.setCurrentQueryKey(projectId);
    }
  }, [status, items]);

  return { items, next, previous, pageCount, status, error, isFetching };
}

interface IUpdateTaskMutationVariable {
  task: ITask;
}

export function useUpdateTask() {
  const [updateTask, { data, error, status }] = useMutation<ITask, IUpdateTaskMutationVariable>(
    ({ task }) => apiService.put(`/tasks/${task.id}`, task).then(res => res.data),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(requestStore.currentQueryKey);
      }
    }
  );

  useEffect(() => {
    if (status === 'success') {
      const task = data as ITask;
      taskStore.updateTask(task);
    }
  }, [status, data]);

  return { updateTask, status, data, error };
}

interface ICreateTaskMutationVariable {
  task: INewTask;
}

export function useCreateTask() {
  const [createTask, { data, error, status }] = useMutation<ITask, ICreateTaskMutationVariable>(
    ({ task }) => apiService.post(`/tasks`, task).then(res => res.data),
    {
      onSuccess: () => {
        queryCache.invalidateQueries(requestStore.currentQueryKey);
      }
    }
  );

  useEffect(() => {
    if (status === 'success') {
      const task = data as ITask;
      taskStore.addTask(task);
    }
  }, [status, data]);

  return { createTask, status, data, error };
}

export function useDeleteTaskById(id: string) {
  const [createTask, { error, status }] = useMutation(_payload =>
    apiService.delete(`/tasks/${id}`).then(res => res.data)
  );

  useEffect(() => {
    if (status === 'success') {
      taskStore.deleteTaskById(id);
    }
  }, [status]);

  return { createTask, status, error };
}
