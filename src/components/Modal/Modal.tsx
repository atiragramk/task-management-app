import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode, MouseEventHandler } from "react";
import { Task } from "../../types";

type ModalProps = {
  title: string;
  children?: ReactNode;
  formName?: string;
  loading: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const { title, children, onClose, formName, onConfirm, loading } = props;
  return (
    <Dialog maxWidth="xl" open={true}>
      <Typography variant="h5" sx={{ minWidth: 550, p: 3 }}>
        {title}
      </Typography>

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 21,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers sx={{ paddingTop: " 20px !important" }}>
        {children}
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={loading}
          size="small"
          variant="outlined"
          onClick={onClose}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          type="submit"
          loading={loading}
          form={formName}
          size="small"
          onClick={onConfirm}
          variant="contained"
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
