import { createSelector } from "reselect";
import { RootState } from "../../../store";

const projectsStateSelector = (state: RootState) => state.projects;

export const projectsLoadingSelector = createSelector(
  projectsStateSelector,
  (projects) => projects.loading
);

export const projectsErrorSelector = createSelector(
  projectsStateSelector,
  (projects) => projects.error
);

export const projectsDataSelector = createSelector(
  projectsStateSelector,
  (projects) => projects.data
);

export const projectCreateStateSelector = createSelector(
  projectsStateSelector,
  (projects) => projects.createState
);
