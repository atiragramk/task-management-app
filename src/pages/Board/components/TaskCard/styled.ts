import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const StyledCard = styled(Card)`
  width: 220px;
  margin-bottom: 10px;
  border-left: 5px solid;
`;

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
  padding: 1px 11px;
  border-radius: 7px;
  font-size: 14px;
  width: fit-content;
`;
