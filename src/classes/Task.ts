import { Attribute, Priority, INewTask, INote } from "../types/index";

class Task {
  private title: string;
  private attribute: Attribute;
  private userId: string;
  private priority: Priority;
  private createdAt: number;
  private startAt: number;
  private endAt: number;
  private estimatedTime: number;
  private context: string;
  private spentTime: number;
  private allDay: boolean;
  private deleted: number;
  private completed: number;
  private archived: number;
  private tags: string[];
  private note: INote | undefined;
  private project: string | undefined;
  private pos: string | undefined;

  constructor({
    title,
    attribute = "inbox",
    userId,
    priority = Priority.MEDIUM,
    startAt = 0,
    endAt = 0,
    estimatedTime = 0,
    context = "",
    spentTime = 0,
    allDay = true,
    deleted = 0,
    completed = 0,
    archived = 0,
    tags = [],
    note,
    project
  }: INewTask) {
    this.title = title;
    this.attribute = attribute;
    this.userId = userId;
    this.priority = priority;
    this.createdAt = Date.now();
    this.startAt = startAt;
    this.endAt = endAt;
    this.estimatedTime = estimatedTime;
    this.context = context;
    this.spentTime = spentTime;
    (this.allDay = allDay), (this.deleted = deleted);
    this.completed = completed;
    this.archived = archived;
    this.tags = tags;
    this.note = note;
    this.project = project;
  }

  public toJson() {
    return {
      title: this.title,
      attribute: this.attribute,
      createdAt: this.createdAt,
      priority: this.priority,
      startAt: this.startAt,
      endAt: this.endAt,
      estimatedTime: this.estimatedTime,
      context: this.context,
      spentTime: this.spentTime,
      allDay: this.allDay,
      deleted: this.deleted,
      completed: this.completed,
      archived: this.archived,
      tags: this.tags,
      note: this.note,
      project: this.project
    };
  }
}

export default Task;
