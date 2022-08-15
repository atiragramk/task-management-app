import { Params, SortedTask, Status, Task } from "../types";
import { client } from "./client";

export const getAllTasks = async (params: Params = {}) => {
  try {
    return await client.get<never, SortedTask[]>("/tasks", { params });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllStatuses = async () => {
  try {
    return await client.get<never, Status[]>("/statuses");
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createStatus = async () => {
  try {
    return await client.post<never, Status>("/statuses");
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createTask = async () => {
  try {
    return await client.post<never, Task>("/tasks");
  } catch (error) {
    return Promise.reject(error);
  }
};
