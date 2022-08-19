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

export const boardTaskCreateInProgress = (state: BoardState) => {
  state.createState.loading = true;
  state.createState.error = false;
};
export const boardTaskCreateSuccess = (state: BoardState) => {
  state.createState.loading = false;
};
export const boardTaskCreateError = (state: BoardState) => {
  state.createState.loading = false;
  state.createState.error = true;
};

export const boardUpdateItemIdSet = (
  state: BoardState,
  action: PayloadAction<{ id: string }>
) => {
  state.updateState.fetchData = action.payload;
};
