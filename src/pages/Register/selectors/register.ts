import { RootState } from "../../../store";

export const registerStateSelector = (state: RootState) => state.register.data;
