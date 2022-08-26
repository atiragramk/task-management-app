import { ProjectsState } from "../reducer/projects";

export const projectCreateInProgress = (state: ProjectsState) => {
  state.createState.loading = true;
  state.createState.error = false;
};
export const projectCreateSuccess = (state: ProjectsState) => {
  state.createState.loading = false;
};
export const projectCreateError = (state: ProjectsState) => {
  state.createState.loading = false;
  state.createState.error = true;
};
