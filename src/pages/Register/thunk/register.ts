import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { register } from "../../../api/auth";
import { User } from "../../../types";

const REGISTER_THUNK_TYPE = "REGISTER_THUNK_TYPE";

export const registerUserFetch = createAsyncThunk(
    REGISTER_THUNK_TYPE,
    async (data: Partial<User>, { rejectWithValue }) => {
        try {
            const user = await register(data);
            toast.success('You was successful registered');
            return user
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
)
