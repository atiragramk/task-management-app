import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Modal } from "../../../../components/Modal";
import { Status } from "../../../../types";
import { boardDeleteStateSelector } from "../../selectors/board";
import { StyledTypography } from "./styled";

type DeleteTaskModalProps = {
  onClose: () => void;
  onConfirm: (data: Status) => void;
};

export const DeleteStatusModal: React.FC<DeleteTaskModalProps> = ({
  onClose,
  onConfirm,
}) => {
  const { loading, statusData } = useSelector(boardDeleteStateSelector);

  return (
    <Modal
      title="Delete Column"
      onClose={onClose}
      onConfirm={() => onConfirm(statusData!)}
    >
      <StyledTypography variant="h6">
        Are you sure you want to delete{" "}
        {
          <StyledTypography variant="h6" display="inline" color="primary.main">
            {statusData?.displayName}
          </StyledTypography>
        }{" "}
        column ?
      </StyledTypography>
      <Typography>
        The item will be deleted immediately. You can not undo this action.
      </Typography>
    </Modal>
  );
};
