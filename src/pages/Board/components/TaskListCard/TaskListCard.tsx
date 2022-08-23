import React, { useState } from "react";
import { SortedTask, Status, Task } from "../../../../types";
import { TaskCard } from "../TaskCard";
import { StyledCard, StyledCardContent, StyledIconButton } from "./styled";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import {
  CardHeader,
  Typography,
  Box,
  AppBar,
  LinearProgress,
  Collapse,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { boardDataSelector, boardLoadingSelector } from "../../selectors/board";
import { TransitionGroup } from "react-transition-group";

type TaskListCardProps = {
  status: Status;
  onEdit: (id: string) => void;
  onDelete: (data: Task) => void;
  onStatusDelete: (data: Status) => void;
  onOpen: (id: string) => void;
};

export const TaskListCard: React.FC<TaskListCardProps> = (props) => {
  const { status, onEdit, onDelete, onStatusDelete, onOpen } = props;
  const taskList = useSelector(boardDataSelector);
  const loading = useSelector(boardLoadingSelector);
  const [show, setShow] = useState(false);

  const taskCounter = () => {
    if (taskList.some((task) => task._id === status.key)) {
      return taskList.filter((task) => task._id === status.key)[0].count;
    }
    return 0;
  };
  const CustomAppbar = (props: {}) => (
    <AppBar
      position="sticky"
      color="secondary"
      sx={{ height: 40 }}
      {...props}
    />
  );
  return (
    <StyledCard>
      <CardHeader
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
        onClick={() => setShow(false)}
        sx={{ padding: "5px" }}
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>
              {status.displayName} ({taskCounter()})
            </Typography>
          </Box>
        }
        action={
          show && (
            <StyledIconButton
              onClick={() => onStatusDelete(status)}
              size="small"
            >
              <DeleteForeverIcon />
            </StyledIconButton>
          )
        }
        component={CustomAppbar}
      />
      <StyledCardContent>
        {/* {loading && <LinearProgress />} */}
        <TransitionGroup>
          {taskList.map((task) => {
            if (task._id === status.key) {
              return task.records.map((record) => {
                return (
                  <Collapse>
                    <TaskCard
                      key={record._id}
                      data={record}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onOpen={onOpen}
                    />
                  </Collapse>
                );
              });
            }
          })}
        </TransitionGroup>
      </StyledCardContent>
    </StyledCard>
  );
};
