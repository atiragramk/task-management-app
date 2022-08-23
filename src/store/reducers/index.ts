import { combineReducers } from "@reduxjs/toolkit";
import board from "../../pages/Board/reducer/board";
import modal from "../modal/reducer/modal";
import projects from "../../pages/Projects/reducer/projects";

export default combineReducers({
  board,
  modal,
  projects,
});
