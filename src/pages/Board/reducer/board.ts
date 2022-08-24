import { createSlice } from "@reduxjs/toolkit";
import {
  Params,
  SortedTask,
  Status,
  User,
  Task,
  Project,
} from "../../../types";
import {
  boardListFetch,
  boardStatusListFetch,
  boardUserListFetch,
  boardItemUpdateDataFetch,
  boardItemOpenDataFetch,
  boardProjectDataFetch,
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
  boardItemIdSet,
  boardTaskItemInProgress,
  boardTaskItemSuccess,
  boardTaskItemError,
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
  projectState: {
    loading: boolean;
    error: boolean | null;
    projectData: Project | null;
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
  taskItemState: {
    loading: boolean;
    error: boolean | null;
    fetchData: string;
    taskData: Task | null;
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
    projectId: "",
    assignee: [],
    userData: [],
  },
  projectState: {
    loading: false,
    error: null,
    projectData: null,
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
  taskItemState: {
    loading: false,
    error: null,
    fetchData: "",
    taskData: null,
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
    boardItemIdSet,
    boardTaskItemInProgress,
    boardTaskItemSuccess,
    boardTaskItemError,
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
      .addCase(boardItemUpdateDataFetch.pending, (state) => {
        state.updateState.loading = true;
        state.updateState.error = false;
      })
      .addCase(boardItemUpdateDataFetch.fulfilled, (state, action) => {
        state.updateState.loading = false;
        state.updateState.taskData = action.payload!;
      })
      .addCase(boardItemUpdateDataFetch.rejected, (state) => {
        state.updateState.loading = false;
        state.updateState.error = true;
      })
      .addCase(boardItemOpenDataFetch.pending, (state) => {
        state.taskItemState.loading = true;
        state.taskItemState.error = false;
      })
      .addCase(boardItemOpenDataFetch.fulfilled, (state, action) => {
        state.taskItemState.loading = false;
        state.taskItemState.taskData = action.payload!;
      })
      .addCase(boardItemOpenDataFetch.rejected, (state) => {
        state.taskItemState.loading = false;
        state.taskItemState.error = true;
      })
      .addCase(boardProjectDataFetch.pending, (state) => {
        state.projectState.loading = true;
        state.projectState.error = false;
      })
      .addCase(boardProjectDataFetch.fulfilled, (state, action) => {
        state.projectState.loading = false;
        state.projectState.projectData = action.payload!;
      })
      .addCase(boardProjectDataFetch.rejected, (state) => {
        state.projectState.loading = false;
        state.projectState.error = true;
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
  boardItemIdSet: boardItemIdSetAction,
  boardTaskItemInProgress: boardTaskItemInProgressAction,
  boardTaskItemSuccess: boardTaskItemSuccessAction,
  boardTaskItemError: boardTaskItemErrorAction,
} = boardSlice.actions;

export default boardSlice.reducer;
