import logo from "../../assets/img/logo.png";
import { Typography, IconButton, Box } from "@mui/material";
import {
  StyledImage,
  StyledNavLink,
  StyledLink,
  StyledAppBar,
  StyledToolbar,
  StyledAvatar,
  StyledSpan,
} from "./styled";

export const Header = () => {
  return (
    <>
      <StyledAppBar position="sticky">
        <StyledToolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <StyledLink to="/">
              <StyledImage src={logo} alt="logo" />
            </StyledLink>
            <Typography variant="h6">
              Just <StyledSpan>TODO</StyledSpan> it
            </Typography>
            <Box sx={{ m: 3 }}>
              <StyledNavLink to="/">HOME</StyledNavLink>
              <StyledNavLink to="/board">BOARD</StyledNavLink>
              <StyledNavLink to="/projects">PROJECTS</StyledNavLink>
            </Box>
          </Box>
          <IconButton>
            <StyledAvatar />
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
};
