import React, { useState } from "react";
import { SortedTask, Status } from "../../../../types";
import { TaskCard } from "../TaskCard";
import { StyledCard, StyledCardContent } from "./styled";
import { CardHeader, Typography, Box, AppBar } from "@mui/material";

type TaskListCardProps = {
  status: Partial<Status>;
  taskList: SortedTask[];
};

const CustomAppbar = (props: {}) => (
  <AppBar position="sticky" color="secondary" {...props} />
);
export const TaskListCard: React.FC<TaskListCardProps> = (props) => {
  const { status, taskList } = props;
  // const loading = useSelector(selectors.boardLoadingSelector);
  // const count = taskList.filter((task) => task._id === status.key);
  return (
    <StyledCard>
      <CardHeader
        sx={{ padding: "5px" }}
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{status.displayName} (count)</Typography>
          </Box>
        }
        component={CustomAppbar}
      />
      <StyledCardContent>
        {taskList.map((task) => {
          if (task._id === status.key) {
            return task.records.map((record) => {
              return <TaskCard key={record._id} data={record} />;
            });
          }
        })}
      </StyledCardContent>
    </StyledCard>
  );
};
