import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledBoardWrapper = styled(Box)`
  display: flex;
  min-width: 95vw;
  max-width: fit-content;
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
