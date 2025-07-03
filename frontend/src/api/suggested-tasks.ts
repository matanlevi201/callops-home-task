import { api } from "./client";
import type { Tag } from "./tags";
import type { TaskStatus } from "./tasks";

export type SuggestedTask = {
  id: string;
  description: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt: Date;
  tags: Tag[];
};

export interface CreateSuggestedTaskBody {
  description: string;
  tagIds: string[];
}

const BASE_URL = "/api/suggested-tasks";

export const getSuggestedTasks = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

export const createSuggestedTask = async (
  createSuggestedTaskBody: CreateSuggestedTaskBody
) => {
  const response = await api.post(BASE_URL, createSuggestedTaskBody);
  return response.data;
};

// by Admin
export const updateSuggestedTask = async (
  id: string,
  updateSuggestedTaskBody: Partial<CreateSuggestedTaskBody>
) => {
  const response = await api.put(`${BASE_URL}/${id}`, updateSuggestedTaskBody);
  return response.data;
};

// by User
export const updateSuggestedTaskStatus = async (
  id: string,
  status: TaskStatus
) => {
  const response = await api.put(`${BASE_URL}/${id}`, { status });
  return response.data;
};

export const SuggestedTasksApi = {
  getSuggestedTasks,
  createSuggestedTask,
  updateSuggestedTask,
  updateSuggestedTaskStatus,
};
