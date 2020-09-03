// Task types
export type Attribute = 'inbox' | 'next' | 'plan' | 'noplan' | 'note';
export type Category =
  | 'inbox'
  | 'next'
  | 'today'
  | 'tomorrow'
  | 'scheduled'
  | 'someday'
  | 'note'
  | 'deleted'
  | 'completed';

export enum Priority {
  LOWEST = 1,
  LOW,
  MEDIUM,
  HIGH,
  HIGHEST
}

export enum RequestType {
  USER = 'USER',
  TASK = 'TASK',
  PROJECT = 'PROJECT',
  REFERENCE = 'REFERENCE'
}

export enum MessageType {
  NETWORK = '@error/NETWORK'
}

export interface ILoginCredential {
  username: string;
  password: string;
}

export interface IRegisterProfile {
  username: string;
  email: string;
  password: string;
  fullName: IFullName;
  sex: Sex;
  age: number;
}

interface IFullName {
  firstName: string;
  lastName: string;
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface IUser {
  id?: string;
  password?: string;
  username: string;
  email: string;
  fullName: IFullName;
  age?: number;
  sex?: Sex;
}

export interface ITask {
  id?: string;
  title: string;
  attribute: Attribute;
  userId: string;
  priority: Priority;
  createdAt: number;
  startAt: number;
  completedAt: number;
  endAt: number;
  estimatedTime: number;
  context?: string;
  spentTime?: number;
  allDay: number;
  deleted: number;
  archived: number;
  tags: string[];
  note: INote;
  projectId?: string;
  pos: number;
}

export interface INewTask {
  title: string;
  attribute: Attribute;
  userId: string;
  priority?: Priority;
  createdAt?: number;
  startAt?: number;
  endAt?: number;
  estimatedTime?: number;
  context?: string;
  spentTime?: number;
  allDay?: number;
  hidden?: number;
  deleted?: number;
  completedAt?: number;
  archived?: number;
  source?: string;
  tags?: string[];
  note?: INote;
  reminders?: IReminder[];
  repeaters?: IRepeater[];
  projectId?: string;
}
export interface IProject {
  id?: string;
  title: string;
  userId: string;
  createdAt: number;
  completedAt?: number;
  allDay: number;
  deleted: number;
  archived: number;
  hidden?: string;
  note: INote;
  source?: string;
  status: number;
  pos: number;
}

export interface INote {
  content: any;
}

export enum Frequency {
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY'
}

export interface IRepeater {
  frequency: Frequency;
  ends_on: number;
}

export interface IReminder {
  frequency: number;
  count: number;
}
