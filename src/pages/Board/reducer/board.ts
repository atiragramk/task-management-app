import { createSlice } from "@reduxjs/toolkit";
import { Params, SortedTask, Status, User, Task } from "../../../types";
import {
  boardListFetch,
  boardStatusListFetch,
  boardUserListFetch,
} from "../thunk/board";
import {
  boardFetchInProgress,
  boardFetchSuccess,
  boardFetchError,
  boardStatusFetchError,
  boardStatusFetchInProgress,
  boardStatusFetchSuccess,
  boardFilterParams,
  boardTaskCreateInProgress,
  boardTaskCreateSuccess,
  boardTaskCreateError,
  boardUpdateItemIdSet,
} from "../actions/board";

export type BoardState = {
  loading: boolean;
  error: boolean | null;
  data: SortedTask[] | [];
  status: {
    loading: boolean;
    error: boolean | null;
    data: Status[] | [];
  };
  params: Params;
  users: {
    loading: boolean;
    error: boolean | null;
    userList: User[] | [];
  };
  createState: {
    loading: boolean;
    error: boolean | null;
    data: Task | {};
  };
  updateState: {
    loading: boolean;
    error: boolean | null;
    fetchData: { id: string };
    taskData: Task | {};
  };
};

const initialState: BoardState = {
  loading: true,
  error: null,
  data: [],
  status: {
    loading: true,
    error: null,
    data: [],
  },
  params: {},
  users: {
    loading: true,
    error: null,
    userList: [],
  },
  createState: {
    loading: false,
    error: null,
    data: {},
  },
  updateState: {
    loading: false,
    error: null,
    taskData: {},
    fetchData: { id: "" },
  },
};
const name = "BOARD";

const boardSlice = createSlice({
  name,
  initialState,
  reducers: {
    boardFetchInProgress,
    boardFetchSuccess,
    boardFetchError,
    boardStatusFetchError,
    boardStatusFetchInProgress,
    boardStatusFetchSuccess,
    boardFilterParams,
    boardTaskCreateInProgress,
    boardTaskCreateSuccess,
    boardTaskCreateError,
    boardUpdateItemIdSet,
  },
  extraReducers(builder) {
    builder
      .addCase(boardListFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(boardListFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(boardListFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(boardStatusListFetch.pending, (state) => {
        state.status.loading = true;
        state.status.error = false;
      })
      .addCase(boardStatusListFetch.fulfilled, (state, action) => {
        state.status.loading = false;
        state.status.data = action.payload;
      })
      .addCase(boardStatusListFetch.rejected, (state) => {
        state.status.loading = false;
        state.status.error = true;
      })
      .addCase(boardUserListFetch.pending, (state) => {
        state.users.loading = true;
        state.users.error = false;
      })
      .addCase(boardUserListFetch.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.userList = action.payload;
      })
      .addCase(boardUserListFetch.rejected, (state) => {
        state.users.loading = false;
        state.users.error = true;
      });
  },
});

export const {
  boardFetchInProgress: boardFetchInProgressAction,
  boardFetchSuccess: boardFetchSuccessAction,
  boardFetchError: boardFetchErrorAction,
  boardStatusFetchError: boardStatusFetchErrorAction,
  boardStatusFetchInProgress: boardStatusFetchInProgressAction,
  boardStatusFetchSuccess: boardStatusFetchSuccessAction,
  boardFilterParams: boardFilterParamsAction,
  boardTaskCreateInProgress: boardTaskCreateInProgressAction,
  boardTaskCreateSuccess: boardTaskCreateSuccessAction,
  boardTaskCreateError: boardTaskCreateErrorAction,
  boardUpdateItemIdSet: boardUpdateItemIdSetAction,
} = boardSlice.actions;

export default boardSlice.reducer;
