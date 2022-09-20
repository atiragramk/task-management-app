import { useSelector } from "react-redux";
import { useState } from "react";
import { useDrag } from "react-dnd";

import {
  Typography,
  Box,
  IconButton,
  Avatar,
  Popover,
  Button,
  Stack,
  Tooltip,
} from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { Task, ItemTypes } from "../../../../types";
import {
  StyledCard,
  StyledCardHeader,
  StyledFooterWrapper,
  StyledHeaderTypography,
  StyledHeaderWrapper,
  StyledCardContent,
  StyledFooterTypography,
  StyledAvatar,
  StyledAvatarGroup,
  StyledCardActionArea,
} from "./styled";
import { boardProjectStateSelector } from "../../selectors/board";

type TaskCardProps = {
  data: Task;
  onEdit: (id: string) => void;
  onDelete: (data: Task) => void;
  onOpen: (id: string) => void;
};

export const TaskCard: React.FC<TaskCardProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { data, onEdit, onDelete, onOpen } = props;

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      _id: data._id,
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const { projectData } = useSelector(boardProjectStateSelector);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <StyledCard
      draggable={isDragging}
      ref={drag}
      sx={{ borderColor: `priority.${data.priority}` }}
    >
      <StyledCardHeader
        title={
          <StyledHeaderWrapper>
            <StyledHeaderTypography sx={{ bgcolor: "primary.light" }}>
              {`${projectData?.shortName}-${data.key}`}
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
                  onClick={() => {
                    onOpen(data._id);
                    handleClose();
                  }}
                >
                  Open
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    onEdit(data._id);
                    handleClose();
                  }}
                  startIcon={<EditIcon fontSize="inherit" />}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    onDelete(data);
                    handleClose();
                  }}
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
      <StyledCardActionArea onClick={() => onEdit(data._id)}>
        <StyledCardContent>
          <Typography
            sx={{ fontWeight: 300, fontSize: 14, wordBreak: "break-word" }}
          >
            {data.title}
          </Typography>
          <StyledFooterWrapper>
            <StyledFooterTypography
              sx={{ bgcolor: `priority.${data.priority}` }}
            >
              {data.priority}
            </StyledFooterTypography>
            <StyledAvatarGroup max={3}>
              {data.assignee.length === 0 && (
                <Tooltip arrow title="No assignee">
                  <Avatar sx={{ width: 24, height: 24 }}></Avatar>
                </Tooltip>
              )}
              {data.assignee.map((user) => {
                return (
                  <Tooltip
                    key={user._id}
                    arrow
                    title={`${user.firstName} ${user.lastName}`}
                  >
                    <StyledAvatar
                      key={user._id}
                      sx={{ bgcolor: user.color }}
                    >{`${user.firstName.charAt(0).toUpperCase()}${user.lastName
                      .charAt(0)
                      .toUpperCase()}`}</StyledAvatar>
                  </Tooltip>
                );
              })}
            </StyledAvatarGroup>
          </StyledFooterWrapper>
        </StyledCardContent>
      </StyledCardActionArea>
    </StyledCard>
  );
};
