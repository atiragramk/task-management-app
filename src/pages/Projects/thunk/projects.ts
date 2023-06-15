import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { modalOpenToggleAction } from "../../../store/modal/reducer/modal";
import { Project } from "../../../types";
import {
  projectCreateErrorAction,
  projectCreateInProgressAction,
  projectCreateSuccessAtion,
} from "../reducer/projects";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { FirebaseError } from "firebase/app";

const PROJECTS_FETCH_THUNK_TYPE = "PROJECTS_FETCH_THUNK_TYPE";

export const projectsListFetch = createAsyncThunk(
  PROJECTS_FETCH_THUNK_TYPE,
  async (_, { rejectWithValue }) => {
    try {
      const projectRef = collection(db, "projects");
      const querySnapshot = await getDocs(projectRef);
      return querySnapshot.docs.map((doc) => {
        return doc.data();
      }) as Project[];
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
      const { name, description } = data;
      const arr = name!.split(" ");
      const id = uuidv4();
      const shortName =
        arr.length === 1
          ? arr[0].slice(0, 2).toUpperCase()
          : arr[0].charAt(0).toUpperCase() + arr[1].charAt(0).toUpperCase();
      await setDoc(doc(db, "projects", id), {
        _id: id,
        name,
        description,
        shortName,
      });
      dispatch(projectCreateSuccessAtion());
      dispatch(modalOpenToggleAction());
      toast.success("Project was created");
      await dispatch(projectsListFetch());
    } catch (error) {
      dispatch(projectCreateErrorAction());
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    }
  }
);
