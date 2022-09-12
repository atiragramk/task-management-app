import { Container, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)`
  padding: 20px 0;
`;

export const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
  height: 450px;
`;

export const StyledLink = styled(Link)`
    text-transform: uppercase;
    text-decoration: none;
    color: '#9575CD'
`
