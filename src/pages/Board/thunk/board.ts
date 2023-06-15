import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { AxiosError } from "axios";
import { modalOpenToggleAction } from "../../../store/modal/reducer/modal";
import {
  CreateThunkType,
  Params,
  Project,
  Status,
  Task,
  User,
} from "../../../types";

import {
  boardFilterParamsResetAction,
  boardStatusCreateErrorAction,
  boardStatusCreateInProgressAction,
  boardStatusCreateSuccessAction,
  boardTaskCreateErrorAction,
  boardTaskCreateInProgressAction,
  boardTaskCreateSuccessAction,
  boardTaskDeleteErrorAction,
  boardTaskDeleteInProgressAction,
  boardTaskDeleteSuccessAction,
  boardTaskUpdateErrorAction,
  boardTaskUpdateInProgressAction,
  boardTaskUpdateSuccessAction,
} from "../reducer/board";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { get } from "http";

const BOARD_FETCH_THUNK_TYPE = "BOARD_FETCH_THUNK_TYPE";

export const boardListFetch = createAsyncThunk(
  BOARD_FETCH_THUNK_TYPE,
  async (params: Partial<Params>, { rejectWithValue }) => {
    try {
      const constraints = [
        where("projectId", "==", params.projectId),
        where("state", "==", "ACTIVE"),
      ];
      if (params.status)
        constraints.push(where("statusId", "==", params.status));
      if (params.priority)
        constraints.push(where("priority", "==", params.priority));
      const titleVariations = [
        params.search?.toLowerCase(),
        params.search?.toUpperCase(),
        params.search,
        params.search?.charAt(0).toUpperCase() +
          params.search!.slice(1).toLowerCase(),
      ];
      if (params.search)
        constraints.push(where("title", "in", titleVariations));
      if (params.assignee?.length)
        constraints.push(
          where("assignee", "array-contains-any", params.assignee)
        );

      const q = query(collection(db, "tasks"), ...constraints);
      return (await getDocs(q)).docs.map((doc) => doc.data()) as Task[];
    } catch (error) {
      toast.error("Something went wrong");

      return rejectWithValue(error);
    }
  }
);
const STATUS_LIST_FETCH_THUNK_TYPE = "STATUS_LIST_FETCH_THUNK_TYPE";

export const boardStatusListFetch = createAsyncThunk(
  STATUS_LIST_FETCH_THUNK_TYPE,
  async (params: Partial<Params>, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "statuses"),
        where("projectId", "==", params.projectId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data()) as Status[];
    } catch (error) {
      toast.error("Something went wrong");
      return rejectWithValue(error);
    }
  }
);
const BOARD_USER_FETCH_THUNK_TYPE = "BOARD_USER_FETCH_THUNK_TYPE";

export const boardUserListFetch = createAsyncThunk(
  BOARD_USER_FETCH_THUNK_TYPE,
  async (_, { rejectWithValue }) => {
    try {
      const projectRef = collection(db, "users");
      const querySnapshot = await getDocs(projectRef);
      return querySnapshot.docs.map((doc) => {
        return doc.data();
      }) as User[];
    } catch (error) {
      toast.error("Something went wrong");
      return rejectWithValue(error);
    }
  }
);

const BOARD_CREATE_TASK_FETCH_THUNK_TYPE = "BOARD_CREATE_TASK_FETCH_THUNK_TYPE";

export const boardCreateTaskFetch = createAsyncThunk(
  BOARD_CREATE_TASK_FETCH_THUNK_TYPE,
  async (values: CreateThunkType, { dispatch }) => {
    try {
      const { data, params } = values;
      dispatch(boardTaskCreateInProgressAction());
      const id = uuidv4();
      const q = query(
        collection(db, "tasks"),
        where("projectId", "==", params.projectId)
      );
      const querySnapshot = await getDocs(q);
      const key = querySnapshot.docs.length + 1;
      await setDoc(doc(db, "tasks", id), {
        _id: id,
        title: data.title,
        description: data.description,
        projectId: data.projectId,
        key,
        statusId: data.statusId,
        priority: data.priority,
        assignee: data.assignee || [],
        state: "ACTIVE",
      });
      dispatch(boardTaskCreateSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Task was created");
      await dispatch(boardListFetch(params));
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(boardTaskCreateErrorAction());
    }
  }
);

const BOARD_UPDATE_FETCH_DATA_THUNK_TYPE = "BOARD_UPDATE_FETCH_DATA_THUNK_TYPE";
export const boardItemUpdateDataFetch = createAsyncThunk(
  BOARD_UPDATE_FETCH_DATA_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      const taskRef = doc(db, "tasks", id);
      const docSnap = await getDoc(taskRef);
      if (docSnap.exists()) {
        return docSnap.data() as Task;
      }
    } catch (error) {
      toast.error("Something went wrong");
      return rejectWithValue(error);
    }
  }
);

const BOARD_OPEN_FETCH_DATA_THUNK_TYPE = "BOARD_OPEN_FETCH_DATA_THUNK_TYPE";
export const boardItemOpenDataFetch = createAsyncThunk(
  BOARD_OPEN_FETCH_DATA_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      const taskRef = doc(db, "tasks", id);
      const docSnap = await getDoc(taskRef);
      if (docSnap.exists()) {
        return docSnap.data() as Task;
      }
    } catch (error) {
      toast.error("Something went wrong");
      return rejectWithValue(error);
    }
  }
);

const BOARD_UPDATE_TASK_FETCH_THUNK_TYPE = "BOARD_UPDATE_TASK_FETCH_THUNK_TYPE";

export const boardUpdateTaskFetch = createAsyncThunk(
  BOARD_UPDATE_TASK_FETCH_THUNK_TYPE,
  async (values: CreateThunkType, { dispatch }) => {
    try {
      const { data, params } = values;
      dispatch(boardTaskUpdateInProgressAction());
      const taskRef = doc(db, "tasks", data._id!);
      await updateDoc(taskRef, {
        ...data,
      });
      dispatch(boardTaskUpdateSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Task was updated");
      dispatch(boardFilterParamsResetAction());
      await dispatch(boardListFetch(params));
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(boardTaskUpdateErrorAction());
    }
  }
);

const BOARD_DELETE_TASK_FETCH_THUNK_TYPE = "BOARD_DELETE_TASK_FETCH_THUNK_TYPE";

export const boardDeleteTaskFetch = createAsyncThunk(
  BOARD_DELETE_TASK_FETCH_THUNK_TYPE,
  async (values: CreateThunkType, { dispatch }) => {
    try {
      const { data, params } = values;
      dispatch(boardTaskDeleteInProgressAction());
      const taskRef = doc(db, "tasks", data._id!);
      await updateDoc(taskRef, {
        state: "DELETED",
      });

      dispatch(boardTaskDeleteSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Task was deleted");
      dispatch(boardFilterParamsResetAction());
      await dispatch(boardListFetch(params));
    } catch (error) {
      dispatch(boardTaskDeleteErrorAction());
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return toast.error(error.response?.data.data);
        }
        toast.error(error.message);
      }
    }
  }
);

const BOARD_DELETE_STATUS_FETCH_THUNK_TYPE =
  "BOARD_DELETE_TASK_FETCH_THUNK_TYPE";

export const boardDeleteStatusFetch = createAsyncThunk(
  BOARD_DELETE_STATUS_FETCH_THUNK_TYPE,
  async (values: CreateThunkType, { dispatch }) => {
    try {
      const { data, params } = values;

      dispatch(boardTaskDeleteInProgressAction());
      await deleteDoc(doc(db, "statuses", data._id!));
      dispatch(boardTaskDeleteSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Status was deleted");
      dispatch(boardFilterParamsResetAction());
      await dispatch(boardStatusListFetch(params));
    } catch (error) {
      dispatch(boardTaskDeleteErrorAction());
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return toast.error(error.response?.data.data);
        }
        toast.error(error.message);
      }
    }
  }
);

const BOARD_CREATE_STATUS_FETCH_THUNK_TYPE =
  "BOARD_CREATE_STATUS_FETCH_THUNK_TYPE";

export const boardCreateStatusFetch = createAsyncThunk(
  BOARD_CREATE_STATUS_FETCH_THUNK_TYPE,
  async (values: CreateThunkType, { dispatch }) => {
    try {
      const { data, params } = values;

      dispatch(boardStatusCreateInProgressAction());

      const id = uuidv4();
      await setDoc(doc(db, "statuses", id), {
        _id: id,
        displayName:
          data.key?.trim().charAt(0).toUpperCase() + data.key!.slice(1),
        key: data.key,
        projectId: params.projectId,
      });
      dispatch(boardStatusCreateSuccessAction());
      dispatch(modalOpenToggleAction());
      toast.success("Status was created");
      dispatch(boardFilterParamsResetAction());
      await dispatch(boardStatusListFetch(params));
    } catch (error) {
      const { params } = values;
      dispatch(boardStatusCreateErrorAction());
      await dispatch(boardStatusListFetch(params));
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          return toast.error(error.response?.data.data);
        }
        toast.error(error.message);
      }
    }
  }
);

const BOARD_PROJECT_FETCH_DATA_THUNK_TYPE =
  "BOARD_PROJECT_FETCH_DATA_THUNK_TYPE";

export const boardProjectDataFetch = createAsyncThunk(
  BOARD_PROJECT_FETCH_DATA_THUNK_TYPE,
  async (data: { id: string }, { dispatch }) => {
    try {
      const projectRef = doc(db, "projects", data.id);
      const docSnap = await getDoc(projectRef);
      if (docSnap.exists()) {
        return docSnap.data() as Project;
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
);

const BOARD_UPDATE_TASK_DRAG_THUNK_TYPE = "BOARD_UPDATE_TASK_DRAG_THUNK_TYPE";

export const boardUpdateTaskDrag = createAsyncThunk(
  BOARD_UPDATE_TASK_DRAG_THUNK_TYPE,
  async (values: CreateThunkType, { dispatch }) => {
    try {
      const { data, params } = values;
      dispatch(boardTaskUpdateInProgressAction());
      const taskRef = doc(db, "tasks", data._id!);
      await updateDoc(taskRef, {
        ...data,
      });
      dispatch(boardTaskUpdateSuccessAction());
      toast.success("Task was updated");
      await dispatch(boardListFetch(params));
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(boardTaskUpdateErrorAction());
    }
  }
);
