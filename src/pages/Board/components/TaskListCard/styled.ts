import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";

export const StyledCard = styled(Card)`
  min-width: 265px;
  width: fit-content;
  margin: 8px;
  padding: 8px;
  height: fit-content;
  background-color: #e8eaf6;
  padding: 0;
  overflow: hidden;
`;

export const StyledCardContent = styled(CardContent)`
  overflow-y: auto;
  min-height: 100px;
  max-height: 470px;
  height: fit-content;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 9px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(149 117 205 / 26%);
    border-radius: 5px;
  }
`;
