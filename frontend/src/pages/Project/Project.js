import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {ProjectService} from "../../common/services/ProjectService";
import {HttpStatus} from "../../common/constants/HttpStatus";
import {genericError, horizontalScroll} from "../../common/utils/Functions";
import {Header} from "./Header/Header";
import {AppTitlePage} from "../../common/constants/Constants";
import {ListContainer} from "./ListContainer/ListContainer";
import {List} from "./List/List";
import {RestrictArea} from "../../common/components/RestrictArea/RestrictArea";
import {useDispatch, useSelector} from "react-redux";
import {PROJECT_TYPE} from "../../common/reducers/projectState";

export const loadProject = async (dispatch, id) => {
  const response = await ProjectService.findById(id);
  if (HttpStatus.isOkRange(response?.status)) {
    const listOfCardsOrderByOrder = response?.data?.listOfCards.sort((listA, listB) => {
      if (listA.order < listB.order) {
        return -1;
      }
      return 1;
    })
    const project = {
      ...response?.data,
      listOfCards: listOfCardsOrderByOrder
    }
    dispatch({
      type: PROJECT_TYPE,
      project: project,
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

  return (
    <RestrictArea>
      <Header project={project} />
      <ListContainer onWheel={event => horizontalScroll(event, ctrlIsPressed)}>
        {Boolean(project?.listOfCards) && project?.listOfCards.map(listOfCard =>
          <List list={listOfCard} />)}
      </ListContainer>
    </RestrictArea>
  );
};