//Task types
export type Attribute = "plan" | "next" | "inbox";

export enum Priority {
  LOWEST = 1,
  LOW,
  MEDIUM,
  HIGH,
  HIGHEST
}

export interface Task {
  title: string;
  attribute: Attribute;
  priority: Priority;
  now: number;
  startAt: number;
  endAt: number;
  estimatedTime: number;
  context: string | null;
  spentTime: number;
  allDay: boolean;
  deleted: boolean;
  archived: boolean;
  tags: string[];
  note: Note;
}

export interface Note {
  content: string;
}
