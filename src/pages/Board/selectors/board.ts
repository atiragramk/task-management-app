import { createSelector } from "reselect";
import { RootState } from "../../../store";

const boardStateSelector = (state: RootState) => state.board;

export const boardLoadingSelector = createSelector(
  boardStateSelector,
  (board) => board.loading
);

export const boardErrorSelector = createSelector(
  boardStateSelector,
  (board) => board.error
);

export const boardDataSelector = createSelector(
  boardStateSelector,
  (board) => board.data
);

export const boardStatusSelector = createSelector(
  boardStateSelector,
  (board) => board.status
);
