import { api } from "./client";

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

export interface CreateTaskBody {
  callId: string;
  description: string;
}

const BASE_URL = "/api/tasks";

export const createTask = async (createTagBody: CreateTaskBody) => {
  const response = await api.post(BASE_URL, createTagBody);
  return response.data;
};

export const updateTask = async (id: string, status: TaskStatus) => {
  const response = await api.put(`${BASE_URL}/${id}`, { status });
  return response.data;
};

export const TasksApi = {
  createTask,
  updateTask,
};
