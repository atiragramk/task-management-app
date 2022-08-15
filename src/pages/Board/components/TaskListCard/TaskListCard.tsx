import React from "react";
import { SortedTask, Status } from "../../../../types";
import { TaskCard } from "../TaskCard";
import { StyledCard } from "./styled";
import {
  CardHeader,
  Typography,
  Box,
  CardContent,
  AppBar,
} from "@mui/material";

type TaskListCardProps = {
  status: Partial<Status>;
  taskList: SortedTask[];
};

export const TaskListCard: React.FC<TaskListCardProps> = (props) => {
  const { status, taskList } = props;
  const count = taskList.filter((task) => task._id === status.key)[0].records
    .length;

  const CustomAppbar = (props: any) => (
    <AppBar position="sticky" color="secondary" {...props} />
  );
  return (
    <StyledCard>
      <CardHeader
        sx={{ padding: "7px" }}
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>
              {status.displayName} ({count})
            </Typography>
          </Box>
        }
        component={CustomAppbar}
      />
      <CardContent sx={{ padding: "7px" }}>
        {taskList.map((task) => {
          if (task._id === status.key) {
            return task.records.map((record) => {
              return <TaskCard key={record._id} data={record} />;
            });
          }
        })}
      </CardContent>
    </StyledCard>
  );
};
