import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  color: #7e57c2;
  &:hover {
    text-decoration: underline;
  }
`;
