export const TaskStatus = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export type Task = {
  id: string;
  description?: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt: Date;
};

// const BASE_URL = "/api/tasks";
