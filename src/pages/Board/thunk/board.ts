import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createTask,
  getAllStatuses,
  getAllTasks,
  getAllUsers,
} from "../../../api/tasks";
import { modalOpenToggleAction } from "../../../store/modal/reducer/modal";
import { CreateThunkType, Params, Task } from "../../../types";
import {
  boardStatusFetchErrorAction,
  boardTaskCreateErrorAction,
  boardTaskCreateInProgressAction,
  boardTaskCreateSuccessAction,
} from "../reducer/board";

const BOARD_FETCH_THUNK_TYPE = "BOARD_FETCH_THUNK_TYPE";

export const boardListFetch = createAsyncThunk(
  BOARD_FETCH_THUNK_TYPE,
  async (params: Partial<Params>, { rejectWithValue }) => {
    try {
      return await getAllTasks(params);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const STATUS_LIST_FETCH_THUNK_TYPE = "STATUS_LIST_FETCH_THUNK_TYPE";

export const boardStatusListFetch = createAsyncThunk(
  STATUS_LIST_FETCH_THUNK_TYPE,
  async (_, { rejectWithValue }) => {
    try {
      return await getAllStatuses();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const BOARD_USER_FETCH_THUNK_TYPE = "BOARD_USER_FETCH_THUNK_TYPE";

export const boardUserListFetch = createAsyncThunk(
  BOARD_USER_FETCH_THUNK_TYPE,
  async (_, { rejectWithValue }) => {
    try {
      return await getAllUsers();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const BOARD_CREATE_TASK_FETCH_THUNK_TYPE = "BOARD_CREATE_TASK_FETCH_THUNK_TYPE";

export const boardCreateTaskFetch = createAsyncThunk(
  BOARD_CREATE_TASK_FETCH_THUNK_TYPE,
  async (data: CreateThunkType, { dispatch }) => {
    try {
      const { values, params } = data;
      dispatch(boardTaskCreateInProgressAction());
      await createTask(values);
      dispatch(boardTaskCreateSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Task was created");
      await dispatch(boardListFetch(params));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      dispatch(boardTaskCreateErrorAction());
    }
  }
);
