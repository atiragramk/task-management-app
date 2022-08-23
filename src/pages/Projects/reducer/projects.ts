import { createSlice } from "@reduxjs/toolkit";
import { Project } from "../../../types";
import { projectsListFetch } from "../thunk/projects";

type ProjectsState = {
  error: boolean | null;
  loading: boolean;
  data: Project[] | [];
};

const initialState: ProjectsState = {
  error: null,
  loading: true,
  data: [],
};

const name = "PROJECTS";
const projectSlice = createSlice({
  name,
  initialState,
  reducers: {},
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

export default projectSlice.reducer;
