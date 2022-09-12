import { combineReducers } from "@reduxjs/toolkit";
import board from "../../pages/Board/reducer/board";
import modal from "../modal/reducer/modal";
import projects from "../../pages/Projects/reducer/projects";
import auth from "../../pages/Auth/reducer/auth";
import register from '../../pages/Register/reducer/register'

export default combineReducers({
  board,
  modal,
  projects,
  auth,
  register
});
