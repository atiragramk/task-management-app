import { RegisterState } from "../reducer/register";


export const resetRegisteredData = (state: RegisterState) => {
    state.data = {}
}