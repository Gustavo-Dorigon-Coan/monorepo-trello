import {Grid} from "@mui/material";
import {InputStyled} from "../InputStyled/InputStyled";
import {ButtonStyled} from "../Button/Button";
import {SubTitle} from "../SubTitle/SubTitle";
import {ModalStyled} from "../ModalStyled/ModalStyled";
import React, {useState} from "react";
import {ProjectService} from "../../services/ProjectService";
import {genericError, verifyErrors} from "../../utils/Functions";
import {AuthService} from "../../services/AuthService";
import {AlertStyled} from "../AlertStyled/AlertStyled";
import {HttpStatus} from "../../constants/HttpStatus";

export const NewProject = ({open, setOpen}) => {
  const [ errors, setErrors] = useState({name: true});
  const [ wasSubmitted, setWasSubmitted] = useState(false);
  const projectInitial = {users: [{id: AuthService.getUser().id}], listOfCards: [{name: 'To do'},{name: 'Done'}]};
  const [ project, setProject] = useState(projectInitial);
  const [ alert, setAlert] = useState({open: false});

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
        setAlert({...alert, open: true, message: 'Projeto registrado!', severity: 'success'});
      } else {
        genericError(setAlert, alert, response);
      }
    } else {
      setAlert({...alert, open: true, message: 'Preencha os campos corretamente!', severity: 'error'});
    }
  }

  return <>
    <ModalStyled open={open} closeButton={() => setOpen(false)}>
      <Grid container spacing={3}>
        <Grid container item spacing={3} lg={12}>
          <Grid item lg={6}>
            <SubTitle margin={'0 0 0 16px'}>Novo Projeto</SubTitle>
          </Grid>
        </Grid>
        <Grid container item spacing={3} lg={12}>
          <Grid item lg={12}>
            <InputStyled
              setObject={setProject}
              object={project}
              name={'name'}
              {...{errors, setErrors, wasSubmitted}}
            >Nome do Projeto</InputStyled>
          </Grid>
          <Grid container item lg={12}>
            <Grid item lg={9}/>
            <Grid item lg={3}>
              <ButtonStyled onClick={() => save()}>Cadastrar</ButtonStyled>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ModalStyled>
    <AlertStyled alert={alert} setAlert={setAlert}/>
  </>
}