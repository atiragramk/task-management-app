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
import Slide from "@mui/material/Slide";

import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide ref={ref} {...props} />;
});

type ModalProps = {
  title: string;
  children?: ReactNode;
  formName?: string;
  loading?: boolean;
  onClose: Function;
  onConfirm?: () => void;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const { title, children, onClose, formName, onConfirm, loading } = props;
  const color = formName ? "primary" : "error";
  return (
    <Dialog
      keepMounted
      TransitionComponent={Transition}
      maxWidth="xl"
      open={true}
    >
      <Typography variant="h5" sx={{ minWidth: 550, p: 3 }}>
        {title}
      </Typography>

      <IconButton
        aria-label="close"
        onClick={onClose as MouseEventHandler}
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
          onClick={onClose as MouseEventHandler}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          type="submit"
          loading={loading}
          color={color}
          form={formName}
          size="small"
          onClick={onConfirm as MouseEventHandler}
          variant="contained"
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
