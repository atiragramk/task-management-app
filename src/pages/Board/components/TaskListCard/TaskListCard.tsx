import React, { useState } from "react";
import { SortedTask, Status, Task } from "../../../../types";
import { TaskCard } from "../TaskCard";
import { StyledCard, StyledCardContent } from "./styled";
import {
  CardHeader,
  Typography,
  Box,
  AppBar,
  LinearProgress,
  Collapse,
} from "@mui/material";
import { useSelector } from "react-redux";
import { boardDataSelector, boardLoadingSelector } from "../../selectors/board";
import { TransitionGroup } from "react-transition-group";

type TaskListCardProps = {
  status: Partial<Status>;
  onEdit: (id: string) => void;
  onDelete: (data: Task) => void;
};

const CustomAppbar = (props: {}) => (
  <AppBar position="sticky" color="secondary" {...props} />
);

export const TaskListCard: React.FC<TaskListCardProps> = (props) => {
  const { status, onEdit, onDelete } = props;
  const taskList = useSelector(boardDataSelector);
  const loading = useSelector(boardLoadingSelector);

  const taskCounter = () => {
    if (taskList.some((task) => task._id === status.key)) {
      return taskList.filter((task) => task._id === status.key)[0].count;
    }
    return 0;
  };

  return (
    <StyledCard>
      <CardHeader
        sx={{ padding: "5px" }}
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>
              {status.displayName} ({taskCounter()})
            </Typography>
          </Box>
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
