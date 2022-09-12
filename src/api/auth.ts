import { User } from "../types";
import { client } from "./client";

export const getAllUsers = async () => {
  try {
    return await client.get<never, User[]>("/auth");
  } catch (error) {
    return Promise.reject(error);
  }
};

export const register = async (data: Partial<User>) => {
  try {
    return await client.post<never, Partial<User>>("/auth/register", { ...data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login = async (data: Partial<User>) => {
  try {
    return await client.post<never, Partial<User>>("/auth/login", { ...data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = async (email: string) => {
  try {
    return await client.post<never, string>("/auth/logout", { email });
  } catch (error) {
    return Promise.reject(error);
  }
};
