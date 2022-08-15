import { createSlice } from "@reduxjs/toolkit";
import { SortedTask, Status } from "../../../types";
import { boardListFetch, boardStatusListFetch } from "../thunk/board";
import {
  boardFetchInProgress,
  boardFetchSuccess,
  boardFetchError,
  boardStatusFetchError,
  boardStatusFetchInProgress,
  boardStatusFetchSuccess,
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
        state.loading = true;
        state.error = false;
      })
      .addCase(boardStatusListFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.status.data = action.payload;
      })
      .addCase(boardStatusListFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
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
} = boardSlice.actions;

export default boardSlice.reducer;
