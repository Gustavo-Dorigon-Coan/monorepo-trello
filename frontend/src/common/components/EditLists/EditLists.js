import {ModalStyled} from "../ModalStyled/ModalStyled";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {EDIT_LISTS_TYPE} from "../../reducers/editListsState";
import {ListOfCardsService} from "../../services/ListOfCardsService";
import {Button, Grid} from "@mui/material";
import {HttpStatus} from "../../constants/HttpStatus";
import {genericError, verifyErrors} from "../../utils/Functions";
import {SubTitle} from "../SubTitle/SubTitle";
import {ButtonStyled} from "../Button/Button";
import {InputStyled} from "../InputStyled/InputStyled";
import {ColorButton} from "../ColorButton/ColorButton";
import {loadProject} from "../../../pages/Project/Project";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {ContainerLists} from "./styled";
import CloseIcon from "@mui/icons-material/Close";

export const EditLists = () => {
  const dispatch = useDispatch();
  const { projectId, open } = useSelector(store => store.editListsState);
  const [ errors, setErrors] = useState({name: true});
  const [ lists, setLists ] = useState([]);
  const [ wasSubmitted, setWasSubmitted] = useState(false);
  let initialList = {color: '#fff', project: { id: projectId }};
  const [ list, setList ] = useState(initialList);
  const [ openNew, setOpenNew ] = useState(false);

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
        const orderByOrder = response?.data.sort((listA, listB) => {
          if (listA.order < listB.order) {
            return -1;
          }
          return 1;
        })
        setLists(orderByOrder);
      } else {
        genericError(dispatch, response);
      }
    }
  }

  useEffect( () => {
    loadLists();
    setList({...list, project: { id: projectId }})
  },[projectId]);

  const changeColor = async (id, color) => {
    if (color) {
      const response = await ListOfCardsService.changeColor(id, color);
      if (HttpStatus.isOkRange(response?.status)) {
        loadProject(dispatch, projectId);
      } else {
        genericError(dispatch, response);
      }
    }
  }

  const orderUp = async (list) => {
    if (list && list.order >= 1) {
      const response = await ListOfCardsService.orderUp(list.id);
      if (HttpStatus.isOkRange(response?.status)) {
        loadLists();
        loadProject(dispatch, projectId);
      } else {
        genericError(dispatch, response);
      }
    }
  }

  const remove = async (list) => {
    if (list) {
      const response = await ListOfCardsService.remove(list.id);
      if (HttpStatus.isOkRange(response?.status)) {
        loadLists();
        loadProject(dispatch, projectId);
      } else {
        genericError(dispatch, response);
      }
    }
  }

  const orderDown = async (list) => {
    if (list) {
      const response = await ListOfCardsService.orderDown(list.id);
      if (HttpStatus.isOkRange(response?.status)) {
        loadLists();
        loadProject(dispatch, projectId);
      } else {
        genericError(dispatch, response);
      }
    }
  }

  const save = async () => {
    setWasSubmitted(true);
    if (verifyErrors(errors)) {
      const response = await ListOfCardsService.save(list);
      if (HttpStatus.isOkRange(response?.status)) {
        loadLists();
        loadProject(dispatch, projectId);
        setOpenNew(false)
        setList(initialList);
      } else {
        genericError(dispatch, response);
      }
    }
  }

  return <ModalStyled height={'500px'} open={open} closeButton={() => closeModal()}>
    <Grid container spacing={3}>
      <Grid item sm={12}>
        <SubTitle>Editar Listas</SubTitle>
      </Grid>
      <Grid container item sm={12}>
        <Grid item sm={8}>
          Nome
        </Grid>
        <Grid item sm={2}>
          Ordem
        </Grid>
        <Grid item sm={2}>
        </Grid>
      </Grid>
      <Grid container item sm={12}>
        <ContainerLists>
          {Boolean(lists) && lists.map(list => <Grid container item height={'65px'} sm={12}>
            <Grid item sm={8} display={'flex'} alignItems={"center"}>
              {list.name}
            </Grid>
            <Grid item sm={2} display={'flex'} justifyContent={"center"} direction={'column'} alignItems={'flex-start'}>
              <ButtonStyled width={'12px'} height={'20px'} onClick={() => orderUp(list)}><ArrowDropUpIcon /></ButtonStyled>
              <ButtonStyled mt={'6px'} width={'12px'} height={'20px'} onClick={() => orderDown(list)}><ArrowDropDownIcon /></ButtonStyled>
            </Grid>
            <Grid item sm={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <ColorButton onChange={(color) => changeColor(list.id, color)} initialColor={list.color}/>
            </Grid>
            <Grid item sm={1} display={'flex'} alignItems={'center'} justifyContent={'center'}>
              {list?.name !== 'Concluído' && <Button color={'error'} onClick={() => remove(list)}>
                <CloseIcon color={'error'}/>
              </Button>}
            </Grid>
          </ Grid>)}
        </ContainerLists>
      </Grid>
      {openNew && <Grid container item sm={12}>
        <Grid item sm={8} display={'flex'} alignItems={'center'}>
          <InputStyled
            setObject={setList}
            object={list}
            name={'name'}
            {...{errors, setErrors, wasSubmitted}}>Nome</InputStyled>
        </Grid>
        <Grid item sm={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <ColorButton onChange={color => setList({...list, color: color})} />
        </Grid>
        <Grid item sm={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <ButtonStyled onClick={() => save()}>Salvar</ButtonStyled>
        </Grid>
      </Grid>}
      <Grid item sm={12}>
        <ButtonStyled width={'100%'} onClick={() => setOpenNew(true)}>Adicionar Lista</ButtonStyled>
      </Grid>
    </Grid>
  </ModalStyled>
}