import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { createProject, getAllProjects } from "../../../api/projects";
import { modalOpenToggleAction } from "../../../store/modal/reducer/modal";
import { Project } from "../../../types";
import {
  projectCreateErrorAction,
  projectCreateInProgressAction,
  projectCreateSuccessAtion,
} from "../reducer/projects";

const PROJECTS_FETCH_THUNK_TYPE = "PROJECTS_FETCH_THUNK_TYPE";

export const projectsListFetch = createAsyncThunk(
  PROJECTS_FETCH_THUNK_TYPE,
  async (_, { rejectWithValue }) => {
    try {
      return await getAllProjects();
    } catch (error) {
      toast.error("Something went wrong");
      return rejectWithValue(error);
    }
  }
);

const PROJECTS_CREATE_FETCH_THUNK_TYPE = "PROJECTS_CREATE_FETCH_THUNK_TYPE";

export const projectCreateFetch = createAsyncThunk(
  PROJECTS_CREATE_FETCH_THUNK_TYPE,
  async (data: Partial<Project>, { dispatch }) => {
    try {
      dispatch(projectCreateInProgressAction());
      await createProject(data);
      dispatch(projectCreateSuccessAtion());
      dispatch(modalOpenToggleAction());
      toast.success("Project was created");
      await dispatch(projectsListFetch());
    } catch (error) {
      dispatch(projectCreateErrorAction());
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return toast.error(error.response?.data.data);
        }
        toast.error(error.message);
      }
    }
  }
);
