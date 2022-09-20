import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    firstName: yup.string().required('First name is required').min(2, 'Minimum length is 2 character'),
    lastName: yup.string().required('Last name is required').min(2, 'Minimum length is 2 character'),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .required("Please enter your password")
        .min(8, "Password is too short - should be at least 8 chars")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters")
    ,
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});
