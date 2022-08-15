import { combineReducers } from "@reduxjs/toolkit";
import board from "../../pages/Board/reducer/board";
import modal from "../modal/reducer/modal";

export default combineReducers({
  board,
  modal,
});
