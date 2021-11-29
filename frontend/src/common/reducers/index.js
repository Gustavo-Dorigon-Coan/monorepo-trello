import { combineReducers } from '@reduxjs/toolkit';
import {projectsState} from "./projectsState";
import {alertState} from "./alertState";
import {projectState} from "./projectState";
import {newCardState} from "./newCardState";
import {editListsState} from "./editListsState";
import {editCardState} from "./EditCardState";

export default combineReducers({
  projectsState,
  alertState,
  projectState,
  newCardState,
  editListsState,
  editCardState,
});