import { BoardState } from "../reducer/board";
import { PayloadAction } from "@reduxjs/toolkit";
import { Params, Task } from "../../../types";

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

export const boardTaskUpdateInProgress = (state: BoardState) => {
  state.updateState.loading = true;
  state.updateState.error = false;
};
export const boardTaskUpdateSuccess = (state: BoardState) => {
  state.updateState.loading = false;
};

export const boardTaskUpdateError = (state: BoardState) => {
  state.updateState.loading = false;
  state.updateState.error = true;
};

export const boardDeleteItemDataSet = (
  state: BoardState,
  action: PayloadAction<Task>
) => {
  state.deleteState.taskData = action.payload;
};

export const boardTaskDeleteInProgress = (state: BoardState) => {
  state.deleteState.loading = true;
  state.deleteState.error = false;
};
export const boardTaskDeleteSuccess = (state: BoardState) => {
  state.deleteState.loading = false;
};

export const boardTaskDeleteError = (state: BoardState) => {
  state.deleteState.loading = false;
  state.deleteState.error = true;
};
