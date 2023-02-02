import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { getUser, login } from "../../../api/auth";
import { User } from "../../../types";

const AUTH_LOGIN_THUNK_TYPE = "AUTH_LOGIN_THUNK_TYPE";

export const authLoginFetch = createAsyncThunk(
  AUTH_LOGIN_THUNK_TYPE,
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const user = await login(data);
      localStorage.setItem("token", user.token!);
      return user;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          toast.error(error.response?.data.data);
          return rejectWithValue(error);
        }
        toast.error(error.message);
        return rejectWithValue(error);
      }
    }
  }
);

const AUTH_USER_DATA_FETCH_THUNK_TYPE = "AUTH_USER_DATA_FETCH_THUNK_TYPE";

export const authUserDataFetch = createAsyncThunk(
  AUTH_USER_DATA_FETCH_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      const user = await getUser(id);
      return { ...user, password: "" };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          toast.error(error.response?.data.data);
          return rejectWithValue(error);
        }
        toast.error(error.message);
        return rejectWithValue(error);
      }
    }
  }
);
