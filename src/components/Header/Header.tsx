import { useState } from "react";
import { Link } from "react-router-dom";

import { Stack } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography, IconButton, Box, Popover, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  StyledImage,
  StyledNavLink,
  StyledLink,
  StyledAppBar,
  StyledToolbar,
  StyledAvatar,
  StyledSpan,
} from "./styled";
import logo from "../../assets/img/logo.png";

export const Header = () => {
  const [anchorNavEl, setAnchorNavEl] = useState<HTMLButtonElement | null>(
    null
  );
  const [anchorAvatarEl, setAnchorAvatarEl] = useState<HTMLDivElement | null>(
    null
  );

  const handleNavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorNavEl(event.currentTarget);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorAvatarEl(event.currentTarget);
  };

  const handleCloseNav = () => {
    setAnchorNavEl(null);
  };

  const handleCloseAvatar = () => {
    setAnchorAvatarEl(null);
  };

  const openNav = Boolean(anchorNavEl);
  const openAvatar = Boolean(anchorAvatarEl);

  const id = openNav || openAvatar ? "simple-popover" : undefined;

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
                <IconButton
                  onClick={handleNavClick}
                  sx={{ p: 0 }}
                  color="primary"
                >
                  <ArrowDropDownIcon />
                </IconButton>

                <Popover
                  open={openNav}
                  id={id}
                  anchorEl={anchorNavEl}
                  onClose={handleCloseNav}
                  anchorOrigin={{
                    vertical: 40,
                    horizontal: -10,
                  }}
                >
                  <Stack>
                    <Button
                      onClick={handleCloseNav}
                      component={Link}
                      size="small"
                      color="info"
                      to="/projects"
                    >
                      View all projects
                    </Button>
                  </Stack>
                </Popover>
              </Stack>
            </Stack>
          </Box>
          <IconButton>
            <StyledAvatar onClick={handleAvatarClick} />
            <Popover
              open={openAvatar}
              id={id}
              anchorEl={anchorAvatarEl}
              onClose={handleCloseAvatar}
              anchorOrigin={{
                vertical: 40,
                horizontal: -10,
              }}
            >
              <Stack>
                <Button
                  onClick={handleCloseAvatar}
                  endIcon={<LogoutIcon />}
                  size="small"
                  color="info"
                >
                  Sign out
                </Button>
              </Stack>
            </Popover>
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
};
