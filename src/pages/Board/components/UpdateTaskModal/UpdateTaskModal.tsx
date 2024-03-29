import { LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../../components/Modal";
import { AppDispatch } from "../../../../store";
import { Task } from "../../../../types";
import {
  boardStatusSelector,
  boardUpdateStateSelector,
} from "../../selectors/board";
import { boardItemUpdateDataFetch } from "../../thunk/board";
import { TaskForm } from "../TaskForm";

type UpdateTaskModalProps = {
  onClose: (id: string) => void;
  onConfirm: (values: Partial<Task>) => void;
};

export const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
  onClose,
  onConfirm,
}) => {
  const { data } = useSelector(boardStatusSelector);
  const { fetchData, taskData, loading } = useSelector(
    boardUpdateStateSelector
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(boardItemUpdateDataFetch(fetchData));
  }, [dispatch, fetchData]);

  return (
    <Modal
      onClose={onClose}
      formName="update"
      loading={loading}
      title="Update Task"
    >
      {loading && <LinearProgress />}
      {!loading && (
        <TaskForm
          loading={loading}
          statusList={data}
          name="update"
          onConfirm={onConfirm}
          taskData={taskData}
        />
      )}
    </Modal>
  );
};
