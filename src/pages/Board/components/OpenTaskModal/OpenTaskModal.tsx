import { Box, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  boardProjectStateSelector,
  boardTaskItemSelector,
} from "../../selectors/board";
import { AppDispatch } from "../../../../store";
import { boardItemOpenDataFetch } from "../../thunk/board";
import { Modal } from "../../../../components/Modal";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";

type OpenTaskModalProps = {
  onClose: () => void;
};
export const OpenTaskModal: React.FC<OpenTaskModalProps> = ({ onClose }) => {
  const { loading, error, taskData, fetchData } = useSelector(
    boardTaskItemSelector
  );

  const { projectData } = useSelector(boardProjectStateSelector);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(boardItemOpenDataFetch(fetchData));
  }, []);
  return (
    <Modal
      info={true}
      onClose={onClose}
      title={`${projectData?.shortName} - ${taskData?.key}`}
    >
      <Box sx={{ display: "flex" }}>
        <Stack spacing={2} sx={{ maxWidth: 300 }}>
          <Typography variant="h6" color="primary.main">
            {taskData?.title}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Box>
              <Typography color="primary.light" variant="overline">
                Description
              </Typography>
              {taskData?.description && (
                <Typography
                  minWidth={300}
                  sx={{ wordBreak: "break-all" }}
                  variant="subtitle1"
                >
                  {taskData?.description}
                </Typography>
              )}
              {!taskData?.description && (
                <Typography
                  minWidth={300}
                  color="secondary.dark"
                  variant="subtitle1"
                >
                  No description
                </Typography>
              )}
            </Box>
            <Stack minWidth={200}>
              <Stack direction="row" spacing={2}>
                <Typography
                  minWidth={50}
                  color="primary.light"
                  variant="overline"
                >
                  Project:
                </Typography>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Typography color="secondary.dark" variant="subtitle1">
                    {projectData?.name}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography
                  minWidth={50}
                  color="primary.light"
                  variant="overline"
                >
                  Assignee:
                </Typography>
                {taskData?.assignee.length === 0 && (
                  <Typography color="secondary.dark" variant="subtitle1">
                    No assignee
                  </Typography>
                )}
                <Stack>
                  {taskData?.assignee.map((user) => {
                    return (
                      <Tooltip
                        placement="right-end"
                        key={user._id}
                        arrow
                        title={user.email}
                      >
                        <Typography
                          color="secondary.dark"
                          display="inline"
                        >{`${user.firstName} ${user.lastName}`}</Typography>
                      </Tooltip>
                    );
                  })}
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography
                  minWidth={50}
                  color="primary.light"
                  variant="overline"
                >
                  Priority:
                </Typography>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Typography color="secondary.dark" variant="subtitle1">
                    {taskData?.priority}
                  </Typography>
                  <NoiseControlOffIcon
                    sx={{ color: `priority.${taskData?.priority}` }}
                  ></NoiseControlOffIcon>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography
                  minWidth={50}
                  color="primary.light"
                  variant="overline"
                >
                  Status:
                </Typography>
                <Typography color="secondary.dark" variant="subtitle1">
                  {taskData?.statusId}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};
