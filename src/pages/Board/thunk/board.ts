import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  createStatus,
  createTask,
  deleteStatus,
  deleteTask,
  getAllStatuses,
  getAllTasks,
  getAllUsers,
  getTask,
  updateTask,
} from "../../../api/tasks";
import { modalOpenToggleAction } from "../../../store/modal/reducer/modal";
import {
  CreateThunkType,
  Params,
  Response,
  Status,
  Task,
} from "../../../types";
import {
  boardFilterParamsResetAction,
  boardStatusCreateErrorAction,
  boardStatusCreateInProgressAction,
  boardStatusCreateSuccessAction,
  boardTaskCreateErrorAction,
  boardTaskCreateInProgressAction,
  boardTaskCreateSuccessAction,
  boardTaskDeleteErrorAction,
  boardTaskDeleteInProgressAction,
  boardTaskDeleteSuccessAction,
  boardTaskUpdateErrorAction,
  boardTaskUpdateInProgressAction,
  boardTaskUpdateSuccessAction,
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
      dispatch(boardFilterParamsResetAction());
      await dispatch(boardListFetch(params));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      dispatch(boardTaskCreateErrorAction());
    }
  }
);

const BOARD_UPDATE_FETCH_DATA_THUNK_TYPE = "BOARD_UPDATE_FETCH_DATA_THUNK_TYPE";
export const bookItemUpdateDataFetch = createAsyncThunk(
  BOARD_UPDATE_FETCH_DATA_THUNK_TYPE,
  async (data: { id: string }, { dispatch }) => {
    try {
      return await getTask(data.id);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
);

const BOARD_UPDATE_TASK_FETCH_THUNK_TYPE = "BOARD_UPDATE_TASK_FETCH_THUNK_TYPE";

export const boardUpdateTaskFetch = createAsyncThunk(
  BOARD_UPDATE_TASK_FETCH_THUNK_TYPE,
  async (data: CreateThunkType, { dispatch }) => {
    try {
      const { values, params } = data;
      dispatch(boardTaskUpdateInProgressAction());
      await updateTask(values, values._id!);
      dispatch(boardTaskUpdateSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Task was updated");
      dispatch(boardFilterParamsResetAction());
      await dispatch(boardListFetch(params));
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(boardTaskUpdateErrorAction());
    }
  }
);

const BOARD_DELETE_TASK_FETCH_THUNK_TYPE = "BOARD_DELETE_TASK_FETCH_THUNK_TYPE";

export const boardDeleteTaskFetch = createAsyncThunk(
  BOARD_DELETE_TASK_FETCH_THUNK_TYPE,
  async (data: CreateThunkType, { dispatch }) => {
    try {
      const { values, params } = data;
      dispatch(boardTaskDeleteInProgressAction());
      await deleteTask(values._id!);
      dispatch(boardTaskDeleteSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Task was deleted");
      dispatch(boardFilterParamsResetAction());
      await dispatch(boardListFetch(params));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return toast.error(error.response?.data.data);
        }
        toast.error(error.message);
      }
      dispatch(boardTaskDeleteErrorAction());
    }
  }
);

const BOARD_DELETE_STATUS_FETCH_THUNK_TYPE =
  "BOARD_DELETE_TASK_FETCH_THUNK_TYPE";

export const boardDeleteStatusFetch = createAsyncThunk(
  BOARD_DELETE_STATUS_FETCH_THUNK_TYPE,
  async (data: Status, { dispatch }) => {
    try {
      dispatch(boardTaskDeleteInProgressAction());
      await deleteStatus(data._id!);
      dispatch(boardTaskDeleteSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Column was deleted");
      dispatch(boardFilterParamsResetAction());
      await dispatch(boardStatusListFetch());
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return toast.error(error.response?.data.data);
        }
        toast.error(error.message);
      }
      dispatch(boardTaskDeleteErrorAction());
    }
  }
);

const BOARD_CREATE_STATUS_FETCH_THUNK_TYPE =
  "BOARD_CREATE_STATUS_FETCH_THUNK_TYPE";

export const boardCreateStatusFetch = createAsyncThunk(
  BOARD_CREATE_STATUS_FETCH_THUNK_TYPE,
  async (data: Partial<Status>, { dispatch }) => {
    try {
      dispatch(boardStatusCreateInProgressAction());
      await createStatus(data);
      dispatch(boardStatusCreateSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Column was created");
      dispatch(boardFilterParamsResetAction());
      await dispatch(boardStatusListFetch());
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return toast.error(error.response?.data.data);
        }
        toast.error(error.message);
      }
      dispatch(boardStatusCreateErrorAction());
      await dispatch(boardStatusListFetch());
    }
  }
);
