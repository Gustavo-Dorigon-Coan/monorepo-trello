import {Grid} from "@mui/material";
import {InputStyled} from "../Input/Input";
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
  const [ errors, setErrors] = useState();
  const [ project, setProject] = useState({users: [{id: AuthService.getUser().id}]});
  const [ alert, setAlert] = useState({open: false});

  const save = async () => {
    if (verifyErrors(errors)) {
      const response = await ProjectService.save(project);
      if (HttpStatus.isOkRange(response?.status)) {
        setOpen(false);
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
                {...{errors, setErrors}}
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