import { observable, action, computed } from "mobx";
// import { persist } from "mobx-persist";
import { ITask, Attribute } from "src/types";
import { isToday } from "date-fns";
import mapToObject from "../lib/mapToObject";

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
  get inboxTasks(): ITask[] {
    return getTasksByAttribute(this.tasks, "inbox");
  }

  @computed
  get planTasks(): ITask[] {
    return getTasksByAttribute(this.tasks, "plan");
  }

  @computed
  get nextTasks(): ITask[] {
    return getTasksByAttribute(this.tasks, "next");
  }

  @computed
  get todayTasks(): ITask[] {
    return this.list.filter(checkActive).filter(checkToday);
  }

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
    return list;
  }

  @action
  public addTaskList(tasks: ITask[]): void {
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
  const { archived, deleted } = task;
  return archived === 0 && deleted === 0;
}

// get tasks created or starts today
function checkToday(task: ITask): boolean {
  const createdDate = new Date(task.createdAt);
  const startDate = new Date(task.startAt);
  return isToday(createdDate) || isToday(startDate);
}

export default taskStore;
