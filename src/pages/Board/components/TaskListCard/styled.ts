import { Card, CardContent, IconButton, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const StyledCard = styled(Card)((props) => ({
  minWidth: 265,
  width: "fit-content",
  marginTop: 10,
  marginRight: 10,
  padding: 0,
  minHeight: "calc(74vh - 100px)",
  backgroundColor: props.draggable ? "#C5CAE9" : "#e8eaf6",
}));

export const StyledCardContent = styled(CardContent)`
  /* overflow-y: auto; */
  /* min-height: fit-content; */
  /* position: relative; */
  /* max-height: 470px; */
  /* border-radius: 5px; */
  /* overflow-x: hidden; */
  /* ::-webkit-scrollbar {
    width: 9px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(149 117 205 / 26%);
    border-radius: 5px;
  } */
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 2px;
  right: 5px;
`;

export const StyledHeader = styled(Typography)`
  border-radius: 5px;
  text-align: center;
  z-index: 200;
  height: 20px;
  /* margin-top: 10px; */
  width: 255px;
  padding: 8px 6px 10px 6px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: #e8eaf6;
`;
