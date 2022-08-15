// import styled from "styled-components";
import { AppBar, Avatar, styled, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";

export const StyledImage = styled("img")`
  height: 80px;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  position: relative;
  padding: 3px 7px;
  font-weight: 300;
  color: #424242;
  letter-spacing: 0.0075em;
  &::after {
    content: "";
    position: absolute;
    top: 40px;
    left: 0px;
    width: 100%;
    height: 0.1em;
    background-color: #9575cd;
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
    transform: translate3d(-100%, 0, 0);
  }

  &:hover {
    color: rgb(151 151 151);
  }

  &.active {
    pointer-events: none;
    color: #7e57c2;
    &::after {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

export const StyledLink = styled(NavLink)`
  &.active {
    pointer-events: none;
  }
`;

export const StyledAppBar = styled(AppBar)`
  background-color: rgb(248 246 252);
  color: #424242;
  box-shadow: 0px 1px 10px 0px rgb(0 0 0 / 22%);
  z-index: 1200;
`;

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledAvatar = styled(Avatar)`
  background-color: #673ab7;
  width: 32px;
  height: 32px;
  font-size: 1rem;
`;

export const StyledSpan = styled("span")`
  color: #7e57c2;
`;
