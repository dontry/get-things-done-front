import { observable, action, computed } from 'mobx';
import { ITask, Attribute } from '../types';
import mapToObject from '../lib/mapToObject';
import _ from 'lodash';
import fp from 'lodash/fp';
import { isToday } from '../lib/date';

export interface ITaskStore {
  tasks: Map<string, ITask>;
  inboxTasks: ITask[];
  planTasks: ITask[];
  nextTasks: ITask[];
  todayTasks: ITask[];
  json: object;
  list: ITask[];
}

export class TaskStore implements ITaskStore {
  @observable public tasks: Map<string, ITask>;
  // private tasksByAttributeCache = new Map();
  constructor() {
    this.tasks = observable.map();
  }

  // public getTasksByAttribute(attribute: string) {
  //   if (this.tasksByAttributeCache.has(attribute)) {
  //     return this.tasksByAttributeCache.get(attribute).get();
  //   }
  //   const result = computed(() => {
  //       const computedFilter = this.tasks.filter(task => task.attribute === attribute))
  //       return arrayToObject(computedFilter);
  //   };
  //   this.tasksByAttributeCache.set(attribute, result); // Q: when do we remove items from the cache? Never? When user is unloaded?
  //   return this.tasksByAttributeCache.get(attribute);
  // }
  @computed
  public get json(): object {
    return mapToObject<ITask>(this.tasks);
  }

  @computed
  public get list(): ITask[] {
    const list: ITask[] = [];
    for (const [key, task] of this.tasks) {
      list.push(task);
    }
    return list.sort((a, b) => {
      return a.pos - b.pos;
    });
  }

  @computed
  public get inboxTasks(): ITask[] {
    const checkInbox = checkByAttribute('inbox');
    const getInboxTasks = _.flow(fp.filter(checkActive), fp.filter(checkInbox));
    return getInboxTasks(this.list);
  }

  @computed
  public get planTasks(): ITask[] {
    const checkPlan = checkByAttribute('plan');
    const getPlanTasks = _.flow(fp.filter(checkActive), fp.filter(checkPlan));
    return getPlanTasks(this.list);
  }

  @computed
  public get nextTasks(): ITask[] {
    const checkNext = checkByAttribute('next');
    const getNextTasks = _.flow(fp.filter(checkActive), fp.filter(checkNext));
    return getNextTasks(this.list);
  }

  @computed
  public get todayTasks(): ITask[] {
    const getTodayTasks = _.flow(fp.filter(checkActive), fp.filter(checkToday));
    return getTodayTasks(this.list);
  }

  @computed
  public get completedTasks(): ITask[] {
    return this.list.filter(checkCompleted);
  }

  @computed
  public get deletedTasks(): ITask[] {
    return this.list.filter(checkDeleted);
  }

  @action
  public addTaskList(tasks: ITask[] = []): void {
    for (const task of tasks) {
      if (task.id) {
        this.tasks.set(task.id, task);
      }
    }
  }

  @action
  public getTaskById(id: string | undefined): ITask | undefined {
    if (id) {
      return this.tasks.get(id);
    } else {
      return undefined;
    }
  }

  @action
  /**
   * addTaskById
   */
  public addTask(task: ITask): void {
    if (task.id) {
      this.tasks.set(task.id, task);
    }
  }

  @action
  /**
   * updateTaskById
   */
  public updateTaskById(id: string, task: ITask) {
    if (this.tasks.get(id)) {
      this.tasks.set(id, task);
    }
  }

  @action
  /**
   * updateTaskById
   */
  public updateTask(task: ITask) {
    if (!task.id) {
      return;
    }

    if (this.tasks.get(task.id)) {
      this.tasks.set(task.id, task);
    }
  }

  @action
  /**
   * deleteTaskById
   */
  public deleteTaskById(id: string): void {
    this.tasks.delete(id);
  }

  public getSize(): number {
    return this.tasks.size;
  }

  public getSizeByAttribute(attribute: Attribute): number {
    const tasks: ITask[] = getTasksByAttribute(this.tasks, attribute);
    return tasks.length;
  }
}

function getTasksByAttribute(tasks: Map<string, ITask>, attribute: Attribute): ITask[] {
  const selectedTasks: ITask[] = [];
  tasks.forEach((task: ITask) => {
    if (task.attribute === attribute) {
      selectedTasks.push(task);
    }
  });
  return selectedTasks;
}

const taskStore = new TaskStore();

function checkActive(task: ITask): boolean {
  const { archived, deleted, completedAt } = task;
  return archived === 0 && deleted === 0 && completedAt === 0;
}

// get tasks created or starts today
function checkToday(task: ITask): boolean {
  return isToday(task.startAt);
}

function checkByAttribute(attribute: Attribute): (task: ITask) => boolean {
  return (task: ITask): boolean => task.attribute === attribute;
}

function checkDeleted(task: ITask): boolean {
  return task.deleted > 0;
}

function checkCompleted(task: ITask): boolean {
  return task.completedAt > 0;
}

export default taskStore;
