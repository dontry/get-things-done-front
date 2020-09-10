import { INote, IProject } from '../types/index';

export class Project {
  private title: string;
  private createdAt: number;
  private allDay: number;
  private deletedAt: number;
  private completedAt: number;
  private archived: number;
  private source: string;
  private note: INote;
  private active: number;
  private pos: number | undefined;
  private hidden: number;
  private tags: string[];

  constructor({
    title,
    completedAt = 0,
    allDay = 1,
    deletedAt = 0,
    archived = 0,
    source = '',
    note,
    active = 1,
    hidden = 0,
    tags = [],
    pos
  }: IProject) {
    this.title = title;
    this.createdAt = Date.now();
    this.allDay = allDay;
    this.deletedAt = deletedAt;
    this.completedAt = completedAt;
    this.archived = archived;
    this.note = note || { content: '' };
    this.source = source;
    this.active = active;
    this.pos = pos;
    this.hidden = hidden;
    this.tags = tags;
  }

  public toJson(): IProject {
    return {
      title: this.title,
      createdAt: this.createdAt,
      allDay: this.allDay,
      deletedAt: this.deletedAt,
      completedAt: this.completedAt,
      archived: this.archived,
      note: this.note,
      source: this.source,
      active: this.active,
      hidden: this.hidden,
      tags: this.tags,
      pos: this.pos
    };
  }
}
