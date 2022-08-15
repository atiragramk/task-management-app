import { PayloadAction } from "@reduxjs/toolkit";
import { Modal } from "../../../types";

export const modalOpenToggle = (state: Modal, action: PayloadAction<Modal>) => {
  state.open = !state.open;
  state.name = action.payload?.name;
};
