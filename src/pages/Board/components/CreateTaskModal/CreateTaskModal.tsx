import { useSelector } from "react-redux";
import { Modal } from "../../../../components/Modal";
import { Status, Task } from "../../../../types";
import {
  boardCreateStateSelector,
  boardStatusSelector,
} from "../../selectors/board";
import { TaskForm } from "../TaskForm";

type CreateTaskModalProps = {
  onClose: () => void;
  onConfirm: (values: Partial<Task>) => void;
};

export const CreateTaskModal: React.FC<CreateTaskModalProps> = (props) => {
  const { onClose, onConfirm } = props;
  const { data } = useSelector(boardStatusSelector);
  const { loading } = useSelector(boardCreateStateSelector);
  return (
    <Modal
      formName="create"
      onClose={onClose}
      title="Create Task"
      loading={loading}
    >
      <TaskForm statusList={data} name="create" onConfirm={onConfirm} />
    </Modal>
  );
};
