import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import { AppDispatch } from "../../store";
import { authRemoveTokenAction } from "../../pages/Auth/reducer/auth";
import { authStateSelector } from "../../pages/Auth/selectors/auth";
import { authUserDataFetch } from "../../pages/Auth/thunk/auth";

export const Header = () => {
  const [anchorNavEl, setAnchorNavEl] = useState<HTMLButtonElement | null>(
    null
  );
  const [anchorAvatarEl, setAnchorAvatarEl] = useState<HTMLDivElement | null>(
    null
  );

  const { data, loading, user } = useSelector(authStateSelector);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (data.uid) {
      dispatch(authUserDataFetch(data.uid));
    }
  }, [data.uid, dispatch]);

  const token = localStorage.getItem("token");
  const handleOpenPopover = (event: React.BaseSyntheticEvent, type: string) => {
    if (type === "avatar") {
      setAnchorAvatarEl(event.currentTarget);
    } else {
      setAnchorNavEl(event.currentTarget);
    }
  };

  const handleClosePopover = (type: string) => {
    if (type === "avatar") {
      setAnchorAvatarEl(null);
    } else {
      setAnchorNavEl(null);
    }
  };

  const handleSignOut = () => {
    dispatch(authRemoveTokenAction());
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
            <Typography variant="h6" sx={{ fontSize: { xs: 14, lg: 18 } }}>
              Just <StyledSpan>TODO</StyledSpan> it
            </Typography>
            <Stack sx={{ ml: 2 }} direction="row">
              <StyledNavLink sx={{ fontSize: { xs: 12, lg: 16 } }} to="/">
                HOME
              </StyledNavLink>
              <Stack direction="row">
                <StyledNavLink
                  sx={{ fontSize: { xs: 12, lg: 16 } }}
                  to="/projects"
                >
                  PROJECTS
                </StyledNavLink>
                <IconButton
                  onClick={(e) => handleOpenPopover(e, "navigation")}
                  sx={{ p: 0 }}
                  color="primary"
                >
                  <ArrowDropDownIcon />
                </IconButton>

                <Popover
                  open={openNav}
                  id={id}
                  anchorEl={anchorNavEl}
                  onClose={() => handleClosePopover("projects")}
                  anchorOrigin={{
                    vertical: 40,
                    horizontal: -10,
                  }}
                >
                  <Stack>
                    <Button
                      onClick={() => handleClosePopover("projects")}
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
          {token && data.uid && !loading && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                display="inline"
                sx={{ fontSize: { xs: 12, lg: 16 } }}
              >
                Hello,{" "}
                <Typography
                  color="primary"
                  display="inline"
                  variant="button"
                  sx={{ fontSize: { xs: 12, lg: 16 } }}
                >
                  {user.firstName}
                </Typography>
              </Typography>
              <IconButton>
                <StyledAvatar onClick={(e) => handleOpenPopover(e, "avatar")} />
                <Popover
                  open={openAvatar}
                  id={id}
                  anchorEl={anchorAvatarEl}
                  onClose={() => handleClosePopover("avatar")}
                  anchorOrigin={{
                    vertical: 40,
                    horizontal: -10,
                  }}
                >
                  <Stack>
                    <Button
                      onClick={() => {
                        handleClosePopover("avatar");
                        handleSignOut();
                      }}
                      endIcon={<LogoutIcon />}
                      size="small"
                      color="info"
                    >
                      Sign out
                    </Button>
                  </Stack>
                </Popover>
              </IconButton>
            </Box>
          )}
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
};
