import React, { useState } from "react";
import { ItemTypes, Status, Task } from "../../../../types";
import { TaskCard } from "../TaskCard";
import { StyledCard, StyledHeader, StyledIconButton } from "./styled";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Collapse, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { boardUpdateTaskDrag } from "../../thunk/board";
import {
  boardDataSelector,
  boardFilterParams,
  boardProjectStateSelector,
} from "../../selectors/board";
import { TransitionGroup } from "react-transition-group";
import { useDrop } from "react-dnd";
import { AppDispatch } from "../../../../store";

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
  const { loading } = useSelector(boardProjectStateSelector);
  const params = useSelector(boardFilterParams);

  const [show, setShow] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: Partial<Task>, monitor) => {
      const data = { _id: item?._id, statusId: status.key };

      dispatch(boardUpdateTaskDrag({ data, params }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const taskCounter = () => {
    if (taskList.some((task) => task._id === status.key)) {
      return taskList.filter((task) => task._id === status.key)[0].count;
    }
    return 0;
  };

  return (
    <>
      {!loading && (
        <Box>
          <StyledHeader
            onMouseOver={() => setShow(true)}
            onMouseOut={() => setShow(false)}
            onClick={() => setShow(false)}
          >
            {status.displayName} ({taskCounter()})
            {show && (
              <StyledIconButton
                onClick={() => onStatusDelete(status)}
                size="small"
              >
                <DeleteForeverIcon />
              </StyledIconButton>
            )}
          </StyledHeader>
          <StyledCard draggable={isOver} ref={drop}>
            <CardContent>
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
            </CardContent>
          </StyledCard>
        </Box>
      )}
    </>
  );
};
