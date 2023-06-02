import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { User } from "../../../types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";

const AUTH_LOGIN_THUNK_TYPE = "AUTH_LOGIN_THUNK_TYPE";

export const authLoginFetch = createAsyncThunk(
  AUTH_LOGIN_THUNK_TYPE,
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const { email, password } = data;
      const { user } = await signInWithEmailAndPassword(
        auth,
        email!,
        password!
      );
      localStorage.setItem("token", user.refreshToken);
      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
        return rejectWithValue(error);
      }
    }
  }
);

const AUTH_USER_DATA_FETCH_THUNK_TYPE = "AUTH_USER_DATA_FETCH_THUNK_TYPE";

export const authUserDataFetch = createAsyncThunk(
  AUTH_USER_DATA_FETCH_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", id);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          toast.error(error.response?.data.data);
          return rejectWithValue(error);
        }
        toast.error(error.message);
        return rejectWithValue(error);
      }
    }
  }
);
