// Task types
export type Attribute = "plan" | "next" | "inbox";

export enum Priority {
  LOWEST = 1,
  LOW,
  MEDIUM,
  HIGH,
  HIGHEST
}

export enum RequestType {
  USER = "USER",
  TASK = "TASK",
  PROJECT = "PROJECT",
  REFERENCE = "REFERENCE"
}

export enum MessageType {
  NETWORK = "@error/NETWORK"
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
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
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
  endAt: number;
  estimatedTime: number;
  context?: string;
  spentTime?: number;
  allDay: boolean;
  deleted: number;
  completed: number;
  archived: number;
  tags: string[];
  note?: INote;
  project?: string;
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
  allDay?: boolean;
  deleted?: number;
  completed?: number;
  archived?: number;
  tags?: string[];
  note?: INote;
  project?: string;
}

export interface INote {
  content: string;
}
