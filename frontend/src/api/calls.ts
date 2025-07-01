import { api } from "./client";

export type Call = {
  id: string;
  title: string;
  description?: string;
  createdAt?: Date;
  updatedAt: Date;
  tagIds?: string[];
};

export interface CreateCallBody {
  title: string;
  description?: string;
  tagIds?: string[];
}

const BASE_URL = "/api/calls";

export const getCalls = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

export const createCall = async (createCallBody: CreateCallBody) => {
  const response = await api.post(BASE_URL, createCallBody);
  return response.data;
};

export const updateCall = async (
  id: string,
  updateCallBody: Partial<CreateCallBody>
) => {
  const response = await api.put(`${BASE_URL}/${id}`, updateCallBody);
  return response.data;
};

export const deleteCall = async (id: string) => {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const CallsApi = {
  getCalls,
  createCall,
  updateCall,
  deleteCall,
};
