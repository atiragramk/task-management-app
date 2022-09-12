import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types";
import { registerUserFetch } from "../thunk/register";
import { resetRegisteredData } from "../actions/register";

export type RegisterState = {
    loading: boolean;
    error: boolean | null;
    data: Partial<User>;
}


const initialState: RegisterState = {
    loading: true,
    error: null,
    data: {}
}

const name = "REGISTER"

const registerSlice = createSlice({
    name,
    initialState,
    reducers: { resetRegisteredData },
    extraReducers(builder) {
        builder
            .addCase(registerUserFetch.pending, (state) => {
                state.loading = true;
                state.error = false
            })
            .addCase(registerUserFetch.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload!
            })
            .addCase(registerUserFetch.rejected, (state) => {
                state.loading = false;
                state.error = true
            })
    }
})

export const { resetRegisteredData: resetRegisteredDataAction } = registerSlice.actions
export default registerSlice.reducer