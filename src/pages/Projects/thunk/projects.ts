import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllProjects } from "../../../api/tasks";

const PROJECTS_FETCH_THUNK_TYPE = "PROJECTS_FETCH_THUNK_TYPE";

export const projectsListFetch = createAsyncThunk(
  PROJECTS_FETCH_THUNK_TYPE,
  async (_, { rejectWithValue }) => {
    try {
      return await getAllProjects();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
