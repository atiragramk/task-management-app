import {
  Card,
  CardHeader,
  Typography,
  Box,
  IconButton,
  CardContent,
  Avatar,
  AvatarGroup,
  Popover,
  Button,
  Stack,
  CardActionArea,
} from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useState } from "react";
import { SortedTask, Task } from "../../../../types";

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
    <Card
      sx={{
        width: 220,
        marginBottom: "10px",
        borderLeft: "5px solid",
        borderColor: `priority.${data.priority}`,
      }}
    >
      <CardHeader
        sx={{
          padding: "7px 12px",
        }}
        title={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                bgcolor: "primary.light",
                padding: "1px 11px",
                borderRadius: "7px",
                color: "#fff",
                fontWeight: 300,
                fontSize: 12,
              }}
            >
              AW-228
            </Typography>
          </Box>
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
      ></CardHeader>
      <CardContent sx={{ padding: "7px 12px" }}>
        <Typography sx={{ fontWeight: 300 }}>{data.title}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Typography
            sx={{
              bgcolor: `priority.${data.priority}`,
              padding: "1px 11px",
              borderRadius: "7px",
              fontSize: 14,
              width: "fit-content",
            }}
          >
            {data.priority}
          </Typography>
          <AvatarGroup>
            <Avatar sx={{ width: 24, height: 24 }}></Avatar>
            <Avatar sx={{ width: 24, height: 24 }}></Avatar>
          </AvatarGroup>
        </Box>
      </CardContent>
    </Card>
  );
};
