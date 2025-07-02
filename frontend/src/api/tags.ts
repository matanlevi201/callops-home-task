import { api } from "./client";

export type Tag = {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt: Date;
};

export interface CreateTagBody {
  name: string;
}

const BASE_URL = "/api/tags";

export const getTags = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

export const createTag = async (createTagBody: CreateTagBody) => {
  const response = await api.post(BASE_URL, createTagBody);
  return response.data;
};

export const updateTag = async (
  id: string,
  updateTagBody: Partial<CreateTagBody>
) => {
  const response = await api.put(`${BASE_URL}/${id}`, updateTagBody);
  return response.data;
};

export const deleteTag = async (id: string) => {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const TagsApi = {
  getTags,
  createTag,
  updateTag,
  deleteTag,
};
