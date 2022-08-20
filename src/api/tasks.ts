import { Params, SortedTask, Status, Task, User } from "../types";
import { client } from "./client";

export const getAllTasks = async (params: Params = {}) => {
  try {
    return await client.get<never, SortedTask[]>("/tasks", { params });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTask = async (id: string) => {
  try {
    return await client.get<never, Task>(`tasks/${id}`);
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

export const createTask = async (data: Partial<Task>) => {
  try {
    return await client.post<never, Task>("/tasks", { ...data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTask = async (data: Partial<Task>, id: string) => {
  try {
    return await client.patch<never, Task>(`/tasks/${id}`, { ...data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTask = async (id: string) => {
  try {
    return await client.delete<never, Task>(`/tasks/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUsers = async () => {
  try {
    return await client.get<never, User[]>("/users");
  } catch (error) {
    return Promise.reject(error);
  }
};
