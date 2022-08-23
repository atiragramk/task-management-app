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

export const boardFilterParams = createSelector(
  boardStateSelector,
  (board) => board.params
);

export const boardUsersSelector = createSelector(
  boardStateSelector,
  (board) => board.users
);

export const boardCreateStateSelector = createSelector(
  boardStateSelector,
  (board) => board.createState
);

export const boardUpdateStateSelector = createSelector(
  boardStateSelector,
  (board) => board.updateState
);

export const boardDeleteStateSelector = createSelector(
  boardStateSelector,
  (board) => board.deleteState
);

export const boardTaskItemSelector = createSelector(
  boardStateSelector,
  (board) => board.taskItemState
);

export const boardProjectStateSelector = createSelector(
  boardStateSelector,
  (board) => board.projectState
);
