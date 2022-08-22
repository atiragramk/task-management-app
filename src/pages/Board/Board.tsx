import {
  Box,
  Button,
  LinearProgress,
  Container,
  Collapse,
} from "@mui/material";
import { TaskListCard } from "./components/TaskListCard";
import { SortingBar } from "./components/SortingBar";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  boardCreateStatusFetch,
  boardCreateTaskFetch,
  boardDeleteStatusFetch,
  boardDeleteTaskFetch,
  boardListFetch,
  boardStatusListFetch,
  boardUpdateTaskFetch,
  boardUserListFetch,
} from "./thunk/board";
import { AppDispatch } from "../../store";
import * as selectors from "./selectors/board";
import { CreateThunkType, Params, Status, Task } from "../../types";
import {
  boardDeleteItemDataSetAction,
  boardDeleteStatusDataSetAction,
  boardFilterParamsResetAction,
  boardFilterParamsSetAction,
  boardUpdateItemIdSetAction,
} from "./reducer/board";
import { CreateTaskModal } from "./components/CreateTaskModal";
import {
  MODAL_CREATE_NAME,
  MODAL_UPDATE_NAME,
  MODAL_DELETE_NAME,
  MODAL_MORE_NAME,
  MODAL_STATUS_DELETE_NAME,
  MODAL_STATUS_CREATE_NAME,
} from "./constants";
import { modalOpenToggleAction } from "../../store/modal/reducer/modal";
import { modalStateSelector } from "../../store/modal/selectors/modal";
import { UpdateTaskModal } from "./components/UpdateTaskModal";
import { TransitionGroup } from "react-transition-group";

import { DeleteTaskModal } from "./components/DeleteTaskModal";
import { DeleteStatusModal } from "./components/DeleteStatusModal";
import { CreateStatusModal } from "./components/CreateStatusModal";

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
    dispatch(boardFilterParamsSetAction(param));
  };

  const handleFilterReset = () => {
    dispatch(boardFilterParamsResetAction());
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

  const handleDeleteModalOpen = useCallback((data: Task) => {
    dispatch(boardDeleteItemDataSetAction(data));
    dispatch(modalOpenToggleAction({ name: MODAL_DELETE_NAME }));
  }, []);

  const handleDeleteModalClose = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_DELETE_NAME }));
    // eslint-disable-next-line
  }, []);

  const handleDeleteTask = (values: Task) => {
    dispatch(boardDeleteTaskFetch({ values, params }));
  };

  const handleDeleteStatusModalOpen = useCallback((data: Status) => {
    dispatch(boardDeleteStatusDataSetAction(data));
    dispatch(modalOpenToggleAction({ name: MODAL_STATUS_DELETE_NAME }));
  }, []);

  const handleDeleteStatusModalClose = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_STATUS_DELETE_NAME }));
    // eslint-disable-next-line
  }, []);

  const handleDeleteStatus = (values: Status) => {
    dispatch(boardDeleteStatusFetch(values));
  };

  const handleCreateStatusModalToogle = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_STATUS_CREATE_NAME }));
  }, []);

  const handleCreateStatus = (data: Partial<Status>) => {
    dispatch(boardCreateStatusFetch(data));
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
          onReset={handleFilterReset}
          data={data}
          onCreateModalOpen={handleCreateModalOpenToggle}
        />
        <Box sx={{ display: "flex", height: "78vh", overflowX: "auto" }}>
          {!error && data.length > 0 && (
            <TransitionGroup style={{ display: "flex" }}>
              {data.map((status) => {
                return (
                  <Collapse key={status._id} orientation="horizontal">
                    <TaskListCard
                      status={status}
                      onEdit={handleUpdateModalOpen}
                      onDelete={handleDeleteModalOpen}
                      onStatusDelete={handleDeleteStatusModalOpen}
                    />
                  </Collapse>
                );
              })}
            </TransitionGroup>
          )}
          <Box sx={{ width: 220, m: 1 }}>
            <Button
              sx={{ width: 200 }}
              fullWidth={true}
              onClick={handleCreateStatusModalToogle}
              variant="outlined"
              startIcon={<AddIcon />}
            >
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
          onClose={handleDeleteModalClose}
          onConfirm={handleDeleteTask}
        />
      )}
      {open && name === MODAL_STATUS_DELETE_NAME && (
        <DeleteStatusModal
          onClose={handleDeleteStatusModalClose}
          onConfirm={handleDeleteStatus}
        />
      )}
      {open && name === MODAL_STATUS_CREATE_NAME && (
        <CreateStatusModal
          onClose={handleCreateStatusModalToogle}
          onConfirm={handleCreateStatus}
        />
      )}
    </>
  );
};

export default Board;
