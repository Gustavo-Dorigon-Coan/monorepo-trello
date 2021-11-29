import React from 'react';
import {CardService} from "../../../common/services/CardService";
import {HttpStatus} from "../../../common/constants/HttpStatus";
import {loadProject} from "../Project";
import {useDispatch, useSelector} from "react-redux";
import {PROJECT_TYPE} from "../../../common/reducers/projectState";
import {CardStyled, Description, Title} from "./styled";
import {EDIT_CARD_TYPE} from "../../../common/reducers/EditCardState";
import {loadProjects} from "../../Home/Projects/Projects";

const Card = ({list, card}) => {
  const dispatch = useDispatch();
  const { id, listDropId }= useSelector(store => store.projectState);
  let mouseIsPressed = false;

  const getDescription = () => {
    if (card?.description.length > 25) {
      return card?.description.substring(0,25) + '...';
    }
    return card?.description;
  }

  function setActualListDropId(id) {
    mouseIsPressed && dispatch({type: PROJECT_TYPE, actualListDropId: id})
  }

  const setNextList = async () => {
    const response = await CardService.setNextList(card.id, {id: listDropId});
    if (HttpStatus.isOkRange(response?.status)) {
      dispatch({type: PROJECT_TYPE, actualListDropId: listDropId})
      loadProject(dispatch, id);
      loadProjects(dispatch);
    }
  }

  const openCard = () => {
    dispatch({
      type: EDIT_CARD_TYPE,
      card: {...card, listOfCards: {id: list.id}},
      open: true,
    })
  }

  return (
    <CardStyled
      draggable={true}
      onClick={() => openCard()}
      onMouseMove={() => setActualListDropId(list.id)}
      onMouseDown={() => (mouseIsPressed = true)}
      onMouseUp={() => (mouseIsPressed = false)}
      onDragEnd={() => setNextList()}
    >
      <Title>{card?.title}</Title>
      <Description>{getDescription()}</Description>
    </CardStyled>
  );
};

export default Card;