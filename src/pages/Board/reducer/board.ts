import { createSlice } from "@reduxjs/toolkit";
import { Params, SortedTask, Status, User, Task } from "../../../types";
import {
  boardListFetch,
  boardStatusListFetch,
  boardUserListFetch,
  bookItemUpdateDataFetch,
} from "../thunk/board";
import {
  boardFetchInProgress,
  boardFetchSuccess,
  boardFetchError,
  boardStatusCreateError,
  boardStatusCreateInProgress,
  boardStatusCreateSuccess,
  boardFilterParamsSet,
  boardFilterParamsReset,
  boardTaskCreateInProgress,
  boardTaskCreateSuccess,
  boardTaskCreateError,
  boardUpdateItemIdSet,
  boardTaskUpdateInProgress,
  boardTaskUpdateSuccess,
  boardTaskUpdateError,
  boardDeleteItemDataSet,
  boardDeleteStatusDataSet,
  boardTaskDeleteInProgress,
  boardTaskDeleteSuccess,
  boardTaskDeleteError,
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
  deleteState: {
    loading: boolean;
    error: boolean | null;
    taskData: Task | null;
    statusData: Status | null;
  };
};

export const initialState: BoardState = {
  loading: true,
  error: null,
  data: [],
  status: {
    loading: true,
    error: null,
    data: [],
  },
  params: {
    search: "",
    priority: "",
    status: "",
    assignee: [],
    userData: [],
  },
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
  deleteState: {
    loading: false,
    error: null,
    taskData: null,
    statusData: null,
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
    boardStatusCreateError,
    boardStatusCreateInProgress,
    boardStatusCreateSuccess,
    boardFilterParamsSet,
    boardFilterParamsReset,
    boardTaskCreateInProgress,
    boardTaskCreateSuccess,
    boardTaskCreateError,
    boardUpdateItemIdSet,
    boardTaskUpdateInProgress,
    boardTaskUpdateSuccess,
    boardTaskUpdateError,
    boardDeleteItemDataSet,
    boardTaskDeleteInProgress,
    boardTaskDeleteSuccess,
    boardTaskDeleteError,
    boardDeleteStatusDataSet,
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
      })
      .addCase(bookItemUpdateDataFetch.pending, (state) => {
        state.updateState.loading = true;
        state.updateState.error = false;
      })
      .addCase(bookItemUpdateDataFetch.fulfilled, (state, action) => {
        state.updateState.loading = false;
        state.updateState.taskData = action.payload!;
      })
      .addCase(bookItemUpdateDataFetch.rejected, (state) => {
        state.updateState.loading = false;
        state.updateState.error = true;
      });
  },
});

export const {
  boardFetchInProgress: boardFetchInProgressAction,
  boardFetchSuccess: boardFetchSuccessAction,
  boardFetchError: boardFetchErrorAction,
  boardStatusCreateError: boardStatusCreateErrorAction,
  boardStatusCreateInProgress: boardStatusCreateInProgressAction,
  boardStatusCreateSuccess: boardStatusCreateSuccessAction,
  boardFilterParamsSet: boardFilterParamsSetAction,
  boardFilterParamsReset: boardFilterParamsResetAction,
  boardTaskCreateInProgress: boardTaskCreateInProgressAction,
  boardTaskCreateSuccess: boardTaskCreateSuccessAction,
  boardTaskCreateError: boardTaskCreateErrorAction,
  boardUpdateItemIdSet: boardUpdateItemIdSetAction,
  boardTaskUpdateInProgress: boardTaskUpdateInProgressAction,
  boardTaskUpdateSuccess: boardTaskUpdateSuccessAction,
  boardTaskUpdateError: boardTaskUpdateErrorAction,
  boardDeleteItemDataSet: boardDeleteItemDataSetAction,
  boardTaskDeleteInProgress: boardTaskDeleteInProgressAction,
  boardTaskDeleteSuccess: boardTaskDeleteSuccessAction,
  boardTaskDeleteError: boardTaskDeleteErrorAction,
  boardDeleteStatusDataSet: boardDeleteStatusDataSetAction,
} = boardSlice.actions;

export default boardSlice.reducer;
