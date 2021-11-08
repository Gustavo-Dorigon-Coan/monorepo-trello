import React from 'react';
import {CardService} from "../../../common/services/CardService";
import {HttpStatus} from "../../../common/constants/HttpStatus";
import {loadProject} from "../Project";
import {useDispatch, useSelector} from "react-redux";
import {PROJECT_TYPE} from "../../../common/reducers/projectState";
import {CardStyled, Description, Title} from "./styled";

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
    }
  }

  return (
    <CardStyled
      draggable={true}
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