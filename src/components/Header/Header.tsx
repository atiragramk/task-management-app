import logo from "../../assets/img/logo.png";
import { Typography, IconButton, Box, Popover, Button } from "@mui/material";
import {
  StyledImage,
  StyledNavLink,
  StyledLink,
  StyledAppBar,
  StyledToolbar,
  StyledAvatar,
  StyledSpan,
} from "./styled";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
            <Stack sx={{ ml: 2 }} direction="row">
              <StyledNavLink to="/">HOME</StyledNavLink>
              <Stack direction="row">
                <StyledNavLink to="/projects">PROJECTS</StyledNavLink>
                <IconButton onClick={handleClick} sx={{ p: 0 }} color="primary">
                  <ArrowDropDownIcon />
                </IconButton>

                <Popover
                  open={open}
                  id={id}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 30,
                    horizontal: -10,
                  }}
                >
                  <Stack>
                    <Button
                      onClick={handleClose}
                      component={Link}
                      size="small"
                      color="info"
                      to="/projects"
                    >
                      View all projects
                    </Button>
                    <Button
                      component={Link}
                      size="small"
                      to="/projects"
                      color="info"
                    >
                      Create project
                    </Button>
                  </Stack>
                </Popover>
              </Stack>
            </Stack>
          </Box>
          <IconButton>
            <StyledAvatar />
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
};
