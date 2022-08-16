import { BoardState } from "../reducer/board";
import { PayloadAction } from "@reduxjs/toolkit";
import { Params } from "../../../types";

export const boardFetchInProgress = (state: BoardState) => {
  state.loading = true;
  state.error = false;
};
export const boardFetchSuccess = (state: BoardState) => {
  state.loading = false;
};
export const boardFetchError = (state: BoardState) => {
  state.loading = false;
  state.error = true;
};

export const boardStatusFetchInProgress = (state: BoardState) => {
  state.status.loading = true;
  state.status.error = false;
};
export const boardStatusFetchSuccess = (state: BoardState) => {
  state.status.loading = false;
};
export const boardStatusFetchError = (state: BoardState) => {
  state.status.loading = false;
  state.status.error = true;
};

export const boardFilterParams = (
  state: BoardState,
  action: PayloadAction<Partial<Params>>
) => {
  state.params = { ...state.params, ...action.payload };
};
