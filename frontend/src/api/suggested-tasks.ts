import { api } from "./client";
import type { Tag } from "./tags";
import type { TaskStatus } from "./tasks";

export type SuggestedTask = {
  id: string;
  description?: string;
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

export const createSuggestedTask = async (
  createSuggestedTaskBody: CreateSuggestedTaskBody
) => {
  const response = await api.post(BASE_URL, createSuggestedTaskBody);
  return response.data;
};

export const updateSuggestedTask = async (id: string, status: TaskStatus) => {
  const response = await api.put(`${BASE_URL}/${id}`, { status });
  return response.data;
};

export const SuggestedTasksApi = {
  createSuggestedTask,
  updateSuggestedTask,
};
