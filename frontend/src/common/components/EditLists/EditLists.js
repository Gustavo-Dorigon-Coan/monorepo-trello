import {ModalStyled} from "../ModalStyled/ModalStyled";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {EDIT_LISTS_TYPE} from "../../reducers/editListsState";
import {ListOfCardsService} from "../../services/ListOfCardsService";
import {FormLabel, Grid, Input} from "@mui/material";
import {HttpStatus} from "../../constants/HttpStatus";
import {genericError} from "../../utils/Functions";
import {SubTitle} from "../SubTitle/SubTitle";
import {ButtonStyled} from "../Button/Button";
import {InputStyled} from "../InputStyled/InputStyled";
import {ColorButton} from "../ColorButton/ColorButton";

export const EditLists = () => {
  const dispatch = useDispatch();
  const { projectId, open } = useSelector(store => store.editListsState);
  const [ lists, setLists ] = useState([]);

  const closeModal = () => {
    dispatch({
      type: EDIT_LISTS_TYPE,
      projectId: null,
      open: false,
    })
  }

  const loadLists = async () => {
    if (projectId) {
      const response = await ListOfCardsService.findByProjectId(projectId);
      if (HttpStatus.isOkRange(response?.status)) {
        setLists(response.data);
      } else {
        genericError(dispatch, response);
      }
    }
  }

  useEffect( () => {
    loadLists();
  },[projectId]);

  return <ModalStyled open={open} closeButton={() => closeModal()}>
    <Grid container spacing={3}>
      <Grid item sm={12}>
        <SubTitle>Editar Listas</SubTitle>
      </Grid>
      {Boolean(lists) && lists.map(list => <Grid item sm={12}>
        <Grid item sm={8}>
          {list.name}
        </Grid>
        <Grid item sm={2}>
          {list.ordem}
        </Grid>
        <Grid item sm={2}>
          <ColorButton initialColor={list.color}/>
        </Grid>
      </ Grid>)}
      <Grid container item sm={12}>
        <Grid item sm={8}>
          <InputStyled>Nome</InputStyled>
        </Grid>
        <Grid item sm={2}>
          Ordem
        </Grid>
        <Grid item sm={2}>
          <ColorButton />
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <ButtonStyled>Adicionar Lista</ButtonStyled>
      </Grid>
    </Grid>
  </ModalStyled>
}