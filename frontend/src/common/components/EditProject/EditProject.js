import {Grid} from "@mui/material";
import {InputStyled} from "../InputStyled/InputStyled";
import {ButtonStyled} from "../Button/Button";
import {SubTitle} from "../SubTitle/SubTitle";
import {ModalStyled} from "../ModalStyled/ModalStyled";
import React, {useEffect, useState} from "react";
import {ProjectService} from "../../services/ProjectService";
import {genericError, verifyErrors} from "../../utils/Functions";
import {HttpStatus} from "../../constants/HttpStatus";
import {useDispatch} from "react-redux";
import {ALERT_TYPE} from "../../reducers/alertState";
import {useHistory} from "react-router-dom";
import {loadProject} from "../../../pages/Project/Project";

export const EditProject = ({open, setOpen, oldProject}) => {
  const [ errors, setErrors] = useState({name: true});
  const [ wasSubmitted, setWasSubmitted] = useState(false);
  const [ project, setProject] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setProject({...oldProject});
  },[oldProject]);

  const closeAndClearState = () => {
    setOpen(false);
    setErrors({name: true});
    setWasSubmitted(false);
  }

  const save = async () => {
    setWasSubmitted(true);
    if (verifyErrors(errors)) {
      const response = await ProjectService.rename(project);
      if (HttpStatus.isOkRange(response?.status)) {
        closeAndClearState();
        loadProject(dispatch, project.id);
        dispatch({
          type: ALERT_TYPE,
          alert: {open: true, message: 'Projeto Alterado!', severity: 'success'},
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
    const response = await ProjectService.remove(project.id);
    if (HttpStatus.isOkRange(response?.status)) {
      closeAndClearState();
      history.push('/');
      dispatch({
        type: ALERT_TYPE,
        alert: {open: true, message: 'Projeto Deletado!', severity: 'success'},
      });
    } else {
      genericError(dispatch, response);
    }
  }

  return <ModalStyled open={open} closeButton={() => setOpen(false)}>
    <Grid container spacing={3}>
      <Grid container item spacing={3} sm={12}>
        <Grid item sm={6}>
          <SubTitle margin={'0 0 0 16px'}>Editar Projeto</SubTitle>
        </Grid>
      </Grid>
      <Grid container item spacing={3} sm={12}>
        <Grid item sm={12}>
          <InputStyled
            setObject={setProject}
            object={project}
            name={'name'}
            {...{errors, setErrors, wasSubmitted}}
          >Nome do Projeto</InputStyled>
        </Grid>
        <Grid container item spacing={3} sm={12}>
          <Grid item sm={6}/>
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