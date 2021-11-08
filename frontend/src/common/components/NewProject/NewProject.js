import {Grid} from "@mui/material";
import {InputStyled} from "../InputStyled/InputStyled";
import {ButtonStyled} from "../Button/Button";
import {SubTitle} from "../SubTitle/SubTitle";
import {ModalStyled} from "../ModalStyled/ModalStyled";
import React, {useState} from "react";
import {ProjectService} from "../../services/ProjectService";
import {genericError, verifyErrors} from "../../utils/Functions";
import {AuthService} from "../../services/AuthService";
import {HttpStatus} from "../../constants/HttpStatus";
import {loadProjects} from "../../../pages/Home/Projects/Projects";
import {useDispatch} from "react-redux";
import {PROJECTS_TYPE} from "../../reducers/projectsState";
import {ALERT_TYPE} from "../../reducers/alertState";

export const NewProject = ({open, setOpen}) => {
  const [ errors, setErrors] = useState({name: true});
  const [ wasSubmitted, setWasSubmitted] = useState(false);
  const projectInitial = {users: [{id: AuthService.getUser().id}], listOfCards: [{name: 'To do'},{name: 'Done'}]};
  const [ project, setProject] = useState(projectInitial);
  const dispatch = useDispatch();

  const closeAndClearState = () => {
    setOpen(false);
    setProject(projectInitial);
    setErrors({name: true});
    setWasSubmitted(false);
  }

  const save = async () => {
    setWasSubmitted(true);
    if (verifyErrors(errors)) {
      const response = await ProjectService.save(project);
      if (HttpStatus.isOkRange(response?.status)) {
        closeAndClearState();
        loadProjects(dispatch);
        dispatch({
          type: PROJECTS_TYPE,
          projects: response.data,
        });
        dispatch({
          type: ALERT_TYPE,
          alert: {open: true, message: 'Projeto registrado!', severity: 'success'},
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

  return <ModalStyled open={open} closeButton={() => setOpen(false)}>
    <Grid container spacing={3}>
      <Grid container item spacing={3} sm={12}>
        <Grid item sm={6}>
          <SubTitle margin={'0 0 0 16px'}>Novo Projeto</SubTitle>
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