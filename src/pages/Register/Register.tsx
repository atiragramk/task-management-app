import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Typography,
  FormControl,
  FormLabel,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { StyledContainer, StyledForm } from "./styled";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { registerSchema } from "./validation";
import { registerUserFetch } from "./thunk/register";
import { resetRegisteredDataAction } from "./reducer/register";
import { StyledLink } from "../Auth/styled";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetRegisteredDataAction());
    };
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleShowPassword = (name: string) => {
    if (name === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const randomColor = () => {
    return (
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
  };

  const onSubmit = (values: Partial<User>) => {
    const data = { ...values, color: randomColor() };
    dispatch(registerUserFetch(data));
  };
  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography display="inline" variant="h5">
          Welcome to{" "}
          <Typography display="inline" color="primary" variant="h5">
            TODO
          </Typography>
        </Typography>
        <FormControl>
          <FormLabel required>First Name</FormLabel>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                error={Boolean(errors.firstName)}
                sx={{ width: 300 }}
                placeholder="Your first name"
                helperText={errors.firstName?.message as ReactNode}
                size="small"
                {...field}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel required> Last Name</FormLabel>
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                error={Boolean(errors.lastName)}
                sx={{ width: 300 }}
                placeholder="Your last name"
                helperText={errors.lastName?.message as ReactNode}
                size="small"
                {...field}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel required>Email</FormLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                error={Boolean(errors.email)}
                sx={{ width: 300 }}
                placeholder="johndoe@email.com"
                helperText={errors.email?.message as ReactNode}
                size="small"
                {...field}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel required>Password</FormLabel>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.password)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                sx={{ width: 300 }}
                helperText={errors.password?.message as ReactNode}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleShowPassword("password")}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel required>Confirm Password</FormLabel>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.confirmPassword)}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                sx={{ width: 300 }}
                helperText={errors.confirmPassword?.message as ReactNode}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleShowPassword("confirmPassword")}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </FormControl>
        <Button sx={{ width: 300, mt: 2 }} type="submit" variant="contained">
          Sign up
        </Button>
        <Typography variant="caption">
          Already have an account? <StyledLink to="/login">Sign in</StyledLink>
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
};

export default Register;
