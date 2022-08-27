import { Params, Status } from "../types";
import { client } from "./client";

export const getAllStatuses = async (params: Params = {}) => {
  try {
    return await client.get<never, Status[]>("/statuses", { params });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createStatus = async (data: Partial<Status>) => {
  try {
    return await client.post<never, Status>("/statuses", { ...data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteStatus = async (id: string) => {
  try {
    return await client.delete<never, Status>(`/statuses/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};
