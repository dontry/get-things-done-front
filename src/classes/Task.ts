import { Attribute, Priority, INewTask, INote, IRepeater, IReminder, ITask } from "../types/index";

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
  private allDay: number;
  private deleted: number;
  private completedAt: number;
  private archived: number;
  private hidden: number;
  private tags: string[];
  private source: string;
  private note: INote | undefined;
  private project: string | undefined;
  private repeaters: IRepeater[];
  private reminders: IReminder[];
  private pos: string | undefined;

  constructor({
    title,
    attribute = "inbox",
    userId,
    priority = Priority.MEDIUM,
    startAt = 0,
    endAt = 0,
    completedAt = 0,
    estimatedTime = 0,
    context = "",
    spentTime = 0,
    allDay = 1,
    hidden = 0,
    deleted = 0,
    archived = 0,
    tags = [],
    repeaters = [],
    reminders = [],
    source = "",
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
    this.completedAt = completedAt;
    this.archived = archived;
    this.tags = tags;
    this.note = note;
    this.project = project;
    this.repeaters = repeaters;
    this.reminders = reminders;
    this.source = source;
    this.hidden = hidden;
  }

  public toJson(): INewTask {
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
      completedAt: this.completedAt,
      archived: this.archived,
      tags: this.tags,
      note: this.note,
      project: this.project,
      userId: this.userId,
      hidden: this.hidden,
      source: this.source,
      reminders: this.reminders,
      repeaters: this.repeaters
    };
  }
}

export default Task;
