import { Box, Button, LinearProgress, Container } from "@mui/material";
import { TaskListCard } from "./components/TaskListCard";
import { SortingBar } from "./components/SortingBar";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  boardCreateTaskFetch,
  boardDeleteTaskFetch,
  boardListFetch,
  boardStatusListFetch,
  boardUpdateTaskFetch,
  boardUserListFetch,
} from "./thunk/board";
import { AppDispatch } from "../../store";
import * as selectors from "./selectors/board";
import { CreateThunkType, Params, Task } from "../../types";
import {
  boardDeleteItemDataSetAction,
  boardFilterParamsAction,
  boardUpdateItemIdSetAction,
} from "./reducer/board";
import { CreateTaskModal } from "./components/CreateTaskModal";
import {
  MODAL_CREATE_NAME,
  MODAL_UPDATE_NAME,
  MODAL_DELETE_NAME,
  MODAL_MORE_NAME,
} from "./constants";
import { modalOpenToggleAction } from "../../store/modal/reducer/modal";
import { modalStateSelector } from "../../store/modal/selectors/modal";
import { UpdateTaskModal } from "./components/UpdateTaskModal";
import { TransitionGroup } from "react-transition-group";

import { DeleteTaskModal } from "./components/DeleteTaskModal";

const Board = () => {
  const { loading, error, data } = useSelector(selectors.boardStatusSelector);
  const params = useSelector(selectors.boardFilterParams);
  const { open, name } = useSelector(modalStateSelector);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(boardStatusListFetch());
    dispatch(boardListFetch(params));
  }, [params]);

  useEffect(() => {
    dispatch(boardUserListFetch());
  }, []);

  const handleFilter = (param: Partial<Params>) => {
    dispatch(boardFilterParamsAction(param));
  };

  const handleCreateModalOpenToggle = () => {
    dispatch(modalOpenToggleAction({ name: MODAL_CREATE_NAME }));
  };

  const handleUpdateModalOpen = useCallback((id: string) => {
    dispatch(boardUpdateItemIdSetAction({ id }));
    dispatch(modalOpenToggleAction({ name: MODAL_UPDATE_NAME }));
    // eslint-disable-next-line
  }, []);

  const handleUpdateModalClose = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_UPDATE_NAME }));
    // eslint-disable-next-line
  }, []);

  const handleCreateTask = (values: Partial<Task>) => {
    dispatch(boardCreateTaskFetch({ values, params }));
  };

  const handleUpdateTask = (values: Partial<Task>) => {
    dispatch(boardUpdateTaskFetch({ values, params }));
  };

  const handleDeleteModalToggle = useCallback((data: Task) => {
    dispatch(boardDeleteItemDataSetAction(data));
    dispatch(modalOpenToggleAction({ name: MODAL_DELETE_NAME }));
  }, []);

  const handleDeleteTask = (values: Task) => {
    dispatch(boardDeleteTaskFetch({ values, params }));
  };

  return (
    <>
      {loading && !error && data.length === 0 && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Container maxWidth="xl">
        <SortingBar
          onFilter={handleFilter}
          data={data}
          onCreateModalOpen={handleCreateModalOpenToggle}
        />
        <Box sx={{ display: "flex", height: "78vh" }}>
          {!error &&
            data.length > 0 &&
            data.map((status) => {
              return (
                <TaskListCard
                  key={status._id}
                  status={status}
                  onEdit={handleUpdateModalOpen}
                  onDelete={handleDeleteModalToggle}
                />
              );
            })}
          <Box sx={{ width: 220, m: 1 }}>
            <Button fullWidth={true} variant="outlined" startIcon={<AddIcon />}>
              Create column
            </Button>
          </Box>
        </Box>
      </Container>
      {open && name === MODAL_CREATE_NAME && (
        <CreateTaskModal
          onClose={handleCreateModalOpenToggle}
          onConfirm={handleCreateTask}
        />
      )}
      {open && name === MODAL_UPDATE_NAME && (
        <UpdateTaskModal
          onClose={handleUpdateModalClose}
          onConfirm={handleUpdateTask}
        />
      )}
      {open && name === MODAL_DELETE_NAME && (
        <DeleteTaskModal
          onClose={handleDeleteModalToggle}
          onConfirm={handleDeleteTask}
        />
      )}
    </>
  );
};

export default Board;
