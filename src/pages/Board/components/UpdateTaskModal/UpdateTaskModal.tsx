import { Backdrop, LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../../components/Modal";
import { AppDispatch } from "../../../../store";
import { Task } from "../../../../types";
import { boardUpdateItemIdSetAction } from "../../reducer/board";
import {
  boardStatusSelector,
  boardUpdateStateSelector,
} from "../../selectors/board";
import { bookItemUpdateDataFetch } from "../../thunk/board";
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
    dispatch(bookItemUpdateDataFetch(fetchData));
  }, []);

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
          statusList={data}
          name="update"
          onConfirm={onConfirm}
          taskData={taskData}
        />
      )}
    </Modal>
  );
};
