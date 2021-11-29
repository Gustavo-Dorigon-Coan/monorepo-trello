import React, {useEffect, useState} from 'react';
import Card from "../Card/Card";
import {Button, Fade, Tooltip} from "@mui/material";
import {Add} from "@mui/icons-material";
import {NewCard} from "../../../common/components/NewCard/NewCard";
import {useDispatch, useSelector} from "react-redux";
import {PROJECT_TYPE} from "../../../common/reducers/projectState";
import {DropList, GhostCard, Header, ListStyled, Title} from "./styled";
import {NEW_CARD_TYPE} from "../../../common/reducers/newCardState";

export const List = ({list}) => {
  const [ openGhostCard, setOpenGhostCard ] = useState(false);
  const { listDropId, actualListDropId }= useSelector(store => store.projectState);
  const dispatch = useDispatch();

  const setListDrop = () => {
    dispatch({
      type: PROJECT_TYPE,
      listDropId: list.id
    })
  };

  const controllerGhostCard = () => {
    if (listDropId !== actualListDropId && listDropId === list.id) {
      setOpenGhostCard(true);
    } else {
      setOpenGhostCard(false);
    }
  }

  const openNewCard = () => {
    dispatch({
      type: NEW_CARD_TYPE,
      open: true,
      list: list,
    })
  }

  useEffect(() => {
    controllerGhostCard();
  },[listDropId, actualListDropId]);

  return (
    <ListStyled onDragOver={() => setListDrop()}>
      <Header color={list.color}>
        <Title color={list.color}>{list.name}</Title>
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title={'Criar nova tarefa'}
          placement="top">
          <Button size={"small"} color={"success"} onClick={() => openNewCard()}><Add/></Button>
        </Tooltip>
      </Header>
      <DropList>
        {Boolean(list.cards) && list.cards.map(card => <Card {...{list,card}} />)}
        <GhostCard open={openGhostCard} />
      </DropList>
    </ListStyled>
  );
};