import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

export const StyledBoardWrapper = styled(Box)`
  display: flex;
  min-width: 95vw;
  max-width: fit-content;
  margin: 8px;
  height: 74vh;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #7986cb78;
    border-radius: 5px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #5c6bc0;
  &:hover {
    text-decoration: underline;
  }
`;
