import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { TransitionGroup } from "react-transition-group";
import { Link, useParams } from "react-router-dom";

import {
  Box,
  Button,
  LinearProgress,
  Container,
  Collapse,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TaskListCard } from "./components/TaskListCard";
import { SortingBar } from "./components/SortingBar";
import {
  boardStatusListFetch,
  boardCreateStatusFetch,
  boardCreateTaskFetch,
  boardDeleteStatusFetch,
  boardDeleteTaskFetch,
  boardListFetch,
  boardProjectDataFetch,
  boardUpdateTaskFetch,
  boardUserListFetch,
} from "./thunk/board";
import { AppDispatch } from "../../store";
import * as selectors from "./selectors/board";
import { Params, Status, Task } from "../../types";
import {
  boardDeleteItemDataSetAction,
  boardDeleteStatusDataSetAction,
  boardFilterParamsResetAction,
  boardFilterParamsSetAction,
  boardItemIdSetAction,
  boardUpdateItemIdSetAction,
} from "./reducer/board";
import { CreateTaskModal } from "./components/CreateTaskModal";
import {
  MODAL_CREATE_NAME,
  MODAL_UPDATE_NAME,
  MODAL_DELETE_NAME,
  MODAL_OPEN_TASK_NAME,
  MODAL_STATUS_DELETE_NAME,
  MODAL_STATUS_CREATE_NAME,
} from "./constants";
import { modalOpenToggleAction } from "../../store/modal/reducer/modal";
import { modalStateSelector } from "../../store/modal/selectors/modal";
import { UpdateTaskModal } from "./components/UpdateTaskModal";

import { DeleteTaskModal } from "./components/DeleteTaskModal";
import { DeleteStatusModal } from "./components/DeleteStatusModal";
import { CreateStatusModal } from "./components/CreateStatusModal";
import { OpenTaskModal } from "./components/OpenTaskModal";
import { StyledBoardWrapper } from "./styled";

const Board = () => {
  const { loading, error, data } = useSelector(selectors.boardStatusSelector);
  const params = useSelector(selectors.boardFilterParams);
  const { open, name } = useSelector(modalStateSelector);
  const { routeId } = useParams();
  const { projectData } = useSelector(selectors.boardProjectStateSelector);

  const dispatch: AppDispatch = useDispatch();

  useEffect((): (() => void) => {
    dispatch(boardProjectDataFetch({ id: routeId! }));
    dispatch(boardFilterParamsSetAction({ projectId: routeId }));
    dispatch(boardUserListFetch());
    return () => dispatch(boardFilterParamsSetAction({ projectId: "" }));
  }, []);

  useEffect(() => {
    if (params.projectId) {
      dispatch(boardStatusListFetch());
      dispatch(boardListFetch(params));
    }
  }, [params]);

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
    const data = { ...values, projectId: projectData?._id };
    dispatch(boardCreateTaskFetch({ data, params }));
  };

  const handleUpdateTask = (data: Partial<Task>) => {
    dispatch(boardUpdateTaskFetch({ data, params }));
  };

  const handleDeleteModalOpen = useCallback((data: Task) => {
    dispatch(boardDeleteItemDataSetAction(data));
    dispatch(modalOpenToggleAction({ name: MODAL_DELETE_NAME }));
  }, []);

  const handleDeleteModalClose = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_DELETE_NAME }));
    // eslint-disable-next-line
  }, []);

  const handleDeleteTask = (data: Task) => {
    dispatch(boardDeleteTaskFetch({ data, params }));
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

  const handleOpenTaskModalOpen = useCallback((id: string) => {
    dispatch(boardItemIdSetAction(id));
    dispatch(modalOpenToggleAction({ name: MODAL_OPEN_TASK_NAME }));
  }, []);

  const handleOpenTaskModalClose = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_OPEN_TASK_NAME }));
  }, []);

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
        <Box sx={{ m: 2 }}>
          <Typography color="info.main" variant="subtitle1">
            <Link to="/projects">Projects </Link> / {projectData?.name}
          </Typography>
        </Box>
        <StyledBoardWrapper>
          {!error && data.length > 0 && (
            <TransitionGroup style={{ display: "flex" }}>
              {data.map((status) => {
                return (
                  <Collapse key={status._id} orientation="horizontal">
                    <TaskListCard
                      status={status}
                      onEdit={handleUpdateModalOpen}
                      onDelete={handleDeleteModalOpen}
                      onOpen={handleOpenTaskModalOpen}
                      onStatusDelete={handleDeleteStatusModalOpen}
                    />
                  </Collapse>
                );
              })}
            </TransitionGroup>
          )}
          <Box sx={{ width: 220, ml: 1 }}>
            <Button
              sx={{ width: 200, position: "sticky", top: 0 }}
              fullWidth={true}
              onClick={handleCreateStatusModalToogle}
              variant="outlined"
              startIcon={<AddIcon />}
            >
              Create column
            </Button>
          </Box>
        </StyledBoardWrapper>
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
      {open && name === MODAL_OPEN_TASK_NAME && (
        <OpenTaskModal onClose={handleOpenTaskModalClose} />
      )}
    </>
  );
};

export default Board;
