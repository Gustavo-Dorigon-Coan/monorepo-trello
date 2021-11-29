import {Checkbox, FormControlLabel, Grid} from "@mui/material";
import {InputStyled} from "../InputStyled/InputStyled";
import {ButtonStyled} from "../Button/Button";
import {SubTitle} from "../SubTitle/SubTitle";
import {ModalStyled} from "../ModalStyled/ModalStyled";
import React, {useEffect, useState} from "react";
import {genericError, verifyErrors} from "../../utils/Functions";
import {HttpStatus} from "../../constants/HttpStatus";
import {CardService} from "../../services/CardService";
import {useDispatch, useSelector} from "react-redux";
import {ALERT_TYPE} from "../../reducers/alertState";
import {loadProject} from "../../../pages/Project/Project";
import {NEW_CARD_TYPE} from "../../reducers/newCardState";
import {loadProjects} from "../../../pages/Home/Projects/Projects";

export const NewCard = () => {
  const [ errors, setErrors] = useState({title: true, description: true});
  const [ wasSubmitted, setWasSubmitted] = useState(false);
  const cardInitial = {done: false};
  const [ buildingCard, setBuildingCard ] = useState(cardInitial);
  const dispatch = useDispatch();
  const projectId = useSelector(store => store.projectState.id);
  const { list, open } = useSelector(store => store.newCardState);

  const closeModal = () => {
    dispatch({
      type: NEW_CARD_TYPE,
      list: {},
      open: false,
    })
  }

  const closeAndClearState = () => {
    closeModal();
    setBuildingCard(cardInitial);
    setErrors({title: true, description: true});
    setWasSubmitted(false);
  }

  useEffect(() => {
    setBuildingCard({...buildingCard, listOfCards: list});
  },[list]);

  const save = async () => {
    setWasSubmitted(true);
    if (verifyErrors(errors)) {
      const response = await CardService.save(buildingCard);
      if (HttpStatus.isOkRange(response?.status)) {
        loadProject(dispatch, projectId);
        loadProjects(dispatch);
        dispatch({
          type: ALERT_TYPE,
          alert: {open: true, message: 'Tarefa registrada!', severity: 'success'},
        });
        closeAndClearState();
      } else {
        genericError(dispatch, response);
      }
    } else {
      dispatch({
        type: ALERT_TYPE,
        alert: {open: true, message: 'Preencha os campos corretamente!', severity: 'error'},
      });
    }
  }

  return <ModalStyled open={open} closeButton={() => closeAndClearState()}>
    <Grid container spacing={3}>
      <Grid container item spacing={3} sm={12}>
        <Grid item sm={6}>
          <SubTitle margin={'0 0 0 16px'}>Nova Tarefa</SubTitle>
        </Grid>
      </Grid>
      <Grid container item spacing={3} sm={12}>
        <Grid item sm={12}>
          <InputStyled
            setObject={setBuildingCard}
            object={buildingCard}
            name={'title'}
            {...{errors, setErrors, wasSubmitted}}
          >Título</InputStyled>
        </Grid>
        <Grid item sm={12}>
          <InputStyled
            setObject={setBuildingCard}
            object={buildingCard}
            name={'description'}
            {...{errors, setErrors, wasSubmitted}}
          >Descrição</InputStyled>
        </Grid>
        <Grid item sm={2} display={'flex'} alignItems={'center'}>
          Agendar:
        </Grid>
        <Grid item sm={10}>
          <InputStyled
            setObject={setBuildingCard}
            object={buildingCard}
            name={'scheduledDate'}
            type={'date'}
            {...{errors, setErrors, wasSubmitted}}
          ></InputStyled>
        </Grid>
        <Grid container item sm={12}>
          <Grid item sm={9}/>
          <Grid item sm={3}>
            <ButtonStyled onClick={() => save()}>Cadastrar</ButtonStyled>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </ModalStyled>
}