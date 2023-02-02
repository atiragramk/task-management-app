import { ReactNode, MouseEventHandler } from "react";
import React from "react";

import { Dialog, DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  StyledDialogContent,
  StyledIconButton,
  StyledTypography,
} from "./styled";

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
  info?: boolean;
  children?: ReactNode;
  formName?: string;
  loading?: boolean;
  onClose: Function;
  onConfirm?: () => void;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const { title, children, onClose, formName, onConfirm, loading, info } =
    props;
  const color = formName ? "primary" : "error";

  return (
    <Dialog
      keepMounted
      TransitionComponent={Transition}
      maxWidth="md"
      open={true}
    >
      {info ? (
        <StyledTypography variant="h6">{title}</StyledTypography>
      ) : (
        <StyledTypography variant="h6">{title}</StyledTypography>
      )}

      <StyledIconButton
        aria-label="close"
        onClick={onClose as MouseEventHandler}
      >
        <CloseIcon />
      </StyledIconButton>

      <StyledDialogContent dividers>{children}</StyledDialogContent>
      {!info && (
        <DialogActions>
          <LoadingButton
            disabled={loading}
            size="small"
            variant="outlined"
            onClick={onClose as MouseEventHandler}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            type="submit"
            color={color}
            disabled={loading}
            form={formName}
            size="small"
            onClick={onConfirm as MouseEventHandler}
            variant="contained"
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      )}
    </Dialog>
  );
};
