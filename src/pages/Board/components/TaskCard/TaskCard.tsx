import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useState } from "react";
import { Task } from "../../../../types";
import {
  StyledCard,
  StyledCardHeader,
  StyledFooterWrapper,
  StyledHeaderTypography,
  StyledHeaderWrapper,
  StyledCardContent,
  StyledFooterTypography,
} from "./styled";
import {
  Typography,
  Box,
  IconButton,
  Avatar,
  AvatarGroup,
  Popover,
  Button,
  Stack,
} from "@mui/material";

type TaskCardProps = {
  data: Task;
};

export const TaskCard: React.FC<TaskCardProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { data } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <StyledCard sx={{ borderColor: `priority.${data.priority}` }}>
      <StyledCardHeader
        title={
          <StyledHeaderWrapper>
            <StyledHeaderTypography sx={{ bgcolor: "primary.light" }}>
              AW-228
            </StyledHeaderTypography>
          </StyledHeaderWrapper>
        }
        action={
          <Box>
            <IconButton aria-describedby={id} onClick={handleClick}>
              <MoreVertOutlinedIcon />
            </IconButton>
            <Popover
              open={open}
              id={id}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Stack>
                <Button
                  size="small"
                  startIcon={<FolderOpenIcon fontSize="inherit" />}
                  color="info"
                >
                  Open
                </Button>
                <Button
                  size="small"
                  startIcon={<EditIcon fontSize="inherit" />}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  startIcon={<DeleteForeverIcon fontSize="inherit" />}
                  color="error"
                >
                  Delete
                </Button>
              </Stack>
            </Popover>
          </Box>
        }
      ></StyledCardHeader>
      <StyledCardContent>
        <Typography sx={{ fontWeight: 300, fontSize: 14 }}>
          {data.title}
        </Typography>
        <StyledFooterWrapper>
          <StyledFooterTypography sx={{ bgcolor: `priority.${data.priority}` }}>
            {data.priority}
          </StyledFooterTypography>
          <AvatarGroup>
            <Avatar sx={{ width: 24, height: 24 }}></Avatar>
            <Avatar sx={{ width: 24, height: 24 }}></Avatar>
          </AvatarGroup>
        </StyledFooterWrapper>
      </StyledCardContent>
    </StyledCard>
  );
};
