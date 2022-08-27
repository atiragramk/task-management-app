import * as yup from "yup";

export const authSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("No password provided")
    .min(8, "Password is too short - should be at least 8 chars")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters"),
});
