import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { User } from "../../../types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

const REGISTER_THUNK_TYPE = "REGISTER_THUNK_TYPE";

export const registerUserFetch = createAsyncThunk(
  REGISTER_THUNK_TYPE,
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const { email, password, firstName, lastName, color } = data;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email!,
        password!
      );
      await setDoc(doc(db, "users", user.uid), {
        _id: user.uid,
        firstName,
        lastName,
        color,
        email,
      });
      toast.success("You was successful registered");
      return user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
        return rejectWithValue(error);
      }
    }
  }
);
