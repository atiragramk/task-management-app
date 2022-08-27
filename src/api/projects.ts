import { Project } from "../types";
import { client } from "./client";

export const getProject = async (id: string) => {
  try {
    return await client.get<never, Project>(`/projects/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllProjects = async () => {
  try {
    return await client.get<never, Project[]>("/projects");
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createProject = async (data: Partial<Project>) => {
  try {
    return await client.post<never, Project>("/projects", { ...data });
  } catch (error) {
    return Promise.reject(error);
  }
};
