import { combineReducers } from '@reduxjs/toolkit';
import {projectsState} from "./projectsState";
import {alertState} from "./alertState";
import {projectState} from "./projectState";
import {newCardState} from "./newCardState";

export default combineReducers({
  projectsState,
  alertState,
  projectState,
  newCardState,
});