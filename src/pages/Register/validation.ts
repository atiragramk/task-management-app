import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    firstName: yup.string().min(2, 'Minimum length is 2 character').required('First name is required'),
    lastName: yup.string().min(2, 'Minimum length is 2 character').required('Last name is required'),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password is too short - should be at least 8 chars")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters")
        .oneOf([yup.ref('confirmPassword'), null], 'Passwords must match')
    ,
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password is required')
});
