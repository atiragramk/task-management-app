import { Avatar, AvatarGroup } from "@mui/material";
import { styled } from "@mui/system";

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
