import { api } from "./client";
import type { SuggestedTask } from "./suggested-tasks";
import type { Tag } from "./tags";
import type { Task } from "./tasks";

export type Call = {
  id: string;
  title: string;
  description?: string;
  createdAt?: Date;
  updatedAt: Date;
  callTags: Tag[];
  tasks: Task[];
  suggestedTasks: SuggestedTask[];
};

export interface CreateCallBody {
  title: string;
  description?: string;
  tagIds?: string[];
}

// Type guard to check if task is a SuggestedTask
export const isSuggestedTask = (
  task: Task | SuggestedTask
): task is SuggestedTask => {
  return "tags" in task;
};

const BASE_URL = "/api/calls";

export const getCalls = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

export const createCall = async (createCallBody: CreateCallBody) => {
  const response = await api.post(BASE_URL, createCallBody);
  return response.data;
};

export const addTagCall = async (id: string, tagId: string) => {
  const response = await api.put(`${BASE_URL}/tags/${id}`, { tagId });
  return response.data;
};

export const removeCallTag = async (id: string, tagId: string) => {
  const response = await api.delete(`${BASE_URL}/tags/${id}`, {
    data: { tagId },
  });
  return response.data;
};

export const deleteCall = async (id: string) => {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const addCallSuggestedTask = async (
  id: string,
  suggestedTaskId: string
) => {
  const response = await api.put(`${BASE_URL}/suggested-tasks/${id}`, {
    suggestedTaskId,
  });
  return response.data;
};

export const CallsApi = {
  getCalls,
  createCall,
  addTagCall,
  removeCallTag,
  deleteCall,
  addCallSuggestedTask,
};
