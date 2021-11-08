import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {ProjectService} from "../../common/services/ProjectService";
import {HttpStatus} from "../../common/constants/HttpStatus";
import {genericError} from "../../common/utils/Functions";
import {Header} from "./Header/Header";
import {AppTitlePage} from "../../common/constants/Constants";
import {ListContainer} from "./ListContainer/ListContainer";
import {List} from "./List/List";
import {RestrictArea} from "../../common/components/RestrictArea/RestrictArea";
import {useDispatch, useSelector} from "react-redux";
import {PROJECT_TYPE} from "../../common/reducers/projectState";
import {NewCard} from "../../common/components/NewCard/NewCard";

export const loadProject = async (dispatch, id) => {
  const response = await ProjectService.findById(id);
  if (HttpStatus.isOkRange(response?.status)) {
    dispatch({
      type: PROJECT_TYPE,
      project: response.data,
      id: id,
    })
  } else {
    genericError(dispatch, response);
  }
}

export const Project = () => {
  const { id } = useParams();
  const { project } = useSelector(store => store.projectState);
  const dispatch = useDispatch();
  let ctrlIsPressed = false;

  document.title = AppTitlePage + 'Projeto';

  useEffect(() => {
    loadProject(dispatch, id);
  },[]);

  document.onkeydown = function(evt) {
    if (evt.keyCode === 16) {
      ctrlIsPressed = true;
    }
  };

  document.onkeyup = function(evt) {
    if (evt.keyCode === 16) {
      ctrlIsPressed = false;
    }
  };

  const horizontalScroll = (event) => {
    if (ctrlIsPressed) {
      const delta = Math.max(-2, Math.min(1, (event.nativeEvent.wheelDelta || -event.nativeEvent.detail)));
      event.currentTarget.scrollLeft -= (delta * 10);
    }
  }

  return (
    <RestrictArea>
      <Header title={project?.name} />
      <ListContainer onWheel={horizontalScroll}>
        {Boolean(project?.listOfCards) && project?.listOfCards.map(listOfCard =>
          <List list={listOfCard} />)}
      </ListContainer>
    </RestrictArea>
  );
};