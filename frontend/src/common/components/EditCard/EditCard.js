import {Grid} from "@mui/material";
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
import {Comments, ContainerComments, ContainerDate} from "./styled";
import {EDIT_CARD_TYPE} from "../../reducers/EditCardState";
import {loadProjects} from "../../../pages/Home/Projects/Projects";

export const EditCard = () => {
  const [ errors, setErrors] = useState();
  const [ wasSubmitted, setWasSubmitted] = useState(false);
  const [ wasSubmittedComment, setWasSubmittedComment] = useState(false);
  const [ newCard, setNewCard ] = useState();
  const [ errorsComment, setErrorsComment] = useState({comment: true});
  const [ comment, setComment ] = useState();
  const [ cardList, setCardList ] = useState();
  const [ cardProject, setCardProject ] = useState();
  const [ comments, setComments ] = useState([]);
  const dispatch = useDispatch();
  const projectId = useSelector(store => store.projectState.id);
  const { card, open } = useSelector(store => store.editCardState);

  const closeModal = () => {
    dispatch({
      type: EDIT_CARD_TYPE,
      card: {},
      open: false,
    })
  }

  const formatDate = date => {
    const newDate = date.substring(0, date.indexOf('T')).split('-');
    const newTime = date.substring(date.indexOf('T') + 1, date.length).split(':');
    return newDate[2] + '/' + newDate[1] + '/' + newDate[0] + ' ' + newTime[0] + ':' + newTime[1];
  };

  const closeAndClearState = () => {
    closeModal();
    setErrors();
    setWasSubmitted(false);
  }

  useEffect(() => {
    setNewCard({...newCard, ...card});
    setComment({card: {id: card.id}})
    loadComments();
    loadCardList();
    loadCardProject();
  },[card]);

  const loadComments = async () => {
    if (Boolean(card) && Boolean(card.id)) {
      const response = await CardService.getComments(card.id);
      if (HttpStatus.isOkRange(response?.status)) {
        setComments(response?.data);
      } else {
        genericError(dispatch, response);
      }
    }
  }

  const loadCardProject = async () => {
    if (Boolean(card) && Boolean(card.id)) {
      const response = await CardService.getProject(card.id);
      if (HttpStatus.isOkRange(response?.status)) {
        setCardProject(response?.data);
      } else {
        genericError(dispatch, response);
      }
    }
  }

  const loadCardList = async () => {
    if (Boolean(card) && Boolean(card.id)) {
      const response = await CardService.getList(card.id);
      if (HttpStatus.isOkRange(response?.status)) {
        setCardList(response?.data);
      } else {
        genericError(dispatch, response);
      }
    }
  }

  const save = async () => {
    setWasSubmitted(true);
    if (verifyErrors(errors)) {
      const response = await CardService.update(newCard);
      if (HttpStatus.isOkRange(response?.status)) {
        closeAndClearState();
        loadProject(dispatch, projectId);
        loadProjects(dispatch);
        dispatch({
          type: ALERT_TYPE,
          alert: {open: true, message: 'Tarefa alterada!', severity: 'success'},
        });
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

  const saveComment = async () => {
    setWasSubmittedComment(true);
    if (verifyErrors(errorsComment)) {
      const response = await CardService.saveComment({...comment, createdAt: new Date()});
      if (HttpStatus.isOkRange(response?.status)) {
        loadComments();
        setComment({card: {id: card.id}});
        dispatch({
          type: ALERT_TYPE,
          alert: {open: true, message: 'Commentario salvo!', severity: 'success'},
        });
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

  const remove = async () => {
    const response = await CardService.remove(card.id);
    if (HttpStatus.isOkRange(response?.status)) {
      closeAndClearState();
      loadProject(dispatch, projectId)
      loadProjects(dispatch);
      dispatch({
        type: ALERT_TYPE,
        alert: {open: true, message: 'Tarefa deletada com sucesso!', severity: 'success'},
      });
    } else {
      genericError(dispatch, response);
    }
  }

  return <ModalStyled open={open} closeButton={() => closeAndClearState()}>
    <Grid container spacing={3}>
      <Grid container item spacing={3} sm={12}>
        <Grid item sm={12}>
          <SubTitle margin={'0 0 0 16px'}>Editar Tarefa</SubTitle>
        </Grid>
        {Boolean(card) && Boolean(card.isScheduledDays) && <>
          <Grid item sm={6}>
            Projeto: {Boolean(cardProject) && cardProject?.name}
          </Grid>
          <Grid item sm={6}>
            Lista: {Boolean(cardList) && cardList?.name}
          </Grid>
        </>}
      </Grid>
      <Grid container item spacing={3} sm={12}>
        <Grid item sm={12}>
          <InputStyled
            setObject={setNewCard}
            object={newCard}
            name={'title'}
            required={false}
            {...{errors, setErrors, wasSubmitted}}
          >Título</InputStyled>
        </Grid>
        <Grid item sm={12}>
          <InputStyled
            setObject={setNewCard}
            object={newCard}
            required={false}
            name={'description'}
            {...{errors, setErrors, wasSubmitted}}
          >Descrição</InputStyled>
        </Grid>
        <Grid item sm={2} display={'flex'} alignItems={'center'}>
          Agendar:
        </Grid>
        <Grid item sm={10}>
          <InputStyled
            setObject={setNewCard}
            object={newCard}
            required={false}
            name={'scheduledDate'}
            type={'date'}
            {...{errors, setErrors, wasSubmitted}}
          ></InputStyled>
        </Grid>
        {Boolean(comments[0]) &&<Grid container display={'flex'} justifyContent={'center'} item sm={12}>
           <ContainerComments>
            {Boolean(comments[0]) && comments.map(comment => <>
              <Comments>
                {comment.comment}
              </Comments>
              <ContainerDate>
                {formatDate(comment.createdAt)}
              </ContainerDate>
            </>)}
          </ContainerComments>
        </Grid>}
        <Grid container item spacing={3} display={'flex'} alignItems={'center'} sm={12}>
          <Grid item sm={9}>
            <InputStyled
              setObject={setComment}
              object={comment}
              name={'comment'}
              setErrors={setErrorsComment}
              errors={errorsComment}
              wasSubmitted={wasSubmittedComment}>Comentario:</InputStyled>
          </Grid>
          <Grid item sm={3}>
            <ButtonStyled color={'warning'} onClick={() => saveComment()}>Comentar</ButtonStyled>
          </Grid>
        </Grid>
        <Grid container item spacing={3} sm={12}>
          <Grid item sm={2}/>
          <Grid item sm={4}>
            {Boolean(card) && Boolean(card.isScheduledDays) && cardProject?.name !== 'Caixa de Entrada' && <ButtonStyled
              color={'secondary'}
              onClick={() => window.location.replace(`/project/${cardProject.id}`)}>
              Abrir Projeto
            </ButtonStyled>}
          </Grid>
          <Grid item sm={3}>
            <ButtonStyled color={'error'} onClick={() => remove()}>Deletar</ButtonStyled>
          </Grid>
          <Grid item sm={3}>
            <ButtonStyled onClick={() => save()}>Salvar</ButtonStyled>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </ModalStyled>
}