import { Attribute, Priority, INewTask, INote } from "../types/index";

class Task {
  private title: string;
  private attribute: Attribute;
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
  private note: INote;
  private project: string | undefined;

  constructor({
    title,
    attribute,
    priority,
    startAt,
    endAt,
    estimatedTime,
    context,
    spentTime,
    allDay,
    deleted,
    completed,
    archived,
    tags,
    note,
    project
  }: INewTask) {
    this.title = title;
    this.attribute = attribute || "inbox";
    this.priority = priority || Priority.MEDIUM;
    this.createdAt = Date.now();
    this.startAt = startAt || 0;
    this.endAt = endAt || 0;
    this.estimatedTime = estimatedTime || 0;
    this.context = context || "";
    this.spentTime = spentTime || 0;
    this.allDay = allDay === undefined ? true : allDay;
    this.deleted = deleted || 0;
    this.completed = completed || 0;
    this.archived = archived || 0;
    this.tags = tags || [];
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
