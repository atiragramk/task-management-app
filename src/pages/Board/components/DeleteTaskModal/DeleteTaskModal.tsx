import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Modal } from "../../../../components/Modal";
import { Task } from "../../../../types";
import { boardDeleteStateSelector } from "../../selectors/board";
import { StyledTypography } from "./styled";

type DeleteTaskModalProps = {
  onClose: (data: Task) => void;
  onConfirm: (data: Task) => void;
};

export const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  onClose,
  onConfirm,
}) => {
  const { loading, taskData } = useSelector(boardDeleteStateSelector);
  return (
    <Modal
      onClose={onClose}
      onConfirm={() => onConfirm(taskData!)}
      title="Delete Task"
      loading={loading}
    >
      <StyledTypography variant="h6">
        Are you sure you want to delete{" "}
        {
          <StyledTypography variant="h6" display="inline" color="primary.main">
            {taskData?.title}
          </StyledTypography>
        }{" "}
        task ?
      </StyledTypography>
      <Typography>
        The item will be deleted immediately. You can not undo this action.
      </Typography>
    </Modal>
  );
};
