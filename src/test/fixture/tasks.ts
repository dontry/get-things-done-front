import { Priority } from "../../types";

export const mockData: any = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Take out the garbage",
      attribute: "inbox",
      priority: Priority.HIGH,
      createdAt: 1548556670927,
      startAt: 0,
      endAt: 0,
      estimatedTime: 0,
      context: "home",
      spentTime: 0,
      allDay: false,
      deleted: false,
      tags: [],
      note: {
        content: "hahah"
      }
    },
    "task-2": {
      id: "task-2",
      title: "Watch my favorite show",
      attribute: "inbox",
      priority: Priority.LOW,
      createdAt: 1548556671000,
      startAt: 0,
      endAt: 0,
      estimatedTime: 0,
      context: "home",
      spentTime: 0,
      allDay: false,
      deleted: false,
      tags: [],
      note: {
        content: "Jimmy Kimmel is awesome"
      }
    },
    "task-3": {
      id: "task-3",
      title: "Charge my phone",
      attribute: "plan",
      priority: Priority.LOW,
      createdAt: 1548556671000,
      startAt: 0,
      endAt: 0,
      estimatedTime: 0,
      context: "home",
      spentTime: 0,
      allDay: false,
      deleted: false,
      tags: [],
      note: {
        content: "Jimmy Kimmel is awesome"
      }
    },
    "task-4": {
      id: "task-4",
      title: "Cook dinner",
      attribute: "next",
      priority: Priority.LOW,
      createdAt: 1548556671000,
      startAt: 0,
      endAt: 0,
      estimatedTime: 0,
      context: "home",
      spentTime: 0,
      allDay: false,
      deleted: false,
      tags: [],
      note: {
        content: "Jimmy Kimmel is awesome"
      }
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2"]
};
