import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStatuses, getAllTasks } from "../../../api/tasks";
import { Params } from "../../../types";
import { boardStatusFetchErrorAction } from "../reducer/board";

const BOARD_FETCH_THUNK_TYPE = "BOARD_FETCH_THUNK_TYPE";

export const boardListFetch = createAsyncThunk(
  BOARD_FETCH_THUNK_TYPE,
  async (params: Params | undefined, { rejectWithValue }) => {
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
