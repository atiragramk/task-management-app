import { ReactNode, useState } from "react";
import { useDispatch } from "react-redux";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSchema } from "./validation";
import { StyledContainer, StyledForm, StyledLink } from "./styled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { User } from "../../types";
import { AppDispatch } from "../../store";
import { authLoginFetch } from "./thunk/auth";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSchema),
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values: Partial<User>) => {
    dispatch(authLoginFetch(values));
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
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </FormControl>
        <Button sx={{ width: 300 }} type="submit" variant="contained">
          Sign in
        </Button>
        <Typography variant="caption">
          No account? <StyledLink to="/register">Create one</StyledLink>
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
};

export default Auth;
