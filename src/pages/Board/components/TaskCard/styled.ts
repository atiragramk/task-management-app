import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

export const StyledCard = styled(Card)((props) => ({
  width: 220,
  marginBottom: 10,
  borderLeft: "5px solid",
  opacity: props.draggable ? "0.2" : "1",
  cursor: "move",
}));

export const StyledCardHeader = styled(CardHeader)`
  padding: 8px;
`;

export const StyledHeaderWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledHeaderTypography = styled(Typography)`
  padding: 1px 11px;
  border-radius: 7px;
  color: #fff;
  font-weight: 300;
  font-size: 12px;
`;

export const StyledFooterWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const StyledCardContent = styled(CardContent)`
  padding: 8px;
`;

export const StyledFooterTypography = styled(Typography)`
  padding: 0px 7px;
  border-radius: 5px;
  font-size: 14px;
  width: fit-content;
`;

export const StyledAvatar = styled(Avatar)`
  width: 24px;
  height: 24px;
  font-size: 0.8rem;
`;

export const StyledAvatarGroup = styled(AvatarGroup)`
  div:nth-of-type(1) {
    width: 24px;
    height: 24px;
    font-size: 0.8rem;
  }
`;

export const StyledCardActionArea = styled(CardActionArea)`
  &.MuiCardActionArea-focusHighlight {
    background: transparent;
  }
  :focus-visible {
    outline: none;
  }
  &.Mui-focusVisible {
    box-shadow: none;
  }
`;
