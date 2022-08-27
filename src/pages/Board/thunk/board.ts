import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { AxiosError } from "axios";
import { modalOpenToggleAction } from "../../../store/modal/reducer/modal";
import { CreateThunkType, Params } from "../../../types";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../../../api/tasks";
import { getAllUsers } from "../../../api/auth";
import { getProject } from "../../../api/projects";

import {
  createStatus,
  deleteStatus,
  getAllStatuses,
} from "../../../api/statuses";

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
      toast.error("Something went wrong");
      return rejectWithValue(error);
    }
  }
);
const STATUS_LIST_FETCH_THUNK_TYPE = "STATUS_LIST_FETCH_THUNK_TYPE";

export const boardStatusListFetch = createAsyncThunk(
  STATUS_LIST_FETCH_THUNK_TYPE,
  async (params: Partial<Params>, { rejectWithValue }) => {
    try {
      return await getAllStatuses(params);
    } catch (error) {
      toast.error("Something went wrong");
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
      toast.error("Something went wrong");
      return rejectWithValue(error);
    }
  }
);

const BOARD_CREATE_TASK_FETCH_THUNK_TYPE = "BOARD_CREATE_TASK_FETCH_THUNK_TYPE";

export const boardCreateTaskFetch = createAsyncThunk(
  BOARD_CREATE_TASK_FETCH_THUNK_TYPE,
  async (values: CreateThunkType, { dispatch }) => {
    try {
      const { data, params } = values;
      dispatch(boardTaskCreateInProgressAction());
      await createTask(data);
      dispatch(boardTaskCreateSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Task was created");
      await dispatch(boardListFetch(params));
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(boardTaskCreateErrorAction());
    }
  }
);

const BOARD_UPDATE_FETCH_DATA_THUNK_TYPE = "BOARD_UPDATE_FETCH_DATA_THUNK_TYPE";
export const boardItemUpdateDataFetch = createAsyncThunk(
  BOARD_UPDATE_FETCH_DATA_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      return await getTask(id);
    } catch (error) {
      toast.error("Something went wrong");
      return rejectWithValue(error);
    }
  }
);

const BOARD_OPEN_FETCH_DATA_THUNK_TYPE = "BOARD_OPEN_FETCH_DATA_THUNK_TYPE";
export const boardItemOpenDataFetch = createAsyncThunk(
  BOARD_OPEN_FETCH_DATA_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      return await getTask(id);
    } catch (error) {
      toast.error("Something went wrong");
      return rejectWithValue(error);
    }
  }
);

const BOARD_UPDATE_TASK_FETCH_THUNK_TYPE = "BOARD_UPDATE_TASK_FETCH_THUNK_TYPE";

export const boardUpdateTaskFetch = createAsyncThunk(
  BOARD_UPDATE_TASK_FETCH_THUNK_TYPE,
  async (values: CreateThunkType, { dispatch }) => {
    try {
      const { data, params } = values;
      dispatch(boardTaskUpdateInProgressAction());
      await updateTask(data, data._id!);
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
  async (values: CreateThunkType, { dispatch }) => {
    try {
      const { data, params } = values;
      dispatch(boardTaskDeleteInProgressAction());
      await deleteTask(data._id!);
      dispatch(boardTaskDeleteSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Task was deleted");
      dispatch(boardFilterParamsResetAction());
      await dispatch(boardListFetch(params));
    } catch (error) {
      dispatch(boardTaskDeleteErrorAction());
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return toast.error(error.response?.data.data);
        }
        toast.error(error.message);
      }
    }
  }
);

const BOARD_DELETE_STATUS_FETCH_THUNK_TYPE =
  "BOARD_DELETE_TASK_FETCH_THUNK_TYPE";

export const boardDeleteStatusFetch = createAsyncThunk(
  BOARD_DELETE_STATUS_FETCH_THUNK_TYPE,
  async (values: CreateThunkType, { dispatch }) => {
    try {
      const { data, params } = values;

      dispatch(boardTaskDeleteInProgressAction());
      await deleteStatus(data._id!);
      dispatch(boardTaskDeleteSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Column was deleted");
      dispatch(boardFilterParamsResetAction());
      await dispatch(boardStatusListFetch(params));
    } catch (error) {
      dispatch(boardTaskDeleteErrorAction());
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return toast.error(error.response?.data.data);
        }
        toast.error(error.message);
      }
    }
  }
);

const BOARD_CREATE_STATUS_FETCH_THUNK_TYPE =
  "BOARD_CREATE_STATUS_FETCH_THUNK_TYPE";

export const boardCreateStatusFetch = createAsyncThunk(
  BOARD_CREATE_STATUS_FETCH_THUNK_TYPE,
  async (values: CreateThunkType, { dispatch }) => {
    try {
      const { data, params } = values;

      dispatch(boardStatusCreateInProgressAction());
      await createStatus(data);
      dispatch(boardStatusCreateSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Column was created");
      dispatch(boardFilterParamsResetAction());
      await dispatch(boardStatusListFetch(params));
    } catch (error) {
      const { params } = values;
      dispatch(boardStatusCreateErrorAction());
      await dispatch(boardStatusListFetch(params));
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return toast.error(error.response?.data.data);
        }
        toast.error(error.message);
      }
    }
  }
);

const BOARD_PROJECT_FETCH_DATA_THUNK_TYPE =
  "BOARD_PROJECT_FETCH_DATA_THUNK_TYPE";
export const boardProjectDataFetch = createAsyncThunk(
  BOARD_PROJECT_FETCH_DATA_THUNK_TYPE,
  async (data: { id: string }, { dispatch }) => {
    try {
      return await getProject(data.id);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
);

const BOARD_UPDATE_TASK_DRAG_THUNK_TYPE = "BOARD_UPDATE_TASK_DRAG_THUNK_TYPE";

export const boardUpdateTaskDrag = createAsyncThunk(
  BOARD_UPDATE_TASK_DRAG_THUNK_TYPE,
  async (values: CreateThunkType, { dispatch }) => {
    try {
      const { data, params } = values;
      dispatch(boardTaskUpdateInProgressAction());
      await updateTask(data, data._id!);
      dispatch(boardTaskUpdateSuccessAction());
      toast.success("Task was updated");
      await dispatch(boardListFetch(params));
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(boardTaskUpdateErrorAction());
    }
  }
);
