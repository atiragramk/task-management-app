import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../../types";
import { projectsListFetch } from "../thunk/projects";
import {
  projectCreateInProgress,
  projectCreateSuccess,
  projectCreateError,
} from "../actions/projects";
import { DocumentData } from "firebase/firestore";

export type ProjectsState = {
  error: boolean | null;
  loading: boolean;
  data: Project[] | [];
  createState: {
    error: boolean | null;
    loading: boolean;
    data: Project | {};
  };
};

const initialState: ProjectsState = {
  error: null,
  loading: true,
  data: [],
  createState: {
    error: null,
    loading: false,
    data: {},
  },
};

const name = "PROJECTS";
const projectSlice = createSlice({
  name,
  initialState,
  reducers: {
    projectCreateInProgress,
    projectCreateSuccess,
    projectCreateError,
  },
  extraReducers(builder) {
    builder
      .addCase(projectsListFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(projectsListFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload!;
      })
      .addCase(projectsListFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {
  projectCreateInProgress: projectCreateInProgressAction,
  projectCreateSuccess: projectCreateSuccessAtion,
  projectCreateError: projectCreateErrorAction,
} = projectSlice.actions;

export default projectSlice.reducer;
